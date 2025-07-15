# Project Title

NestJS Multi-API Workspace

## Overview

This repository contains a NestJS workspace project designed to efficiently separate and manage multiple APIs—such as admin, mobile, and web—within a single monorepo. It leverages MongoDB, Redis, RabbitMQ, and NestJS cron jobs to provide a scalable, maintainable architecture suited for enterprise applications.

## Features

- **Monorepo Workspace:** Organize multiple APIs in one project for shared configuration and dependencies.
- **API Separation:** Independent Admin (`admin-api`) and Core (`core-api`) services.
- **Data Persistence:** MongoDB integration for flexible document storage.
- **Caching & Sessions:** Redis for caching and session management.
- **Messaging:** RabbitMQ for event-driven communication.
- **Scheduled Tasks:** Built-in cron jobs via `@nestjs/schedule`.
- **Swagger/OpenAPI:** Auto-generated API documentation with environment-protected access.

## Prerequisites

- Node.js (>=20.x)
- Yarn (>=1.22.x)
- Docker & Docker Compose (optional)
- MongoDB
- Redis
- RabbitMQ

## Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies**

    ```bash
    yarn install
    ```

3. **Environment Variables** Create a `.env` file at the root of the workspace and configure the following variables:

    ```dotenv
    # MongoDB
    MONGODB_URI=mongodb://<host>:<port>/<database>

    # Redis
    REDIS_URL=<host>
    REDIS_PASSWORD=<password>

    # RabbitMQ
    RABBITMQ_URI=amqp://<user>:<password>@<host>:<port>

    # Swagger Credentials
    SWAGGER_USERNAME=<username>
    SWAGGER_PASSWORD=<password>

    # Application Ports
    ADMIN_API_PORT=8001
    CORE_API_PORT=8000

    # Auth

    ADMIN_JWT_ACCESS_SECRET=<secret>
    ADMIN_JWT_ACCESS_EXPIRATION_TIME="1h"
    ADMIN_JWT_REFRESH_SECRET=<secret>
    ADMIN_JWT_REFRESH_EXPIRATION_TIME="30d"

    USER_JWT_ACCESS_SECRET=<secret>
    USER_JWT_ACCESS_EXPIRATION_TIME="1h"
    USER_JWT_REFRESH_SECRET=<secret>
    USER_JWT_REFRESH_EXPIRATION_TIME="30d"
    ```

## Running the APIs

### Admin API

- **Start in development mode**
    ```bash
    yarn start:dev admin-api
    ```
- **Default port:** `8001`
- **Swagger UI:** [http://localhost:8001/swagger](http://localhost:8001/swagger) (use credentials from `.env`)

### Core API

- **Start in development mode**
    ```bash
    yarn start:dev core-api
    ```
- **Default port:** `8000`
- **Swagger UI:** [http://localhost:8000/swagger](http://localhost:8000/swagger) (use credentials from `.env`)

## Project Structure

```
nestjs-workspace/
├── apps/
│   ├── admin-api/
│   └── core-api/
├── libs/
│   ├── common/
│   ├── database/
│   └── ...
├── node_modules/
├── package.json
├── yarn.lock
└── tsconfig.json
```

- **apps/**: Contains each API application.
- **libs/**: Shared libraries (database, utilities, DTOs, guards, etc.).

## Database

- **MongoDB**
    - Connection via Mongoose module.
    - Schemas defined in each app or shared library.

## Caching & Sessions

- **Redis**
    - Configured as a cache store and session store.

## Messaging

- **RabbitMQ**
    - Event-based communication between services.
    - Consumers and publishers configured via `@nestjs/microservices`.

## Cron Jobs

- Scheduled tasks implemented using `@nestjs/schedule`.
- Add cron methods in dedicated services under each app.

## Swagger Documentation

- Enabled in both Admin and Core APIs.
- Protect your docs using basic auth; credentials stored in environment variables.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
