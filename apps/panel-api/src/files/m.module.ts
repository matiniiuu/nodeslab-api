import { Module } from '@nestjs/common';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { DatabaseModule } from '@app/shared';

import { Service } from './s.service';
import { ServiceToken } from './i.interface';
import { MainController } from './c.controller';
import { File, FileSchema } from './entities/file.entity';
import { RepositoryToken } from '../repositories/files.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/files.mongodb';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
    imports: [
        NestjsFormDataModule.config({ storage: MemoryStoredFile }),
        DatabaseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    ],
    controllers: [MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
})
export default class MainModule {}
