export interface IService {
    generateMessages(): Promise<number>;
}
export const ServiceToken = Symbol('AutoMessagesServiceToken');
