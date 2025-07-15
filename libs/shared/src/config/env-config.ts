import * as joi from 'joi';

export const config = {
    ADMIN_API_PORT: 'ADMIN_API_PORT',
    CORE_API_PORT: 'CORE_API_PORT',

    MONGODB_URI: 'MONGODB_URI',

    ADMIN_JWT_ACCESS_SECRET: 'ADMIN_JWT_ACCESS_SECRET',
    ADMIN_JWT_ACCESS_EXPIRATION_TIME: 'ADMIN_JWT_ACCESS_EXPIRATION_TIME',
    ADMIN_JWT_REFRESH_SECRET: 'ADMIN_JWT_REFRESH_SECRET',
    ADMIN_JWT_REFRESH_EXPIRATION_TIME: 'ADMIN_JWT_REFRESH_EXPIRATION_TIME',

    USER_JWT_ACCESS_SECRET: 'USER_JWT_ACCESS_SECRET',
    USER_JWT_ACCESS_EXPIRATION_TIME: 'USER_JWT_ACCESS_EXPIRATION_TIME',
    USER_JWT_REFRESH_SECRET: 'USER_JWT_REFRESH_SECRET',
    USER_JWT_REFRESH_EXPIRATION_TIME: 'USER_JWT_REFRESH_EXPIRATION_TIME',

    S3_BUCKET: 'S3_BUCKET',
    S3_AWS_ACCESS_KEY: 'S3_AWS_ACCESS_KEY',
    S3_AWS_SECRET_KEY: 'S3_AWS_SECRET_KEY',
    S3_AWS_REGION: 'S3_AWS_REGION',
    CLOUDFRONT: 'CLOUDFRONT',

    SES_AWS_ACCESS_KEY: 'SES_AWS_ACCESS_KEY',
    SES_AWS_SECRET_KEY: 'SES_AWS_SECRET_KEY',
    SES_AWS_REGION: 'SES_AWS_REGION',

    SWAGGER_USERNAME: 'SWAGGER_USERNAME',
    SWAGGER_PASSWORD: 'SWAGGER_PASSWORD',
};
export const validationSchema = joi.object({
    [config.ADMIN_API_PORT]: joi.string().required(),
    [config.CORE_API_PORT]: joi.string().required(),

    [config.MONGODB_URI]: joi.string().required(),
    [config.ADMIN_JWT_ACCESS_SECRET]: joi.string().required(),
    [config.ADMIN_JWT_ACCESS_EXPIRATION_TIME]: joi.string().required(),
    [config.ADMIN_JWT_REFRESH_SECRET]: joi.string().required(),
    [config.ADMIN_JWT_REFRESH_EXPIRATION_TIME]: joi.string().required(),

    [config.USER_JWT_ACCESS_SECRET]: joi.string().required(),
    [config.USER_JWT_ACCESS_EXPIRATION_TIME]: joi.string().required(),
    [config.USER_JWT_REFRESH_SECRET]: joi.string().required(),
    [config.USER_JWT_REFRESH_EXPIRATION_TIME]: joi.string().required(),

    [config.S3_BUCKET]: joi.string().required(),
    [config.S3_AWS_ACCESS_KEY]: joi.string().required(),
    [config.S3_AWS_SECRET_KEY]: joi.string().required(),
    [config.S3_AWS_REGION]: joi.string().required(),
    [config.CLOUDFRONT]: joi.string().required(),

    [config.SES_AWS_ACCESS_KEY]: joi.string().required(),
    [config.SES_AWS_SECRET_KEY]: joi.string().required(),
    [config.SES_AWS_REGION]: joi.string().required(),

    [config.SWAGGER_USERNAME]: joi.string().required(),
    [config.SWAGGER_PASSWORD]: joi.string().required(),
});
