import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

export interface IEmitBidResultPort {
  emitBidResult(event: IEvent<IBid>): Promise<void>;
}

export const MESSAGE_SERVICE_PORT = 'MESSAGE_SERVICE_PORT';
