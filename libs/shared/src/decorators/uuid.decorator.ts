import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsUUID } from 'class-validator';
import { ArrayMin } from '@app/shared/messages';

export const IsOptionalUuid = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional()(target, propertyKey);
        IsOptional()(target, propertyKey);
        IsRequiredUuid()(target, propertyKey);
    };
};

export const IsRequiredUuidArray = (version?: validator.UUIDVersion) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: [String] })(target, propertyKey);
        IsArray()(target, propertyKey);
        ArrayMinSize(1, { message: ArrayMin(propertyKey) })(
            target,
            propertyKey,
        );
        IsUUID(version, { each: true })(target, propertyKey);
    };
};

export const IsRequiredUuid = (version?: validator.UUIDVersion) => {
    return function (target: any, propertyKey: string) {
        ApiProperty()(target, propertyKey);
        IsUUID(version)(target, propertyKey);
    };
};
