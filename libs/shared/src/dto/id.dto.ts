import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

type idType = string | Types.ObjectId;

export class IdDto {
    @IsMongoId()
    id: idType;
}
