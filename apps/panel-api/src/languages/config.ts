import { Language, LanguageDto, LanguageSchema } from '@app/shared';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/languages.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/languages.mongodb';

export type CreateDto = LanguageDto;
export type UpdateDto = LanguageDto;
export type ModelType = Language;

export const RouteName = 'languages';

export const ModelValue = Language;
export const ModelSchema = LanguageSchema;

export const DocumentName = 'Language';
export const ServiceTokenValue = 'LanguagesServiceToken';

export type IRepositoryValue = IRepository;
export const RepositoryTokenValue = RepositoryToken;
export const RepositoryMongoDBValue = RepositoryMongoDB;
