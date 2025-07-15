import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
    IsObject,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
    ValidateNested,
    ArrayMinSize,
    IsArray,
    IsOptional,
} from 'class-validator';
import { ArrayMin } from '@app/shared/messages';

export const IsRequiredObject = () => {
    return function (target: any, propertyKey: string) {
        ApiProperty()(target, propertyKey);
        IsObject()(target, propertyKey);
    };
};

@ValidatorConstraint({ async: false })
class IsValidTitleConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean {
        if (typeof value !== 'object' || value === null) {
            return false; // Must be an object
        }

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const val = value[key];
                if (typeof val !== 'string') {
                    return false; // All values must be strings
                }
            }
        }
        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return `Each key in '${args.property}' must have a string value.`;
    }
}
export const IsRequiredTranslation = (
    validationOptions?: ValidationOptions,
) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({
            example: { en: 'en name', tr: 'tr name' },
        })(target, propertyKey);
        registerDecorator({
            target: target.constructor,
            propertyName: propertyKey,
            options: validationOptions,
            constraints: [],
            validator: IsValidTitleConstraint,
        });
    };
};
export const IsOptionalTranslation = (
    validationOptions?: ValidationOptions,
) => {
    return function (target: any, propertyKey: string) {
        IsOptional()(target, propertyKey);
        IsRequiredTranslation(validationOptions)(target, propertyKey);
    };
};

@ValidatorConstraint({ async: false })
class IsValidDescriptionConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean {
        if (typeof value !== 'object' || value === null) {
            return false; // Must be an object
        }

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const entity = value[key];
                if (
                    !entity ||
                    !Array.isArray(entity.values) ||
                    !entity.values.every((v: any) => typeof v === 'string')
                ) {
                    return false; // Check the structure of StringArrayEntity
                }
            }
        }
        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return `Each key in '${args.property}' must have a value of type { values: string[] }.`;
    }
}

export const IsRequiredTranslationStringArray = (
    validationOptions?: ValidationOptions,
) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({
            example: {
                en: { values: ['en desc 1', 'en desc 2'] },
                tr: { values: ['tr desc 1', 'tr desc 2'] },
            },
        })(target, propertyKey);
        registerDecorator({
            target: target.constructor,
            propertyName: propertyKey,
            options: validationOptions,
            constraints: [],
            validator: IsValidDescriptionConstraint,
        });
    };
};

export const IsRequiredTypedObjectArray = (type: Function) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: type, isArray: true })(target, propertyKey);
        IsArray()(target, propertyKey);
        ArrayMinSize(1, { message: ArrayMin(propertyKey) })(
            target,
            propertyKey,
        );
        ValidateNested({ each: true });
        Type(() => type);
    };
};

export const IsOptionalTypedObjectArray = (type: Function) => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ type: type, isArray: true })(target, propertyKey);
        IsOptional({ each: true })(target, propertyKey);
        IsArray()(target, propertyKey);
        ValidateNested({ each: true });
        Type(() => type);
    };
};

export const IsRequiredTypedObject = (type: Function) => {
    return function (target: any, propertyKey: string) {
        ApiProperty({ type: type })(target, propertyKey);
        ValidateNested();
        Type(() => type);
    };
};

export const IsOptionalTypedObject = (type: Function) => {
    return function (target: any, propertyKey: string) {
        ApiPropertyOptional({ type: type, isArray: true })(target, propertyKey);
        IsOptional()(target, propertyKey);
        ValidateNested();
        Type(() => type);
    };
};
