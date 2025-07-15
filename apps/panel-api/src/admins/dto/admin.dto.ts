import {
    IsOptionalString,
    IsRequiredEmail,
    IsRequiredString,
} from '@app/shared';

export class CreateAdminDto {
    @IsRequiredString() name: string;

    @IsRequiredEmail() email: string;

    @IsRequiredString() password: string;
}
export class UpdateAdminDto extends CreateAdminDto {
    @IsOptionalString() password: string;
}
