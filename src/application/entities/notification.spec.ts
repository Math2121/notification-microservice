import { Content } from "./content"
import { Notification } from "./Notification"

describe('Notifications', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content:  new Content('Nova notificação teste'),
            category: 'social',
            recipientId: 'example-test-uuid'
        })

        expect(notification).toBeTruthy()
    })
})