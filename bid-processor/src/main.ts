import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function createKafkaMicroservice(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_URI || 'localhost:9092'],
        },
        consumer: {
          groupId: 'bid-processor-consumer',
        },
      },
    },
  );
  app.listen();
}

createKafkaMicroservice();
