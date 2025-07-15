import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const IsOptionalSlug = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ example: 'ksa-usa' })(target, propertyKey);
        IsOptional()(target, propertyKey);
        IsRequiredSlug()(target, propertyKey);
    };
};

export const IsRequiredSlug = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ example: 'ksa-usa' })(target, propertyKey);
        IsString()(target, propertyKey);
        Transform(({ value }) => value.toLowerCase().replace(/\s+/g, '-'))(
            target,
            propertyKey,
        );
    };
};
