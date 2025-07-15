import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { defaultSchemaOptions } from '../helpers';

@Schema(defaultSchemaOptions())
export class Message extends Document {
    @Prop({ type: String, required: true }) from: string;
    @Prop({ type: String, required: true }) to: string;
    @Prop({ type: String, required: true }) content: string;
    @Prop({ type: Boolean, default: false }) isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
