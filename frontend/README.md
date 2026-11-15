# Booking Management System — Frontend

A modern, high-performance React + TypeScript + Vite + Tailwind CSS frontend for the **Booking Management System**, styled with a mission-critical, dark transit/railway-inspired design system.

---

## 🎨 Design System & Theme

The UI accurately reflects the transit operations portal design (IRCTC / PRS architecture):
- **Base Canvas:** Deep nocturnal slate (`#0b1326`, `#131b2e`, `#171f33`, `#222a3d`)
- **Primary Accent:** Electric Sky Cyan (`#0ea5e9` / `#89ceff`)
- **Status Green:** Signal Emerald (`#10b981`)
- **Typography:** **Plus Jakarta Sans** (headings) & **Inter** (data-dense tabular figures & body)
- **Visuals:** High-density enterprise layout, low-contrast tonal borders, verified status badges, subtle cyan glow accents.

---

## 🚀 Features

- **Auth Portal (`/login`)**:
  - Exact recreation of the attached design:
    - Mode toggle between **User Login** and **Admin/Staff SSO Channel**
    - High-entropy graphical Captcha simulator with text-to-speech audio reader (`speechSynthesis`) and live refresh
    - "Trust this terminal for 8 hrs" checkbox
    - Alternative access buttons (OTP Authentication & National SSO / MeriPehchaan)
    - CERT-In / Cyber Security advisory badge panel
    - Latency telemetry indicator & SSL security badges
- **Registration (`/register`)**:
  - Full name, email, and password validation with confirmation check
- **Admin & Role-based Routing (`ProtectedRoute`, `AdminRoute`)**:
  - Persistent auth using **Zustand** + `localStorage`
  - Axios interceptors that attach `Bearer <JWT_TOKEN>` on all requests and redirect on `401 Unauthorized`
- **Dashboard (`/dashboard`)**:
  - Role-adaptive metrics:
    - Admin: Total users, active accounts, admin count, and inactive accounts with quick telemetry
    - User: Current role, account status, and membership tenure
  - Real-time recent users table with role and status pills
- **User Management (`/users`)** *(Admin only)*:
  - Live search by name or email
  - Role filters (`ALL`, `USER`, `ADMIN`)
  - Edit user dialog (name, email, role, active status, password change)
  - Delete user confirmation modal
- **Profile Settings (`/profile`)**:
  - View personal identification metadata
  - Update full name, email, or change password
- **Toast Notifications (`useToast`)**:
  - Animated toast alerts for all actions (login, updates, errors, deletions)

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Vite 5**
- **Tailwind CSS 3**
- **React Router DOM v6**
- **Zustand** (Global state management)
- **React Hook Form** + **Zod** (Form validation)
- **Axios** (API HTTP Client)
- **Google Fonts** (Plus Jakarta Sans, Inter, Material Symbols Outlined)

---

## 📦 Getting Started

### 1. Ensure Backend is Running
The NestJS backend should be running on `http://localhost:3000`:
```bash
# In the root project directory:
npm run start:dev
```
Backend API will be accessible at: `http://localhost:3000/api/v1`

### 2. Install Frontend Dependencies
Navigate into the `frontend` directory:
```bash
cd frontend
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔑 Default Credentials (from backend seed)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@booking.com` | `Admin@123` |
| **User** | `user@booking.com` | `User@123` |

---

## 📁 Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── src/
│   ├── api/
│   │   ├── axios.ts        # Axios client with JWT interceptors
│   │   ├── auth.ts         # Login, register, me endpoints
│   │   └── users.ts        # User CRUD endpoints
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── hooks/
│   │   └── useToast.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx   # Exact design recreation
│   │   ├── NotFoundPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── UsersPage.tsx   # Admin management table
│   ├── router/
│   │   ├── AdminRoute.tsx
│   │   └── ProtectedRoute.tsx
│   ├── store/
│   │   └── authStore.ts    # Zustand user & JWT token store
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```
