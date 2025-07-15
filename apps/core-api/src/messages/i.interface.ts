import {
    PublishMessageDto,
    PublishReadReceiptDto,
    SendMessagePushNotificationDto,
} from '@app/shared';

export interface IService {
    sendPushNotification(dto: SendMessagePushNotificationDto): Promise<void>;
    publishReadReceipt(dto: PublishReadReceiptDto): Promise<void>;
    publishMessage(dto: PublishMessageDto): Promise<void>;
}
export const ServiceToken = Symbol('MessagesServiceToken');
