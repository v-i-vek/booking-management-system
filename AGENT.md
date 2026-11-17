# 🤖 AGENT.md — Booking Management System

> **Repository Master Guide for AI Agents & Developers**  
> This file provides high-density context, architectural invariants, code conventions, and execution workflows for AI coding assistants working in this workspace.

---

## 📌 1. Repository Overview

This project is a full-stack **Booking Management System** structured as a lightweight monorepo containing two decoupled packages:
- **`backend/`**: A NestJS 10 REST API using Prisma 5, PostgreSQL (hosted on Neon), JWT authentication with RBAC, and Swagger documentation.
- **`frontend/`**: A React 18 Single Page Application built with Vite 5, TypeScript, Tailwind CSS 3, Zustand, React Router 6, and React Hook Form + Zod.

```
booking-management/
├── backend/                  # NestJS API application
│   ├── prisma/               # Schema, migrations & seed script
│   ├── src/                  # NestJS source code (modules, controllers, services)
│   ├── .env.example          # Backend environment template
│   ├── package.json          # Backend dependencies and scripts
│   └── tsconfig.json         # Backend TypeScript config
├── frontend/                 # React + Vite application
│   ├── src/                  # React source code (pages, components, store, api)
│   ├── .env.example          # Frontend environment template
│   ├── vite.config.ts        # Vite config with dynamic proxy
│   ├── package.json          # Frontend dependencies and scripts
│   └── tsconfig.json         # Frontend TypeScript config
├── .gitignore                # Root gitignore (ignores node_modules, dist, .env*)
└── AGENT.md                  # This file
```

---

## ⚡ 2. Quickstart & Command Workflows

> **CRITICAL**: Always `cd` into either `backend/` or `frontend/` before executing package-specific commands.

### Backend Commands (`cd backend`)
| Action | Command | Notes |
| :--- | :--- | :--- |
| **Install** | `npm install` | Installs backend dependencies |
| **Start (Dev)** | `npm run start:dev` | Starts NestJS with hot reload (`http://localhost:3000`) |
| **Build** | `npm run build` | Compiles TypeScript into `dist/` |
| **Start (Prod)**| `npm run start:prod` | Runs compiled `dist/main.js` |
| **Prisma Generate** | `npx prisma generate` | Regenerates `@prisma/client` (run after schema edits) |
| **Prisma DB Push** | `npx prisma db push` | Pushes schema directly to database |
| **Prisma Migrate** | `npx prisma migrate dev` | Creates and applies database migrations |
| **Prisma Studio** | `npx prisma studio` | Interactive web UI for database inspection |
| **Seed Database** | `npm run seed` | Seeds default Admin (`admin@booking.com` / `Admin@123`) & User |

### Frontend Commands (`cd frontend`)
| Action | Command | Notes |
| :--- | :--- | :--- |
| **Install** | `npm install` | Installs frontend dependencies |
| **Start (Dev)** | `npm run dev` | Starts Vite dev server (`http://localhost:5173`) |
| **Build** | `npm run build` | Runs `tsc && vite build` into `dist/` |
| **Preview** | `npm run preview` | Previews production build locally |

---

## 📐 3. Architecture & Core Invariants

### 3.1 Backend Architecture (`backend/`)
- **Global API Prefix**: All REST endpoints are prefixed with `api/v1` (configured in `backend/src/main.ts`).
- **Swagger Documentation**: Live OpenAPI Swagger docs are mounted at `/api/docs`.
- **CORS Policy**: Configured to allow cross-origin requests (`origin: '*'`, credentials, standard headers).
- **Global Validation Pipe**: `ValidationPipe` is enabled with `whitelist: true`, `forbidNonWhitelisted: true`, and `transform: true`.
- **Database Layer**:
  - Datasource provider: `postgresql` (Neon / AWS RDS).
  - Client: `PrismaService` extending `PrismaClient` implements `OnModuleInit` and `OnModuleDestroy` lifecycle hooks.
