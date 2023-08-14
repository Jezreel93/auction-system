import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IEvent } from 'src/application/interfaces/event';
import { IPublishBidResultPort } from 'src/application/ports/out/emit-bid-result.port';
import { PublishHighestBidPort } from 'src/application/ports/out/publish-highest-bid';
import { IBid } from 'src/domain/bid/bid.interface';

export class KafkaProducerService
  implements PublishHighestBidPort, IPublishBidResultPort
{
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly producer: ClientKafka,
  ) {}

  async publishHighestBid(bid: IBid): Promise<void> {
    const message = {
      key: bid.auctionId,
      value: JSON.stringify(bid),
    };
    await this.safePublish('auction.highest_bid', message);
  }

  async publishBidResult(event: IEvent<IBid>): Promise<void> {
    const message = {
      key: event.key,
      value: JSON.stringify(event),
    };
    await this.safePublish('bid.processed', message);
  }

  private async safePublish(topic: string, message: any): Promise<void> {
    try {
      await this.producer.emit(topic, message).toPromise();
    } catch (error) {
      console.error(`Error publishing message to topic ${topic}:`, error);
      throw error;
    }
  }
}
