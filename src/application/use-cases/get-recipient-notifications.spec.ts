
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotification } from "./count-recipient-notification";
import { GetRecipientNotifications } from "./get-recipient-notifications";


describe("Get Recipient Notifications", () => {
    it("should be able to cancel a count recipient notification", async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const getRecipientNotifications = new GetRecipientNotifications(notificationRepository);

        await notificationRepository.create(makeNotification({recipientId:'test-2'}))

        await notificationRepository.create(makeNotification({recipientId:'test-2'}))

        await notificationRepository.create(makeNotification({recipientId:'test-1'}))
       const {notifications} =  await getRecipientNotifications.execute({
            recipientId: 'test-2'
        })

        expect(notifications).toHaveLength(2)
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({recipientId: 'test-2'}),
            expect.objectContaining({recipientId: 'test-2'})
        ]))
    });

  
});
