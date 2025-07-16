import { Inject, Injectable } from '@nestjs/common';

import { AutoMessageDto } from '@app/shared';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/messages.repository';
import { IService } from './i.interface';

@Injectable()
export class Service implements IService {
    constructor(
        @Inject(RepositoryToken) private readonly repository: IRepository,
    ) {}
    private shuffle<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }

    async generateMessages(): Promise<number> {
        const users = await this.userService.getActiveUsers(); // [{_id, name...}]
        const shuffled = this.shuffle(users);
        const pairs: AutoMessageDto[] = [];

        for (let i = 0; i < shuffled.length - 1; i += 2) {
            const sender = shuffled[i];
            const receiver = shuffled[i + 1];

            pairs.push({
                senderId: sender._id,
                receiverId: receiver._id,
                message: `Hi ${receiver.name}, this is an auto message from ${sender.name}`,
                sendDate: this.randomFutureDate(),
            });
        }

        await this.repository.insertMany(pairs);
        return pairs.length;
    }

    private randomFutureDate(): Date {
        const now = new Date();
        const offsetMinutes = Math.floor(Math.random() * 60); // random within next hour
        return new Date(now.getTime() + offsetMinutes * 60 * 1000);
    }

    async getMessagesToSend(now: Date) {
        return this.repository.findAll({ sendDate: { $lte: now } });
    }

    async removeSentMessage(id: string) {
        return this.repository.delete(id);
    }
}
