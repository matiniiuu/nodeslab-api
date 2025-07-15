import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { ArrayMin } from '@app/shared/messages';

export const IsOptionalMongoId = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ example: '677a98575aab3f1ddcb27d5a' })(
            target,
            propertyKey,
        );
        IsOptional()(target, propertyKey);
        IsRequiredMongoId()(target, propertyKey);
    };
};
export const IsRequiredMongoId = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ example: '677a98575aab3f1ddcb27d5a' })(
            target,
            propertyKey,
        );
        IsMongoId()(target, propertyKey);
    };
};
export const IsRequiredMongoIdArray = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({
            type: [String],
            example: ['677a98575aab3f1ddcb27d5a', '677a98575aab3f1ddcb27d5c'],
            isArray: true,
        })(target, propertyKey);
        IsArray()(target, propertyKey);
        ArrayMinSize(1, { message: ArrayMin(propertyKey) })(
            target,
            propertyKey,
        );
        IsMongoId({ each: true })(target, propertyKey);
    };
};
export const IsOptionalMongoIdArray = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({
            type: [String],
            example: ['677a98575aab3f1ddcb27d5a', '677a98575aab3f1ddcb27d5c'],
            isArray: true,
        })(target, propertyKey);
        IsOptional({ each: true })(target, propertyKey);
        IsArray()(target, propertyKey);
        IsMongoId({ each: true })(target, propertyKey);
    };
};
