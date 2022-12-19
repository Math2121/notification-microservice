import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/databse.module";
import { Module } from "@nestjs/common";
import { NotificationController } from "./controllers/notification.controller";
import { KafkaConsumerService } from "./kafka-consumer.service";

@Module({
    imports: [DatabaseModule],
    providers: [KafkaConsumerService,SendNotification],
    controllers: [NotificationController]
})
export class MessagingModule {}