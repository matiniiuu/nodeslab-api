import { Module } from '@nestjs/common';

import { Chat, ChatSchema, DatabaseModule } from '@app/shared';

import { RepositoryToken } from '../repositories/chats.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/chats.mongodb';
import { MainController } from './c.controller';
import { ServiceToken } from './i.interface';
import { Service } from './s.service';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
    imports: [
        DatabaseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ],
    controllers: [MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
})
export default class MainModule {}
