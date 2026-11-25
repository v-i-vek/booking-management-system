# 🤖 AGENT.md — Lumigram Social App

> **Repository Master Guide for AI Agents & Developers**  
> This file provides high-density context, architectural invariants, design system guidelines, code conventions, and execution workflows for AI coding assistants working in this workspace.

---

## 📌 1. Repository Overview

This project is **Lumigram**, an editorial, high-performance social media web application (Instagram / Threads clone) built on the **"Midnight Editorial"** design system.

The repository is structured as a decoupled monorepo:
- **`frontend/`**: React 18 SPA with Vite 5, TypeScript, Tailwind CSS 3, Zustand, and React Router 6. Features Home Feed with Stories, Explore & Discovery Grid, Reels Vertical Player, Direct Messaging, Creator Profile, Post Creation Studio, and Notifications.
- **`backend/`**: NestJS 10 REST API with Prisma 5, PostgreSQL (hosted on Neon), JWT authentication with RBAC, and Swagger documentation.

```
booking-management/
├── backend/                  # NestJS API application
│   ├── prisma/               # Schema, migrations & seed script
│   ├── src/                  # NestJS modules, controllers, services, guards
│   ├── .env.example          # Backend environment template
│   ├── package.json          # Backend dependencies and scripts
│   └── tsconfig.json         # Backend TypeScript config
├── frontend/                 # React + Vite Social Media application
│   ├── src/
│   │   ├── api/              # Axios instance & endpoints
│   │   ├── components/       # Layout, Navigation, UI components, Modals
│   │   ├── pages/            # FeedPage, ExplorePage, ReelsPage, MessagesPage, ProfilePage
│   │   ├── router/           # Route guards (ProtectedRoute, AdminRoute)
│   │   ├── store/            # socialStore (Zustand) & authStore (Zustand)
│   │   ├── types/            # TypeScript interfaces & social data models
│   │   ├── App.tsx           # Route declarations
│   │   └── main.tsx          # React DOM entry point
│   ├── .env.example          # Frontend environment template
│   ├── vite.config.ts        # Vite config with dynamic proxy
│   ├── tailwind.config.js    # Midnight Editorial design tokens
│   ├── package.json          # Frontend dependencies and scripts
│   └── tsconfig.json         # Frontend TypeScript config
├── .gitignore                # Root gitignore
└── AGENT.md                  # This file
```

---

## 🎨 2. Design System: "Midnight Editorial"

Lumigram embodies an ultra-refined, high-focus social media experience built for high-signal curation and visual storytelling, pairing deep nocturnal pitch with vibrant sunset gradient accents:

- **Canvas & Surfaces**:
  - `surface` / `background`: `#131313`
  - `surface-container-lowest`: `#0e0e0e`
  - `surface-container-low`: `#1c1b1b`
  - `surface-container`: `#201f1f`
  - `surface-container-high`: `#2a2a2a`
  - `surface-container-highest`: `#353534`
- **Brand Gradient Spectrum**:
  - `linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)` (used for unread story rings, active status indicators, and creative accents).
- **Primary Action Accent**:
  - `#0095F6` (links, follow buttons, verification badges).
- **Typography**:
  - Primary font: **Plus Jakarta Sans** (weights 400 to 800) for geometric rigor, tight headlines, and compact reading.
- **Icons**:
  - **Material Symbols Outlined** (`<span class="material-symbols-outlined">...</span>`).

---

## 📱 3. Frontend Pages & Features

| Route | Page Component | Key Features |
| :--- | :--- | :--- |
| `/`, `/feed` | `FeedPage` | Stories carousel with gradient rings, 630px central feed, double-tap to like, comments preview, inline comment input, right-rail user card & suggestions |
| `/explore` | `ExplorePage` | Sticky search input, category filter chips (`Architecture`, `Editorial`, `Film & 35mm`), 3-column discovery masonry grid with 2x2 featured reels, hover overlays |
| `/reels` | `ReelsPage` | Fullscreen 9:16 vertical video player with dynamic blurred ambient aura, creator overlay, follow button, action rail (likes, comments, share, save), vinyl audio disc, slide-over comments drawer |
| `/messages` | `MessagesPage` | Instagram Direct: Left pane with Notes thought bubbles, conversation threads, unread counters; Right pane with real-time chat messages, voice/call controls, message input |
| `/profile` | `ProfilePage` | Creator profile header, avatar story ring, post/follower/following metrics, bio, story highlights tray, tab switcher (`POSTS`, `REELS`, `SAVED`, `TAGGED`), interactive Edit Profile modal |
| Global Modal | `CreatePostModal` | Accessible from sidebar/bottom bar "+ Create": image upload/presets, aspect ratios (1:1, 4:5, 16:9), live CSS photo filters (Clarendon, Moon, etc.), caption textarea, location tag, and instant feed publishing |
| Global Drawer| `NotificationsDrawer`| Flyout drawer displaying likes, comments, and new followers with mark-as-read |

---

## ⚡ 4. State Management (`socialStore.ts`)

Global social media state is managed by `useSocialStore` in `frontend/src/store/socialStore.ts`:
- **State**:
  - `currentUser`: Current logged-in user profile
  - `posts`: Array of timeline posts with nested comments and like/save states
  - `stories`: Array of active stories
  - `reels`: Array of short vertical video reels
  - `conversations`: Array of direct message threads with full message history
  - `notes`: Array of user thought bubbles
  - `notifications`: Activity alerts
  - `activeExploreTag`, `searchQuery`
  - `isCreatePostOpen`, `isNotificationsOpen`
- **Actions**:
  - `toggleLikePost(postId)`, `toggleSavePost(postId)`, `addCommentToPost(postId, text)`
  - `toggleLikeReel(reelId)`, `toggleSaveReel(reelId)`, `addCommentToReel(reelId, text)`
  - `createPost(postData)`: Adds a new post immediately to the feed and user profile
  - `sendMessage(conversationId, text)`: Appends message to chat thread
  - `toggleFollowUser(username)`: Updates follow state across reels and suggestions

---

## 🛠️ 5. Commands & Workflows

### Frontend (`cd frontend`)
| Command | Action |
| :--- | :--- |
| `npm install` | Install frontend packages |
| `npm run dev` | Start local Vite development server (`http://localhost:5173`) |
| `npm run build` | Compile TypeScript (`tsc`) and bundle for production (`vite build`) |
| `npm run preview` | Preview production build locally |

### Backend (`cd backend`)
| Command | Action |
| :--- | :--- |
| `npm install` | Install backend packages |
| `npm run start:dev` | Start NestJS development server (`http://localhost:3000`) |
| `npm run build` | Compile TypeScript with Nest CLI |
| `npx prisma generate` | Regenerate Prisma Client |
| `npx prisma db push` | Push schema changes to PostgreSQL |

---

## ⚠️ 6. Key Agent Invariants

1. **Working Directory**: Always `cd` into `frontend/` or `backend/` before executing commands.
2. **Path Aliasing**:
   - `frontend/src/*` is aliased as `@/*`.
   - `backend/src/*` is aliased as `@/*`.
3. **SPA Routing on Render**:
   - Maintain the rewrite rule `/*` -> `/index.html` on Render Static Site to prevent 404s on browser reload.
4. **Design Cohesion**:
   - Always preserve the dark `#131313` canvas, Plus Jakarta Sans typography, and Material Symbols Outlined icons when adding new social features.
