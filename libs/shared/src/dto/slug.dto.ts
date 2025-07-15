import { Exclude } from 'class-transformer';
import { IsRequiredSlug } from '../decorators';

export class BySlugDto {
    @Exclude()
    acceptLanguage: string;

    @IsRequiredSlug()
    slug: string;
}
