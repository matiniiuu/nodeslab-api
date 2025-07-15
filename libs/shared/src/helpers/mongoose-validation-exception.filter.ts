import { Error as MongooseError } from 'mongoose';
import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';

@Catch(MongooseError.ValidationError)
export class MongooseValidationException implements ExceptionFilter {
    catch(exception: MongooseError.ValidationError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const messages = Object.values(exception.errors).map((err) => {
            return err.message;
        });

        response.status(HttpStatus.BAD_REQUEST).send({
            messages,
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
        });
    }
}
