

import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/Notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notifications";




describe("Read Notifications", () => {
    it("should be able to Read a notification", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const readNotification = new ReadNotification(notificationRepository);


        const notification = new Notification({
            category: "social",
            content: new Content('teste teste1'),
            recipientId: 'test-uuid-0'
        })

        await notificationRepository.create(notification)

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date))
    });

    it("should not be able to read a notification when it does not exist", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const cancelNotification = new CancelNotification(notificationRepository);
        expect(async () => {

            return await cancelNotification.execute({
                notificationId: "fakjedfd"
            })
        }).rejects.toThrow(NotificationNotFound)
    })
});
