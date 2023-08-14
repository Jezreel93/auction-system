import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  CREATE_BID_PORT,
  ICreateBidPort,
} from 'src/application/ports/in/create-bid.port';
import { IShowHighestBidPort } from 'src/application/ports/in/get-highest-bid.port';
import { IEmitBidResultPort } from 'src/application/ports/out/emit-bid-result.port';
import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

interface ClientConnection {
  socket: Socket;
}

interface BidPayload {
  amount: number;
  auctionId: string;
  bidderId: string;
}

@WebSocketGateway({ cors: false })
export class BidWebSocketGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    IShowHighestBidPort,
    IEmitBidResultPort
{
  @WebSocketServer() webSocketServer: Server;
  private connectedClients: Record<string, ClientConnection> = {};

  constructor(
    @Inject(CREATE_BID_PORT) private readonly bidCreator: ICreateBidPort,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.connectedClients[client.id] = {
      socket: client,
    };
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    delete this.connectedClients[client.id];
  }

  @SubscribeMessage('post-bid')
  async processBid(client: Socket, payload: string) {
    const bidDetails: BidPayload = JSON.parse(payload);
    const newBid: IBid = {
      id: null,
      connectionId: client.id,
      ...bidDetails,
    };
    try {
      const bidId = await this.bidCreator.createBid(newBid);
      client.emit('bid-placed', bidId);
    } catch (error) {
      client.emit('bid-error', 'There was an error processing the bid.');
    }
  }

  emitBidResult(event: IEvent<IBid>): Promise<void> {
    try {
      const clientSocket = this.connectedClients[event.payload.connectionId].socket;
      clientSocket.emit('get-result', event.result);
    } catch (error) {
      return Promise.reject(new Error('Failed to emit bid result.'));
    }
  }

  showHighestBid(bid: IBid): Promise<void> {
    try {
      this.webSocketServer.emit('auction.highest_bid', bid);
    } catch (error) {
      return Promise.reject(new Error(`Failed to show highest bid: ${error}`));
    }
  }
}
