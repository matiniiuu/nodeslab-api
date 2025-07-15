import { Exclude } from 'class-transformer';

export class AcceptLanguageDto {
    @Exclude() acceptLanguage: string;
}
