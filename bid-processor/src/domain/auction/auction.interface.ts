import { IBid } from '../bid/bid.interface';
import { AuctionStatus } from './auction.entity';

export interface IAuction {
  id: string;
  highestBid: number;
  status: AuctionStatus;
  bestBid: IBid;
}
