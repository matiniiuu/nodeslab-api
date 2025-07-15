import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultSchemaOptions } from '@app/shared';

@Schema(defaultSchemaOptions())
export class Admin extends Document {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String, required: true, index: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password;
    },
});
AdminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
