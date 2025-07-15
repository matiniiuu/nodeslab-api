import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/shared';

import { Service } from './s.service';
import { ServiceToken } from './i.interface';
import { MainController } from './c.controller';

import {
    ModelValue,
    ModelSchema,
    RepositoryTokenValue,
    RepositoryMongoDBValue,
} from './config';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryTokenValue, useClass: RepositoryMongoDBValue },
    ],
    imports: [
        DatabaseModule.forFeature([
            { name: ModelValue.name, schema: ModelSchema },
        ]),
    ],
    controllers: [MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryTokenValue, useClass: RepositoryMongoDBValue },
    ],
})
export default class MainModule {}
