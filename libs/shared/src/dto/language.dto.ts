import { IsRequiredString } from '@app/shared/decorators';

export class LanguageDto {
    @IsRequiredString() name: string;
    @IsRequiredString() code: string;
    @IsRequiredString() image: string;
}
