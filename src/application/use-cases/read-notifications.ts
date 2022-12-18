import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;
@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.fingById(notificationId);
    
    if(!notification) {
        throw new NotificationNotFound()
    }

    notification.read();

    await this.notificationRepository.save(notification)



  }
}
