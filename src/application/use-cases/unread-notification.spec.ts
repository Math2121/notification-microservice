


import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";

import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";




describe("Unread Notifications", () => {
    it("should be able to Unread a notification", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const unreadNotification = new UnreadNotification(notificationRepository);


        const notification = makeNotification({readAt: new Date()})

        await notificationRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toBeNull()
    });

    it("should not be able to unread a notification when it does not exist",  () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const unreadNotification = new UnreadNotification(notificationRepository);
        expect(async () => {
        return await unreadNotification.execute({
                notificationId: "fakjedfd"
            })
        }).rejects.toThrow(NotificationNotFound)
    })
});
