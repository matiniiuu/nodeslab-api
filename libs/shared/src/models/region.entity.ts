import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { RegionTypeEnum } from '../enums';
import { defaultSchemaOptions } from '../helpers';

class Networks {
    @Prop({ type: String, required: true }) name: string;
    @Prop({ type: String, required: true }) type: string;
}

@Schema(defaultSchemaOptions())
export class Region extends Document {
    @Prop({ type: Object, required: true }) name: Record<string, string>;
    @Prop({ type: String, required: true, unique: true }) iso2: string;
    @Prop({ type: String, required: true, unique: true }) iso3: string;

    @Prop({ type: Boolean, required: true }) isPopular: boolean;
    @Prop({ type: Boolean, required: true }) isMostVisited: boolean;
    @Prop({ type: Boolean, required: true, default: true }) isActive: boolean;

    @Prop({ type: String, required: true }) flag: string;
    @Prop({ type: String, required: false }) banner: string;

    @Prop({ type: Number, required: true }) listOrderNumber: number;

    @Prop({ type: String, required: true, enum: RegionTypeEnum })
    regionType: string;

    @Prop({ type: [Networks], required: true }) networks: Networks[];

    // bundles: Bundle[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
