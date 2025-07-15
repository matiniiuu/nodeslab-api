import { S3Client } from '@aws-sdk/client-s3';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { SESClient } from '@aws-sdk/client-ses';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { config } from '@app/shared';
import { AwsService } from './aws.service';
import { AwsServiceToken } from './aws.interface';

@Global()
@Module({
    imports: [
        AwsSdkModule.registerAsync({
            clientType: SESClient,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return new SESClient({
                    region: configService.get(config.SES_AWS_REGION) ?? '',
                    credentials: {
                        accessKeyId:
                            configService.get(config.SES_AWS_ACCESS_KEY) ?? '',
                        secretAccessKey:
                            configService.get(config.SES_AWS_SECRET_KEY) ?? '',
                    },
                });
            },
        }),
        AwsSdkModule.registerAsync({
            clientType: S3Client,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return new S3Client({
                    region: configService.get(config.S3_AWS_REGION)!,
                    credentials: {
                        accessKeyId: configService.get(
                            config.S3_AWS_ACCESS_KEY,
                        )!,
                        secretAccessKey: configService.get(
                            config.S3_AWS_SECRET_KEY,
                        )!,
                    },
                });
            },
        }),
    ],
    exports: [{ provide: AwsServiceToken, useClass: AwsService }],
    providers: [{ provide: AwsServiceToken, useClass: AwsService }],
})
export class AwsModule {}
