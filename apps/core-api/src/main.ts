import helmet from '@fastify/helmet';
import multiPart from '@fastify/multipart';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisClientType } from 'redis';

import { AppModule } from './app.module';

import {
    config,
    CustomValidationPipe,
    MongooseValidationException,
    RequestLogger,
} from '@app/shared';
import { RedisIoAdapter } from './redis';
import { REDIS_CLIENT } from './redis/redis.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: false }),
        { rawBody: true },
    );
    await app.register(helmet);

    const configService = app.get(ConfigService);
    const fastify = app.getHttpAdapter().getInstance();

    // Protect Swagger routes with basic auth
    fastify.addHook('onRequest', (request, reply, done) => {
        const swaggerRoutes = ['/doc', '/doc-json'];
        if (swaggerRoutes.includes(request.url)) {
            const { authorization } = request.headers;
            const credentials = Buffer.from(
                `${configService.get(config.SWAGGER_USERNAME)}:${configService.get(config.SWAGGER_PASSWORD)}`,
            ).toString('base64');
            if (!authorization || authorization !== `Basic ${credentials}`) {
                reply
                    .code(401)
                    .header('WWW-Authenticate', 'Basic realm="Swagger"')
                    .send('Unauthorized');
                return;
            }
        }
        done();
    });

    const documentFactory = () =>
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .addBearerAuth({
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'JWT',
                    description: 'Enter JWT token',
                    in: 'header',
                })
                .setTitle('Simnetic Core API')
                .setDescription('The Core API')
                .setVersion('1.0')
                .build(),
        );
    SwaggerModule.setup('doc', app, documentFactory);

    app.use(RequestLogger);

    app.useGlobalPipes(new CustomValidationPipe());

    app.useGlobalFilters(new MongooseValidationException());

    app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

    const options = {
        origin: '*',
        methods: 'GET,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
    app.enableCors(options);
    await app.register(multiPart, { limits: { fileSize: 100 * 1024 * 1024 } });

    const redisIoAdapter = new RedisIoAdapter();
    await redisIoAdapter.connectToRedis(app.get<RedisClientType>(REDIS_CLIENT));

    app.useWebSocketAdapter(redisIoAdapter);
    await app.listen(
        +(configService.get(config.CORE_API_PORT) ?? 8000),
        '0.0.0.0',
    );
}
bootstrap();
