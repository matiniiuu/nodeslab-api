import { Module } from '@nestjs/common';

import { AutoMessage, AutoMessageSchema, DatabaseModule } from '@app/shared';

import { RepositoryToken } from '../repositories/auto-messages.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/auto-messages.mongodb';
import { ServiceToken } from './i.interface';
import { Service } from './s.service';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
    imports: [
        DatabaseModule.forFeature([
            { name: AutoMessage.name, schema: AutoMessageSchema },
        ]),
    ],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
})
export default class MainModule {}
