import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { IEvent } from 'src/application/interfaces/event';
import { PlaceBidPort } from 'src/application/ports/in/generate-bid.port';
import { IBid } from 'src/domain/bid/bid.interface';

@Controller()
export class KafkaBidConsumerController {
  constructor(
    @Inject('GENERATE_BID') private readonly bidService: PlaceBidPort
  ) {}

  @EventPattern('bid.received')
  async processBid(@Payload() event: IEvent<IBid>): Promise<void> {
    return this.bidService.placeBid(event);
  }
}
