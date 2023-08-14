import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IBidPublisherPort } from 'src/application/ports/out/bid.port';
import { IEvent } from 'src/application/workflow/event';
import { IBid } from 'src/domain';

export class KafkaBidProducerService implements IBidPublisherPort {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaProducer: ClientKafka,
  ) {}

  async createBid(event: IEvent<IBid>): Promise<void> {
    const message = {
      key: event.key,
      value: JSON.stringify(event),
    };

    try {
      await this.kafkaProducer.emit('bid.received', message).toPromise();
    } catch (error) {
      console.error('Error sending bid to Kafka:', error);
      throw error;
    }
  }
}
