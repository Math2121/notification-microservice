

import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/Notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";




describe("Cancel Notifications", () => {
    it("should be able to cancel a notification", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const cancelNotification = new CancelNotification(notificationRepository);


        const notification = new Notification({
            category: "social",
            content: new Content('teste teste1'),
            recipientId: 'test-uuid-0'
        })

        await notificationRepository.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    });

    it("should not be able to cancel a notification when it does not exist", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const cancelNotification = new CancelNotification(notificationRepository);
        expect(async () => {

            return await cancelNotification.execute({
                notificationId: "fakjedfd"
            })
        }).rejects.toThrow(NotificationNotFound)
    })
});
