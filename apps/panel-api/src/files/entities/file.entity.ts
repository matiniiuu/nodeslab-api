import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@app/shared';

@Schema(defaultSchemaOptions())
export class File extends Document {
    @Prop({ type: String, required: true })
    mimetype: string;

    @Prop({ type: String, required: true })
    path: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
