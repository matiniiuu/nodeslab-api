import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { ArrayMin } from '@app/shared/messages';

//* String
export const IsOptionalString = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional()(target, propertyKey);
        IsOptional()(target, propertyKey);
        IsRequiredString()(target, propertyKey);
    };
};

export const IsRequiredString = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty()(target, propertyKey);
        IsString()(target, propertyKey);
    };
};
export const IsOptionalStringArray = () => {
    return function (target: any, propertyKey: string) {
        IsOptional()(target, propertyKey);
        ApiProperty({ type: [String] })(target, propertyKey);
        IsArray()(target, propertyKey);
        IsString({ each: true })(target, propertyKey);
    };
};

export const IsRequiredStringArray = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: [String] })(target, propertyKey);
        IsArray()(target, propertyKey);
        ArrayMinSize(1, { message: ArrayMin(propertyKey) })(
            target,
            propertyKey,
        );
        IsString({ each: true })(target, propertyKey);
    };
};
