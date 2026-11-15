import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Global Prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ─── Global Validation Pipe ────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true,           // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ─── Swagger Documentation ─────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('🏨 Booking Management System')
    .setDescription(
      `
## REST API Documentation

A complete booking management backend with JWT authentication and role-based access control.

### Authentication
1. **Register** a new account via \`POST /api/v1/auth/register\`
2. **Login** via \`POST /api/v1/auth/login\` to receive a JWT token
3. Click **Authorize** (🔒) and enter: \`Bearer <your_token>\`

### Roles
| Role  | Access |
|-------|--------|
| USER  | Register, Login, View/Update own profile |
| ADMIN | Full access — manage all users |

### Default Credentials (after seeding)
| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@booking.com | Admin@123 |
| User  | user@booking.com  | User@123  |
      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'Register, Login, Get current user')
    .addTag('Users', 'User management (Admin & Self)')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // ─── Start Server ──────────────────────────────────────────────────────────
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log('');
  console.log('🚀 Booking Management API is running!');
  console.log(`📡 Base URL  : http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger   : http://localhost:${port}/api/docs`);
  console.log('');
}

bootstrap();
