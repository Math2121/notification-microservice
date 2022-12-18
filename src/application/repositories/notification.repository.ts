import { Notification } from "../entities/Notification";

export abstract class NotificationRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract fingById(notificationId: string): Promise<Notification | null>;
    abstract save(notification: Notification): Promise<void>;
    abstract countManyByRecipientId(recipientId: string): Promise<number>
    abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>
}