# 🎨 FRONTEND AGENT.md — Lumigram Social App

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
│   ├── index.css                      # Tailwind base, utilities, sunset gradient
│   ├── vite-env.d.ts                  # Vite client types & ImportMetaEnv definitions
│   ├── api/
│   │   ├── axios.ts                   # Central Axios client with token/401 interceptors
│   │   ├── auth.ts                    # authApi.login, register, getMe
│   │   └── users.ts                   # usersApi.getAll, getById, update, delete
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # Shell layout (Sidebar + Header + Content Outlet)
│   │   │   ├── Header.tsx             # Top navigation bar with quick shortcuts & mobile brand
│   │   │   ├── Sidebar.tsx            # Left navigation rail with badges & More menu
│   │   │   ├── MobileBottomBar.tsx    # Mobile bottom icon navigation
│   │   │   └── NotificationsDrawer.tsx# Notifications flyout drawer
│   │   ├── post/
│   │   │   └── CreatePostModal.tsx    # Post creation studio (upload, aspect ratio, filters, caption)
│   │   └── ui/
│   │       ├── Badge.tsx              # Pill chip badge
│   │       ├── Button.tsx             # Stylized button
│   │       ├── Input.tsx              # Input with floating label & error messages
│   │       ├── LoadingSpinner.tsx     # Animated SVG loading spinner
│   │       ├── Modal.tsx              # Accessible dialog modal
│   │       └── Toast.tsx              # Toast alerts stack
│   ├── hooks/
│   │   └── useToast.ts                # Toast state manager (addToast, removeToast)
│   ├── pages/
│   │   ├── FeedPage.tsx               # Home feed with stories carousel, posts, suggestions
│   │   ├── ExplorePage.tsx            # Discovery grid, search input, topic chips, lightbox
│   │   ├── ReelsPage.tsx              # Vertical 9:16 reels player with ambient aura & comments
│   │   ├── MessagesPage.tsx           # Direct messages, notes tray, chat stream, live send
│   │   ├── ProfilePage.tsx            # Creator profile, highlights, tabs (posts/reels/saved), edit modal
│   │   ├── LoginPage.tsx              # Login portal with Captcha and SSO
│   │   ├── RegisterPage.tsx           # Account registration form with Zod validation
│   │   └── NotFoundPage.tsx           # 404 page with navigation fallback
│   ├── router/
│   │   ├── ProtectedRoute.tsx         # Route protection
│   │   └── AdminRoute.tsx             # Admin route restriction
│   ├── store/
│   │   ├── socialStore.ts             # Central social state (posts, stories, reels, DMs, likes)
│   │   └── authStore.ts               # Zustand store for user session and token
│   └── types/
│       ├── index.ts                   # Core interfaces
│       └── social.ts                  # Social models (SocialPost, SocialReel, Conversation, StoryItem)
├── index.html                         # HTML template with Plus Jakarta Sans & Material Symbols
├── tailwind.config.js                 # Midnight Editorial design tokens
├── postcss.config.js                  # PostCSS plugins
├── vite.config.ts                     # Vite server configuration & dynamic proxy
├── tsconfig.json                      # Application TypeScript config
└── package.json                       # Dependencies & scripts
```

---

## 🎨 2. Design System: "Midnight Editorial"

- **Theme Palette**:
  - `surface` (`#131313`), `surface-container-lowest` (`#0e0e0e`), `surface-container-low` (`#1c1b1b`), `surface-container` (`#201f1f`), `surface-container-high` (`#2a2a2a`).
  - Gradient: `from-[#833AB4] via-[#FD1D1D] to-[#FCB045]`.
  - Accent: `#0095F6` (primary-container).
- **Icons**:
  - Use `<span class="material-symbols-outlined">icon_name</span>`. For filled state, add class `fill-1`.
- **Typography**:
  - Font family: `font-sans` maps to `Plus Jakarta Sans`.

---

## 🔄 3. State Management (`store/socialStore.ts`)

- Access social data via `const { posts, stories, reels, conversations, currentUser, ...actions } = useSocialStore()`.
- Use actions like `toggleLikePost`, `addCommentToPost`, `toggleSavePost`, `createPost`, `sendMessage`.
- Media and post creations update in real-time without requiring a page reload.
