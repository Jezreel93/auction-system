import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

export interface IReceiveBidPort {
  receiveBid(bid: IEvent<IBid>): Promise<void>;
}

export const RECEIVE_BID_PORT = 'RECEIVE_BID_PORT';