# 🏨 Booking Management System — NestJS Backend

A production-ready NestJS backend for a **Booking Management System** featuring JWT-based authentication with role-based access control (RBAC).

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS (TypeScript) |
| Auth | Passport.js + JWT |
| ORM | Prisma |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Validation | class-validator + class-transformer |
| Password Hashing | bcrypt |
| API Docs | Swagger UI |
| Config | @nestjs/config + .env |

---

## 📁 Project Structure

```
booking-management/
├── prisma/
│   ├── schema.prisma          # DB schema (User + Role enum)
│   └── seed.ts                # Admin + sample user seed
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts # Register, Login, GetMe
│   │   ├── auth.service.ts    # Business logic
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       ├── roles.decorator.ts
│   │       └── current-user.decorator.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── common/
│   │   └── enums/
│   │       └── role.enum.ts
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` (already done). Edit if needed:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3. Run Database Migration

```bash
npx prisma migrate dev --name init
```

### 4. Seed Default Users

```bash
npm run seed
```

This creates:
| Role  | Email | Password |
|-------|-------|----------|
| ADMIN | admin@booking.com | Admin@123 |
| USER  | user@booking.com  | User@123  |

### 5. Start the Server

```bash
npm run start:dev
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/v1`

### 🔐 Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login, get JWT |
| GET | `/auth/me` | Authenticated | Get own profile |

### 👥 Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/users` | ADMIN only | List all users |
| GET | `/users/:id` | Authenticated | Get user by ID |
| PATCH | `/users/:id` | Admin / Self | Update user |
| DELETE | `/users/:id` | ADMIN only | Delete user |

---

## 📚 Swagger UI

Visit **http://localhost:3000/api/docs** after starting the server.

To authorize:
1. Login via `/auth/login`
2. Copy the `accessToken`
3. Click **Authorize 🔒** → paste `Bearer <token>`

---

## 🛡️ Role-Based Access Control

```
ADMIN → Full access to all endpoints
USER  → Can register, login, view/update own profile only
```

### How it works:

```typescript
// Protect with JWT only
@UseGuards(JwtAuthGuard)

// Protect with JWT + role check
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)

// Get current user in controller
@CurrentUser() user: User
```

---

## 🔄 JWT Flow

```
1. POST /auth/register → user created → JWT returned
2. POST /auth/login    → credentials verified → JWT returned
3. Client stores JWT and sends: Authorization: Bearer <token>
4. JwtAuthGuard validates token → attaches user to req
5. RolesGuard checks req.user.role against @Roles() metadata
```

---

## 🌱 To Switch to PostgreSQL

Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/booking_db"
```

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then re-run: `npx prisma migrate dev`
