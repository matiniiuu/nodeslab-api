export class AdminJwtPayload {
    constructor(readonly email: string) {}
    get tokenPayload() {
        return { email: this.email };
    }
}
