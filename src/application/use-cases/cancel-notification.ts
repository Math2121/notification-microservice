import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationRequest {
  notificationId: string;
}


type CancelNotificationResponse = void;
@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.fingById(notificationId);
    
    if(!notification) {
        throw new NotificationNotFound()
    }

    notification.cancel();

    await this.notificationRepository.save(notification)



  }
}
