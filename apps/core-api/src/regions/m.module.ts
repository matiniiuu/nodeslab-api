import { Module } from '@nestjs/common';

import { Region, RegionSchema, DatabaseModule } from '@app/shared';

import { Service } from './s.service';
import { ServiceToken } from './i.interface';
import { MainController } from './c.controller';
import { RepositoryToken } from '../repositories/regions.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/regions.mongodb';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
    imports: [
        DatabaseModule.forFeature([
            { name: Region.name, schema: RegionSchema },
        ]),
    ],
    controllers: [MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
})
export default class MainModule {}
