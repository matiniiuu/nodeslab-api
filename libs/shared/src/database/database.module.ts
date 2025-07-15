import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    AsyncModelFactory,
    ModelDefinition,
    MongooseModule,
} from '@nestjs/mongoose';

import { config } from '../config';
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>(config.MONGODB_URI),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
    static forFeatureAsync(factories: AsyncModelFactory[]) {
        return MongooseModule.forFeatureAsync(factories);
    }
}
