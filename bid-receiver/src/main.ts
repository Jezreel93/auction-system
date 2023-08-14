import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

class ApplicationBootstrap {
  private readonly defaultKafkaUri = 'localhost:9092';
  private kafkaUri: string;

  constructor() {
    this.kafkaUri = process.env.KAFKA_URI || this.defaultKafkaUri;
  }

  private async createNestApp(): Promise<any> {
    return NestFactory.create(AppModule);
  }

  private getKafkaConfig(): MicroserviceOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [this.kafkaUri],
        },
        consumer: {
          groupId: 'bid-receiver-consumer',
        },
      },
    };
  }

  public async run(): Promise<void> {
    const app = await this.createNestApp();
    const kafkaConfig = this.getKafkaConfig();

    app.connectMicroservice(kafkaConfig);

    await app.startAllMicroservices();
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
}

const bootstrap = new ApplicationBootstrap();
bootstrap.run();
