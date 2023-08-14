// app.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaBidConsumerController } from './infraestructure/kafka/kafka-consumer';
import { GenerateBidService } from './application/generate-bid.service';
import { KafkaProducerService } from './infraestructure/kafka/kafka-producer';
import { AuctionRepository } from './infraestructure/mongodb/auction-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionSchema } from './infraestructure/mongodb/auction.entity';
import { InitDbService } from './infraestructure/mongodb/init-db.service';

export const KAFKA_URI = process.env.KAFKA_URI || 'localhost:9092';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bid-db';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [KAFKA_URI],
          },
          consumer: {
            groupId: 'bid-receiver-consumer',
          },
        },
      },
    ]),
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Auction', schema: AuctionSchema }]),
  ],
  controllers: [KafkaBidConsumerController],
  providers: [
    InitDbService,
    {
      provide: 'GENERATE_BID',
      useClass: GenerateBidService,
    },
    {
      provide: 'BID_PUBLISHER_PORT',
      useClass: KafkaProducerService,
    },
    {
      provide: 'AUCTION_REPOSITORY',
      useClass: AuctionRepository,
    },
  ],
})
export class AppModule {}
