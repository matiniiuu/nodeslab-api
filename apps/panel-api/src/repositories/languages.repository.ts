import { Language, LanguageDto, IPanelRepository } from '@app/shared';

export interface IRepository
    extends IPanelRepository<LanguageDto, LanguageDto, Language> {}
export const RepositoryToken = Symbol('LanguagesRepositoryToken');
