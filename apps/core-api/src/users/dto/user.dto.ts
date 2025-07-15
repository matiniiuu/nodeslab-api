import { IsRequiredEmail, IsRequiredString } from '@app/shared';

export class LoginUserDto {
    @IsRequiredString() email: string;
    @IsRequiredString() password: string;
}
export class RegisterUserDto {
    @IsRequiredString() name: string;
    @IsRequiredEmail() email: string;
    @IsRequiredString() password: string;
}
export class UpdateProfileDto {
    @IsRequiredString() name: string;
}
