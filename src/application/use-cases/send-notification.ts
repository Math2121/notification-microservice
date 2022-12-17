import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notification.repository";

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}


interface SendNotificationResponse {
    notification: Notification;
}
@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({ recipientId, content: new Content(content), category });

    await this.notificationRepository.create(notification)
    return {
        notification
    }
  }
}
