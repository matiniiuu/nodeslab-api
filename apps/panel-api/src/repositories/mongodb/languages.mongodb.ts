import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Language, LanguageDto, MongodbAbstractRepository } from '@app/shared';

import { IRepository } from '../languages.repository';

@Injectable()
export class RepositoryMongoDB
    extends MongodbAbstractRepository<LanguageDto, LanguageDto, Language>
    implements IRepository
{
    constructor(@InjectModel(Language.name) model: Model<Language>) {
        super(model);
    }
}
