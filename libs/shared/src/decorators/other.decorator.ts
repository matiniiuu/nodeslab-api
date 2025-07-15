import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

//* Email
export const IsRequiredEmail = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ example: 'info@nodelabs.com' })(target, propertyKey);
        IsEmail()(target, propertyKey);
    };
};
