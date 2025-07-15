export class PublishMessageDto {
    from: string;
    to: string;
    content: string;
}
export class PublishReadReceiptDto {
    messageId: string;
}
export class SendMessagePushNotificationDto {
    to: string;
    content: string;
}
