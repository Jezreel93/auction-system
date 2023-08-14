import { IEvent } from 'src/application/interfaces/event';
import { IBid } from 'src/domain/bid/bid.interface';

export interface PlaceBidPort {
  placeBid(bid: IEvent<IBid>): Promise<void>;
}
