// file: generate-bid.service.ts

import { Inject } from '@nestjs/common';
import { Auction } from 'src/domain/auction/auction.entity';
import { IBid } from 'src/domain/bid/bid.interface';
import { PlaceBidPort } from './ports/in/generate-bid.port';
import {
  AUCTION_REPOSITORY,
  IAuctionRepository,
} from './ports/out/auction-repository';
import { PublishHighestBidPort } from './ports/out/publish-highest-bid';
import { IEvent, State } from './interfaces/event';
import {
  BID_PUBLISHER_PORT,
  IPublishBidResultPort,
} from './ports/out/emit-bid-result.port';
import { AuctionNotOpenException } from 'src/domain/auction/auction-not-open.exception';

export class GenerateBidService implements PlaceBidPort {
  constructor(
    @Inject(BID_PUBLISHER_PORT)
    private readonly bidPublisher: PublishHighestBidPort,
    @Inject(AUCTION_REPOSITORY)
    private readonly auctionRepository: IAuctionRepository,
    @Inject(BID_PUBLISHER_PORT)
    private readonly bidResultPublisher: IPublishBidResultPort,
  ) {}

  public async placeBid(inputBidEvent: IEvent<IBid>): Promise<void> {
    const auction = await this.getAuctionFromBid(inputBidEvent.payload);

    this.ensureAuctionIsOpen(auction);

    if (this.isBidHigherThanCurrentHighest(auction, inputBidEvent.payload)) {
      this.updateAuctionWithNewBid(auction, inputBidEvent.payload);
      await this.bidPublisher.publishHighestBid(inputBidEvent.payload);
    }

    await this.publishBidResult(inputBidEvent);
  }

  private async getAuctionFromBid(bid: IBid): Promise<Auction> {
    const auctionData = await this.auctionRepository.getById(bid.auctionId);
    return new Auction(auctionData);
  }

  private ensureAuctionIsOpen(auction: Auction): void {
    if (auction.status !== 'open') {
      throw new AuctionNotOpenException();
    }
  }

  private isBidHigherThanCurrentHighest(auction: Auction, bid: IBid): boolean {
    return bid.amount > auction.highestBid;
  }

  private updateAuctionWithNewBid(auction: Auction, bid: IBid): void {
    auction.highestBid = bid.amount;
    auction.bestBid = bid;
    this.auctionRepository.update(auction);
  }

  private async publishBidResult(inputBidEvent: IEvent<IBid>): Promise<void> {
    const bidResultEvent: IEvent<IBid> = {
      key: inputBidEvent.payload.auctionId,
      payload: inputBidEvent.payload,
      result: State.PROCESSED,
    };
    return await this.bidResultPublisher.publishBidResult(bidResultEvent);
  }
}
