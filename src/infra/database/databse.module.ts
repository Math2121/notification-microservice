
import { Module } from "@nestjs/common/decorators";
import { NotificationRepository } from "src/application/repositories/notification.repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/prisma-notification-repositories";

@Module({
  providers: [PrismaService, {
    provide: NotificationRepository,
    useClass:PrismaNotificationRepository
  }],
  exports: [NotificationRepository]
})
export class DatabaseModule {}
