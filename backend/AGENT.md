# 🛡️ BACKEND AGENT.md — NestJS & Prisma Architecture

> **Backend Operational Guide for AI Agents**  
> Location: `backend/`  
> Working Directory: `f:\personal project\booking-management\backend`

---

## 🏗️ 1. Module & Directory Hierarchy

```
backend/
├── prisma/
│   ├── schema.prisma                  # Data models & datasource configuration
│   ├── seed.ts                        # Seed script for initial Admin and User
│   └── migrations/                    # Prisma migration history
├── src/
│   ├── main.ts                        # Entry point (NestFactory, CORS, Prefix, Swagger, Pipes)
│   ├── app.module.ts                  # Root module importing Config, Prisma, Auth, Users
│   ├── prisma/
│   │   ├── prisma.service.ts          # PrismaClient service with connect/disconnect hooks
│   │   └── prisma.module.ts           # Global PrismaModule
│   ├── auth/
│   │   ├── auth.controller.ts         # Routes: register, login, me
│   │   ├── auth.service.ts            # Password hash/compare, JWT signing
│   │   ├── auth.module.ts             # JwtModule configuration
│   │   ├── dto/
│   │   │   ├── login.dto.ts           # Email + Password validation
│   │   │   └── register.dto.ts        # Name + Email + Password validation
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts      # AuthGuard('jwt')
│   │   │   └── roles.guard.ts         # Checks reflector roles against request.user.role
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts        # Passport strategy extracting Bearer token
│   │   └── decorators/
│   │       ├── roles.decorator.ts     # @Roles(...Role[])
│   │       └── current-user.decorator.ts # Injects request.user
│   ├── users/
│   │   ├── users.controller.ts        # Admin user CRUD + self profile update
│   │   ├── users.service.ts           # Prisma user queries & updates
│   │   ├── users.module.ts            # UsersModule
│   │   └── dto/
│   │       └── update-user.dto.ts     # Partial update validation
│   └── common/
│       └── enums/
│           └── role.enum.ts           # Role: ADMIN = 'ADMIN', USER = 'USER'
├── .env                               # Environment variables
├── .env.example                       # Environment template
├── nest-cli.json                      # NestJS CLI config
├── package.json                       # Dependencies & scripts
└── tsconfig.json                      # Compiler options
```

---

## 🛠️ 2. Core Conventions & Coding Patterns

### Adding a New Entity / Table
1. Define the model in `prisma/schema.prisma`.
2. Run `npx prisma generate` to rebuild `@prisma/client`.
3. Run `npx prisma db push` (or `npx prisma migrate dev --name <migration_name>`).
4. Generate module, controller, service:
   ```bash
   nest g module <name>
   nest g service <name>
   nest g controller <name>
   ```

### Securing an Endpoint with JWT & Roles
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';

@ApiTags('Example')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('example')
export class ExampleController {
  @Get('admin-only')
  @Roles(Role.ADMIN)
  adminAction(@CurrentUser() user: any) {
    return { message: 'Admin verified', user };
  }
}
```

### Password Handling
- Passwords must **never** be returned in API response bodies.
- Always strip or exclude `password` from Prisma responses:
  ```typescript
  const { password, ...result } = user;
  return result;
  ```
- Use `bcrypt.hash(password, 10)` before storing.

---

## 🔐 3. Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | Secret key for signing JWTs | `super-secret-jwt-key` |
| `JWT_EXPIRES_IN`| Token lifespan | `7d` |
| `PORT` | Listening port (defaults to 3000) | `3000` |

---

## 🧪 4. Testing & Verification

- Run unit tests: `npm test`
- Run test watch: `npm run test:watch`
- Run test coverage: `npm run test:cov`
- Swagger UI verification: `http://localhost:3000/api/docs`
