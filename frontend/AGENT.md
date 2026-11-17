# 🎨 FRONTEND AGENT.md — React, Vite & Tailwind Architecture

> **Frontend Operational Guide for AI Agents**  
> Location: `frontend/`  
> Working Directory: `f:\personal project\booking-management\frontend`

---

## 🏗️ 1. Directory & Component Hierarchy

```
frontend/
├── src/
│   ├── main.tsx                       # React DOM root render
│   ├── App.tsx                        # Router configuration and layout nesting
│   ├── index.css                      # Tailwind base, components, and utilities
│   ├── vite-env.d.ts                  # Vite client types & ImportMetaEnv definitions
│   ├── api/
│   │   ├── axios.ts                   # Central Axios client with token/401 interceptors
│   │   ├── auth.ts                    # authApi.login, register, getMe
│   │   └── users.ts                   # usersApi.getAll, getById, update, delete
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # Shell layout (Sidebar + Header + Content Outlet)
│   │   │   ├── Header.tsx             # Top navigation bar, title & user profile badge
│   │   │   └── Sidebar.tsx            # Navigation drawer with route links & logout
│   │   └── ui/
│   │       ├── Badge.tsx              # Role / Status chip badge
│   │       ├── Button.tsx             # Stylized button (primary, secondary, danger)
│   │       ├── Input.tsx              # Form input with floating label & error messages
│   │       ├── LoadingSpinner.tsx     # Animated SVG loading spinner
│   │       ├── Modal.tsx              # Accessible dialog modal
│   │       └── Toast.tsx              # Toast alerts stack
│   ├── hooks/
│   │   └── useToast.ts                # Toast state manager (addToast, removeToast)
│   ├── pages/
│   │   ├── LoginPage.tsx              # Login portal with Captcha, SSO, and Mode toggle
│   │   ├── RegisterPage.tsx           # Account registration form with Zod validation
│   │   ├── DashboardPage.tsx          # Metrics, analytics, and recent users table
│   │   ├── UsersPage.tsx              # Admin user management, search, filters & CRUD modal
│   │   ├── ProfilePage.tsx            # User personal info view & password updater
│   │   └── NotFoundPage.tsx           # 404 page with navigation fallback
│   ├── router/
│   │   ├── ProtectedRoute.tsx         # Redirects to /login if unauthenticated
│   │   └── AdminRoute.tsx             # Redirects to /dashboard if role !== 'ADMIN'
│   ├── store/
│   │   └── authStore.ts               # Zustand store for user session and token
│   └── types/
│       └── index.ts                   # TypeScript interfaces (User, AuthResponse, DTOs)
├── index.html                         # HTML template
├── tailwind.config.js                 # Theme colors, fonts, and dark mode configuration
├── postcss.config.js                  # PostCSS plugins
├── vite.config.ts                     # Vite server configuration & dynamic proxy
├── tsconfig.json                      # Application TypeScript config
├── tsconfig.node.json                 # Vite node config TypeScript config
└── package.json                       # Dependencies & scripts
```

---

## 🎨 2. Design System & Theme Rules

The UI strictly adheres to a **mission-critical dark transit operations portal**:
- **Backgrounds**: `#0b1326` (canvas), `#131b2e` (surface), `#171f33` (card/dialog), `#222a3d` (borders/dividers).
- **Primary Accent**: Electric Cyan (`#0ea5e9` / `#89ceff`).
- **Success / Online**: Signal Emerald (`#10b981`).
- **Danger / Deletion**: Crimson Coral (`#f43f5e`).
- **Warning**: Amber Glow (`#f59e0b`).
- **Typography**: `Plus Jakarta Sans` for headers, `Inter` for tables and data points.

When creating new components or views:
- Always use dark theme styling matching existing elements in `components/ui/`.
- Ensure all inputs have accessible labels and validation error display.
- Utilize the `clsx` utility for dynamic conditional class concatenation.

---

## 🔄 3. State & Authentication Invariants

### Zustand Auth Store (`store/authStore.ts`)
- Stores:
  - `user: User | null`
  - `token: string | null`
  - `isAuthenticated: boolean`
  - `isLoading: boolean`
- Helper methods:
  - `login(token, user)`: Sets state and writes `bms_token` & `bms_user` to `localStorage`.
  - `logout()`: Clears state and removes items from `localStorage`.
  - `hydrate()`: Re-reads session from `localStorage` on application mount.
  - `updateUser(partialUser)`: Updates the current user profile state.

### Axios Interceptors (`api/axios.ts`)
- Every outbound request automatically attaches `Authorization: Bearer <token>`.
- Any `401 Unauthorized` response immediately purges `localStorage` and redirects the browser to `/login`.

---

## 🚀 4. API Integration Pattern

When consuming or adding new API endpoints:
1. Define the TypeScript DTOs and return types in `types/index.ts`.
2. Create an API service file in `src/api/<feature>.ts` wrapping `api.get`, `api.post`, etc.
3. Call the API from page components using React hooks (`useEffect`, `useState`, `useCallback`) or React Hook Form with `@hookform/resolvers/zod`.
4. Trigger feedback alerts with `useToast()`.

---

## ⚙️ 5. Environment Variables & Vite Config

| Variable | Scope | Purpose |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Local Dev | Target URL for Vite dev proxy in `vite.config.ts` (e.g. `http://localhost:3000`) |
| `VITE_API_URL` | Production | Explicit API base URL (e.g. `https://api.yourdomain.com/api/v1`) |

- **Local Dev**: In `frontend/.env`, set `VITE_BACKEND_URL=http://localhost:3000`. Leave `VITE_API_URL` unset so requests go through the Vite proxy.
- **Production Build**: Configure `VITE_API_URL` in your deployment platform (Render, Vercel, Netlify).
