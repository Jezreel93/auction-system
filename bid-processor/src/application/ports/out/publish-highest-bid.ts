import { IBid } from 'src/domain/bid/bid.interface';

export interface PublishHighestBidPort {
  publishHighestBid(bid: IBid): Promise<void>;
}

export const PUBLISH_HIGHEST_BID_PORT = 'PUBLISH_HIGHEST_BID_PORT';