import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    DataReply,
    DataResponse,
    DocumentNotFound,
    ItemCreated,
    ItemUpdated,
    SuccessReply,
    SuccessResponse,
    User,
} from '@app/shared';

import { RegisterUserDto, UpdateProfileDto } from './dto/user.dto';
import { IService } from './i.interface';

@Injectable()
export class Service implements IService {
    constructor(@InjectModel(User.name) private model: Model<User>) {}
    async create(dto: RegisterUserDto): SuccessReply {
        await new this.model(dto).save();
        return new SuccessResponse(ItemCreated);
    }

    async profile(email: string): DataReply<User> {
        const result = await this.model.findOne({ email });
        if (!result) {
            throw new NotFoundException(DocumentNotFound('User'));
        }
        return new DataResponse(result);
    }
    async update(email: string, dto: UpdateProfileDto): SuccessReply {
        await this.model.updateOne({ email }, { $set: { name: dto.name } });
        return new SuccessResponse(ItemUpdated);
    }

    async auth(email: string): Promise<User | null> {
        return this.model.findOne({ email });
    }
}
