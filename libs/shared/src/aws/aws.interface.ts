import { SuccessReply, UploadDto } from '@app/shared';

export interface IAwsService {
    upload(dto: UploadDto): Promise<string>;
    remove(filename: string): SuccessReply;
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
export const AwsServiceToken = Symbol('AwsServiceToken');
