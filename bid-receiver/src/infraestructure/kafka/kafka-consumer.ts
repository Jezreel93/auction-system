import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IShowHighestBidPort } from 'src/application/ports/in/get-highest-bid.port';
import {
  IReceiveBidPort,
  RECEIVE_BID_PORT,
} from 'src/application/ports/in/receive-bid.port';
import { MESSAGE_SERVICE_PORT } from 'src/application/ports/out/emit-bid-result.port';
import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

@Controller()
export class KafkaBidConsumerController {
  constructor(
    @Inject(MESSAGE_SERVICE_PORT)
    private readonly highestBidService: IShowHighestBidPort,
    @Inject(RECEIVE_BID_PORT)
    private readonly bidReceiverService: IReceiveBidPort,
  ) {}

  @EventPattern('auction.highest_bid')
  async consumeHighestBidEvent(@Payload() data: any): Promise<void> {
    try {
      return this.highestBidService.showHighestBid(data);
    } catch (error) {
      console.error('Error consuming highest bid event:', error);
      throw error;
    }
  }

  @EventPattern('bid.processed')
  async consumeProcessedBidEvent(@Payload() data: IEvent<IBid>): Promise<void> {
    try {
      return this.bidReceiverService.receiveBid(data);
    } catch (error) {
      console.error('Error consuming processed bid event:', error);
      throw error;
    }
  }
}
