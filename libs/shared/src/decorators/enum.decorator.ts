import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEnum, IsOptional } from 'class-validator';
import { ArrayMin } from '@app/shared/messages';

//* Enum
export const IsOptionalEnum = (enumType: any) => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ enum: enumType })(target, propertyKey);
        IsOptional()(target, propertyKey);
        IsRequiredEnum(enumType)(target, propertyKey);
    };
};
export const IsRequiredEnum = (enumType: any) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ enum: enumType })(target, propertyKey);
        IsEnum(enumType)(target, propertyKey);
    };
};
export const IsRequiredEnumArray = (enumType: any) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ enum: enumType })(target, propertyKey);
        IsArray()(target, propertyKey);
        ArrayMinSize(1, { message: ArrayMin(propertyKey) })(
            target,
            propertyKey,
        );
        IsEnum(enumType, { each: true })(target, propertyKey);
    };
};
