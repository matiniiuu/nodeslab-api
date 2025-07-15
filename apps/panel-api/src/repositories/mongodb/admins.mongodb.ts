import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MongodbAbstractRepository } from '@app/shared';

import { CreateAdminDto, UpdateAdminDto } from '../../admins/dto/admin.dto';
import { Admin } from '../../admins/entities/admin.entity';
import { IRepository } from '../admins.repository';

@Injectable()
export class RepositoryMongoDB
    extends MongodbAbstractRepository<CreateAdminDto, UpdateAdminDto, Admin>
    implements IRepository
{
    constructor(@InjectModel(Admin.name) model: Model<Admin>) {
        super(model);
    }

    async me(email: string): Promise<Admin | null> {
        return this.model.findOne({ email });
    }
    async auth(email: string): Promise<Admin | null> {
        return this.model.findOne({ email });
    }
}
