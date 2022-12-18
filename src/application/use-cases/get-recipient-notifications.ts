import { Content } from "../entities/content";
import {Injectable } from "@nestjs/common"

import { NotificationRepository } from "../repositories/notification.repository";
import { Notification } from "@application/entities/Notification";


interface GetRecipientNotificationsRequest {
  recipientId: string;
}


interface GetRecipientNotificationsResponse {
  notifications: Notification[]
};
@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository){}
  async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId)

    return {
        notifications
    }
  }
}
