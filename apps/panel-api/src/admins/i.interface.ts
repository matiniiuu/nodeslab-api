import { DataReply, IPanelService } from '@app/shared';

import { CreateDto, ModelType, ServiceTokenValue, UpdateDto } from './config';

export interface IService
    extends IPanelService<CreateDto, UpdateDto, ModelType> {
    me(email: string): DataReply<ModelType>;
    auth(email: string): Promise<ModelType | null>;
}
export const ServiceToken = Symbol(ServiceTokenValue);
