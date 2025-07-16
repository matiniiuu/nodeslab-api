import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AutoMessage } from '@app/shared';

import { IRepository } from '../messages.repository';

@Injectable()
export class RepositoryMongoDB implements IRepository {
    constructor(
        @InjectModel(AutoMessage.name) private model: Model<AutoMessage>,
    ) {}
}
