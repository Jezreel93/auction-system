import { IBid } from 'src/domain';

export interface IShowHighestBidPort {
  showHighestBid(bid: IBid): void;
}

export const SHOW_HIGHEST_BID_PORT = 'SHOW_HIGHEST_BID_PORT';