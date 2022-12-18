import { Injectable } from "@nestjs/common";
import { Notification } from "src/application/entities/Notification";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificatioMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {


    constructor(private prismaService: PrismaService) { }
    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificatioMapper.toPrisma(notification)
        await this.prismaService.notification.create({
            data: raw
        })
    }

    async fingById(notificationId: string): Promise<Notification> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!notification) {
            return null
        }

        return PrismaNotificatioMapper.toDomain(notification)
    }


    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificatioMapper.toPrisma(notification)
        await this.prismaService.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }


    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where: {
                recipientId: recipientId
            }
        })

        return count
    }
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prismaService.notification.findMany({
            where: {
                recipientId: recipientId
            }
        })

        return notifications.map(PrismaNotificatioMapper.toDomain)
    }

}