import {
    Injectable,
    BadRequestException,
    ValidationPipe,
    ValidationError,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        super({
            transform: true,
            validateCustomDecorators: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const formattedErrors = this.flattenValidationErrors(errors);
                console.log(formattedErrors);

                return new BadRequestException({
                    error: 'Bad Request',
                    statusCode: 400,
                    messages: formattedErrors,
                });
            },
        });
    }
}
