import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;
@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.fingById(notificationId);
    
    if(!notification) {
        throw new NotificationNotFound()
    }

    notification.unread();

    await this.notificationRepository.save(notification)

  }
}
