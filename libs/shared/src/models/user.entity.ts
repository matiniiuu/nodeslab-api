import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@app/shared';

@Schema(defaultSchemaOptions())
export class User extends Document {
    @Prop({ type: String, required: true }) name: string;
    @Prop({ type: String, required: true, unique: true }) email: string;
    @Prop({ type: String, required: true }) password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password;
    },
});
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
