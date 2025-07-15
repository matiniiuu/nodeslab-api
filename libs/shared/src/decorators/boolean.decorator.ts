import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export const IsOptionalBool = () => {
    return function (target: any, propertyKey: string) {
        IsOptional()(target, propertyKey);
        IsRequiredBool()(target, propertyKey);
    };
};

export const IsRequiredBool = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: Boolean, example: false })(target, propertyKey);
        IsBoolean()(target, propertyKey);
        Type(() => Boolean)(target, propertyKey);
    };
};
