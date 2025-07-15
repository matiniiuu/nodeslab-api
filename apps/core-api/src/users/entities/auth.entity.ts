export class UserJwtPayload {
    constructor(readonly email: string) {}
    get tokenPayload() {
        return { email: this.email };
    }
}
