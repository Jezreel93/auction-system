import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from '@nestjs-modules/ioredis';

import { CreateBidService } from './application/create-bid.service';
import { KafkaBidConsumerController } from './infraestructure/kafka/kafka-consumer';
import { KafkaBidProducerService } from './infraestructure/kafka/kafka-producer';
import { IdGenerator } from './infraestructure/utils/uuid-generator';
import { ReceiveBidService } from './application/receive-bid.service';
import { WorkflowController } from './infraestructure/controller/workflow.controller';
import { BidWebSocketGateway } from './infraestructure/websockets/bid-web-socket.gateway';
import { RedisWorkflowService } from './infraestructure/redis/redis-workflow.service';

const DEFAULT_KAFKA_URI = 'localhost:9092';
const DEFAULT_REDIS_HOST = 'localhost';
const DEFAULT_REDIS_PORT = 6379;

const redisConfig = {
  config: {
    url: `redis://${process.env.REDIS_HOST || DEFAULT_REDIS_HOST}:${
      parseInt(process.env.REDIS_PORT) || DEFAULT_REDIS_PORT
    }`,
  },
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_URI || DEFAULT_KAFKA_URI],
          },
          consumer: {
            groupId: 'bid-procesor-consumer',
          },
        },
      },
    ]),
    RedisModule.forRoot(redisConfig),
  ],
  controllers: [WorkflowController, KafkaBidConsumerController],
  providers: [
    RedisWorkflowService,
    { provide: 'CREATE_BID_PORT', useClass: CreateBidService },
    { provide: 'ID_GENERATOR_PORT', useClass: IdGenerator },
    { provide: 'WORKFLOW_PORT', useClass: RedisWorkflowService },
    { provide: 'BID_PUBLISHER_PORT', useClass: KafkaBidProducerService },
    { provide: 'RECEIVE_BID_PORT', useClass: ReceiveBidService },
    { provide: 'MESSAGE_SERVICE_PORT', useClass: BidWebSocketGateway },
  ],
})
export class AppModule {}
