import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

export interface IBidPublisherPort {
  createBid(data: IEvent<IBid>): Promise<void>;
}

export const BID_PUBLISHER_PORT = 'BID_PUBLISHER_PORT';
