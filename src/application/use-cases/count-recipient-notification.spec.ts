
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotification } from "./count-recipient-notification";


describe("Count Recipient Notifications", () => {
    it("should be able to cancel a count recipientnotification", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const countRecipientNotification = new CountRecipientNotification(notificationRepository);

        await notificationRepository.create(makeNotification({recipientId:'test-2'}))

        await notificationRepository.create(makeNotification({recipientId:'test-2'}))

        await notificationRepository.create(makeNotification({recipientId:'test-1'}))
       const {count} =  await countRecipientNotification.execute({
            recipientId: 'test-2'
        })

        expect(count).toEqual(2)
    });

  
});
