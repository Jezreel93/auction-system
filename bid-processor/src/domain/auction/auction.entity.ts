import { IAuction } from './auction.interface';
import { IBid } from '../bid/bid.interface';

export enum AuctionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export class Auction {
  public readonly id: string;
  public highestBid: number;
  public readonly status: AuctionStatus;
  public bestBid: IBid;

  constructor(auction: IAuction) {
    this.id = auction.id;
    this.highestBid = auction.highestBid;
    this.status = auction.status;
    this.bestBid = auction.bestBid;
  }

  public get currentBestBid(): IBid {
    return this.bestBid;
  }

  public get currentHighestBid(): number {
    return this.highestBid;
  }
}
