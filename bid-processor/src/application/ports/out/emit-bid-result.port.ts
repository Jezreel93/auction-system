import { IEvent } from 'src/application/interfaces/event';
import { IBid } from 'src/domain/bid/bid.interface';

export interface IPublishBidResultPort {
  publishBidResult(event: IEvent<IBid>): Promise<void>;
}

export const BID_PUBLISHER_PORT = 'BID_PUBLISHER_PORT';
