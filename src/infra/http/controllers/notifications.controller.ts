import { Body, Controller, Get, Post } from "@nestjs/common";
import { randomUUID } from "crypto";
import { AppService } from "../../../app.service";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { PrismaService } from "../../database/prisma/prisma.service";
import { Send } from "express";
import { SendNotification } from "src/application/use-cases/send-notification";

@Controller("notifications")
export class NotificationController {
  constructor(private sendNotification: SendNotification){}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    
    const { recipientId, content, category } = body;

    const {notification} = await this.sendNotification.execute({
      recipientId, content, category
    })
    return {notification}
  }
}
