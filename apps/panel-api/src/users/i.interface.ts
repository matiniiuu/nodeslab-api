import { CreateDto, UpdateDto, ModelType, ServiceTokenValue } from './config';
import { IPanelService } from '@app/shared';

export interface IService
    extends IPanelService<CreateDto, UpdateDto, ModelType> {}
export const ServiceToken = Symbol(ServiceTokenValue);
