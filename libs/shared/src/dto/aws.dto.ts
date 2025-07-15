export class UploadDto {
    constructor(
        readonly data: Buffer,
        readonly filename: string,
    ) {}
}
