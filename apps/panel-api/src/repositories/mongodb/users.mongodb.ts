import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MongodbAbstractRepository, UserDto, User } from '@app/shared';

import { IRepository } from '../users.repository';

@Injectable()
export class RepositoryMongoDB
    extends MongodbAbstractRepository<UserDto, UserDto, User>
    implements IRepository
{
    constructor(@InjectModel(User.name) model: Model<User>) {
        super(model);
    }
}
