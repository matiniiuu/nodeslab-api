import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export const IsRequiredStringDateTime = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: Date, example: new Date().toISOString() })(
            target,
            propertyKey,
        );
        IsISO8601()(target, propertyKey);
    };
};

export const IsOptionalStringDateTime = () => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ type: Date, example: new Date().toISOString() })(
            target,
            propertyKey,
        );
        IsOptional()(target, propertyKey);
        IsISO8601()(target, propertyKey);
    };
};
