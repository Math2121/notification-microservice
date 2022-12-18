

import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";



describe("Send Notifications", () => {
  it("should be able to create a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository()
    const sendNotification = new SendNotification(notificationRepository);

    const {notification} = await sendNotification.execute({
      content: "Nova notificação teste",
      category: "social",
      recipientId: "example-test-uuid",
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
