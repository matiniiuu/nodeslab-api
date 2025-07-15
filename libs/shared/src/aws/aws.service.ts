import {
    DeleteObjectCommand,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectAws } from 'aws-sdk-v3-nest';

import * as mime from 'mime-types';
import { v4 as uuid } from 'uuid';

import {
    config,
    ItemDeleted,
    SuccessReply,
    SuccessResponse,
    UploadDto,
} from '@app/shared';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { IAwsService } from './aws.interface';

@Injectable()
export class AwsService implements IAwsService {
    constructor(
        @InjectAws(S3Client) private readonly s3: S3Client,
        @InjectAws(SESClient) private readonly ses: SESClient,

        private readonly configService: ConfigService,
    ) {}
    async upload({ data, filename }: UploadDto): Promise<string> {
        const createdFilename = `${uuid()}-${filename}`;
        const object: PutObjectCommandInput = {
            ContentDisposition: 'inline',
            Bucket: this.configService.get(config.S3_BUCKET),
            Body: data,
            Key: createdFilename,
            ACL: 'public-read',
        };
        const mimeType = mime.lookup(createdFilename);
        if (mimeType) {
            object.ContentType = mimeType;
        }

        await this.s3.send(new PutObjectCommand(object));

        return `${this.configService.get(config.CLOUDFRONT)}/${createdFilename}`;
    }
    async remove(filename: string): SuccessReply {
        await this.s3.send(
            new DeleteObjectCommand({
                Bucket: this.configService.get(config.S3_BUCKET),
                Key: filename,
            }),
        );

        return new SuccessResponse(ItemDeleted);
    }
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        try {
            await this.ses.send(
                new SendEmailCommand({
                    Source: 'no-reply@mail.nodelabs.ge',
                    Destination: {
                        ToAddresses: [to],
                    },
                    Message: {
                        Subject: {
                            Data: subject,
                        },
                        Body: {
                            Html: {
                                Data: body,
                            },
                        },
                    },
                }),
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
