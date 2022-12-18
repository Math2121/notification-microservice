import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"
import { Notification } from "../entities/Notification";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CountRecipientNotificationRequest {
  recipientId: string;
}


interface CountRecipientNotificationResponse {
  count: number
};
@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(recipientId);

    return {
      count
    }

  }
}