- **Security & RBAC**:
  - Passwords hashed with `bcrypt` (10 salt rounds).
  - Stateless authentication via `PassportJwt` (`JwtStrategy`).
  - Route authorization via `@UseGuards(JwtAuthGuard, RolesGuard)` and custom `@Roles(Role.ADMIN)`.
  - Current user injection via `@CurrentUser()` decorator.

### 3.2 Frontend Architecture (`frontend/`)
- **Base Route Pattern**:
  - Public routes: `/login`, `/register`.
  - Protected routes (wrapped with `ProtectedRoute` + `AppLayout`): `/dashboard`, `/profile`.
  - Admin-only routes (wrapped with `AdminRoute`): `/users`.
  - Fallback: Wildcard `*` routes to `NotFoundPage`.
- **HTTP & API Layer**:
  - Single Axios instance in `frontend/src/api/axios.ts`.
  - Development: Uses Vite dev server proxy forwarding `/api` to `http://localhost:3000`.
  - Production: Dynamic resolution via `import.meta.env.VITE_API_URL` or fallback to `/api/v1`.
  - Interceptors: Automatically injects `Authorization: Bearer <token>` from `localStorage` (`bms_token`), and redirects to `/login` on `401`.
- **Global State**:
  - Managed by `zustand` in `frontend/src/store/authStore.ts`.
  - Stores `user`, `token`, `isAuthenticated`, and provides `login()`, `logout()`, `hydrate()`, and `updateUser()`.
- **Design System**:
  - Dark transit/operations theme (nocturnal blues `#0b1326`, electric cyan accents `#0ea5e9`, and emerald signals `#10b981`).
  - Modular UI components located in `frontend/src/components/ui/` (`Button`, `Input`, `Badge`, `Modal`, `Toast`, `LoadingSpinner`).

---

## 🔌 4. API Endpoints Contract

All endpoints require `Content-Type: application/json`.

### Authentication (`/api/v1/auth`)
| Method | Path | Auth Required | Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | No | Anyone | Registers a new user account |
| `POST` | `/api/v1/auth/login` | No | Anyone | Authenticates credentials, returns `{ token, user }` |
| `GET` | `/api/v1/auth/me` | Yes (`Bearer`) | Any | Returns profile of the authenticated user |

### Users Management (`/api/v1/users`)
| Method | Path | Auth Required | Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users` | Yes (`Bearer`) | `ADMIN` | Returns list of all registered users |
| `GET` | `/api/v1/users/:id` | Yes (`Bearer`) | `ADMIN` or Self | Fetches single user by UUID |
| `PATCH` | `/api/v1/users/:id` | Yes (`Bearer`) | `ADMIN` or Self | Updates user details (self cannot alter role/status) |
| `DELETE`| `/api/v1/users/:id` | Yes (`Bearer`) | `ADMIN` | Deletes a user by UUID |

---

## 🗄️ 5. Database Schema Reference

Defined in `backend/prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("USER")  // "USER" | "ADMIN"
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## ⚠️ 6. Common Pitfalls & Agent Invariants

1. **Prisma Client Staleness**:
   - Whenever `schema.prisma` is modified, you **must** run `npx prisma generate` in `backend/`. Otherwise, `@prisma/client` will fail to recognize schema changes or protocol shifts.
2. **Environment Variable Separation**:
   - Backend uses `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`.
   - Frontend uses Vite-prefixed variables: `VITE_BACKEND_URL` (for dev proxy) and `VITE_API_URL` (for production API domain).
   - Never commit `.env` or `.env.local` files.
3. **Path Aliasing**:
   - Backend: `@/*` resolves to `backend/src/*`.
   - Frontend: `@/*` resolves to `frontend/src/*`.
4. **Vite Dev Proxy vs Production**:
   - In development, frontend sends requests to `/api/v1/...` and Vite's dev proxy forwards them to `http://localhost:3000`.
   - In production on Render/Vercel, `VITE_API_URL` points directly to the hosted backend (e.g. `https://api.yourdomain.com/api/v1`).
5. **Render SPA Routing**:
   - On Render Static Sites, always maintain the rewrite rule: `/*` -> `/index.html`. Without this rule, browser reloads on non-root paths will trigger 404s.
