import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { KafkaConsumerService } from '@infra/http/messaging/kafka/kafka-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const kafkaConsumerService = app.get(KafkaConsumerService)
  app.connectMicroservice({
    strategy:kafkaConsumerService
  })

  await app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();
