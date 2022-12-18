import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/Notification";

type Override = Partial<NotificationProps>
export function makeNotification(override: Override = {}){
    return new Notification({
        category: "social",
        content: new Content('teste teste1'),
        recipientId: 'test-uuid-0',
        ...override
    })
}