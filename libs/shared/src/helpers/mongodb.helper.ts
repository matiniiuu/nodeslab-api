import { SchemaOptions } from '@nestjs/mongoose';

export const defaultSchemaOptions = (
    options?: SchemaOptions,
): SchemaOptions => {
    return {
        timestamps: true,
        virtuals: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        ...options,
    };
};
