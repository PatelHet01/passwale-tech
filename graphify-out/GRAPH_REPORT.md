# Graph Report - passwale tech  (2026-06-11)

## Corpus Check
- 83 files · ~45,713 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 472 nodes · 468 edges · 57 communities (49 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 54|Community 54]]

## God Nodes (most connected - your core abstractions)
1. `useAuthStore` - 15 edges
2. `PASSWALE — MVP IMPLEMENTATION PLAN` - 13 edges
3. `authenticate()` - 10 edges
4. `─────────────────────────────────────────────────────────────────────────────` - 10 edges
5. `Goal: Full admin panel, sponsor dashboard, platform analytics, performance, security hardening, launch` - 8 edges
6. `PHASE 3 — TICKETING & PAYMENTS (Weeks 10–14)` - 7 edges
7. `Goal: Platform skeleton, auth, database, admin settings engine` - 7 edges
8. `Goal: Scene discovery, event creation, microsites, organizer dashboard` - 7 edges
9. `Goal: Complete ticket purchase flow, QR passes, squad passes, Cashfree integration` - 7 edges
10. `PHASE 1 — FOUNDATION (Weeks 1–4)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `ProtectedRoute()` --calls--> `useAuthStore`  [INFERRED]
  apps/web/src/components/auth/ProtectedRoute.jsx → apps/web/src/stores/authStore.js
- `RoleRoute()` --calls--> `useAuthStore`  [INFERRED]
  apps/web/src/components/auth/RoleRoute.jsx → apps/web/src/stores/authStore.js
- `AdminLayout()` --calls--> `useAuthStore`  [INFERRED]
  apps/web/src/layouts/AdminLayout.jsx → apps/web/src/stores/authStore.js
- `AppLayout()` --calls--> `useAuthStore`  [INFERRED]
  apps/web/src/layouts/AppLayout.jsx → apps/web/src/stores/authStore.js
- `AuthLayout()` --calls--> `useAuthStore`  [INFERRED]
  apps/web/src/layouts/AuthLayout.jsx → apps/web/src/stores/authStore.js

## Import Cycles
- None detected.

## Communities (57 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (37): author, dependencies, aws-sdk, @aws-sdk/client-s3, bcryptjs, cashfree-pg, cors, dotenv (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (19): emailSchema, LoginPage(), otpSchema, phoneSchema, TABS, ProtectedRoute(), RoleRoute(), DashboardPage() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (33): ADDITIONAL SUGGESTIONS FOR PASSWALE, ANTIGRAVITY PROMPT SEQUENCING GUIDE, BEFORE YOU START — PROMPT ARCHITECTURE FOR ANTIGRAVITY, DASHBOARD SUMMARY — ALL ROLES, Deep Implementation Plan for Antigravity (AI Vibe Coding Platform), Goal: Complete ticket purchase flow, QR passes, squad passes, Cashfree integration, Goal: Scene discovery, event creation, microsites, organizer dashboard, Goal: Volunteer hiring + escrow, vendor booking, IP/pass collection pages, resale + waitlist (+25 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (21): cron, Subscription, User, billingHistorySchema, mongoose, subscriptionSchema, bcrypt, mongoose (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (25): dependencies, axios, framer-motion, @hookform/resolvers, lucide-react, react, react-dom, react-hook-form (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (23): 2.1 — Scene System, 2.2 — Event Creation Wizard, 2.3 — Event Microsite Engine, 2.4 — Event Discovery Page (`/events`), 2.5 — Organizer Dashboard (Core), 3.1 — Ticket Purchase Flow, 3.2 — Squad Passes, 3.3 — My Tickets & QR Viewer (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (18): cron, Scene, User, mongoose, sceneSchema, { authenticate }, Event, express (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (21): ─────────────────────────────────────────────────────────────────────────────, ━━━ ADDITIONAL FEATURES (Post-MVP) ━━━, After editing, tell the agent: "Read FEATURES.md and update your plan.", ━━━ BRAND / GLOBAL CONFIG ━━━, ━━━ DATABASE MODELS (all MVP) ━━━, DEFER  = Skip for MVP, build later (Phase 4–6), Do NOT change these unless rebranding, DONE   = Already implemented (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (10): adminSettingsSchema, commissionTierSchema, mongoose, Event, express, PricingService, router, AdminSettings (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (12): mongoose, payoutSchema, AdminSettings, AuditLog, { authenticate, authorize }, Event, express, Payout (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (11): cron, Squad, mongoose, squadMemberSchema, squadSchema, { authenticate }, crypto, Event (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (11): app, cors, { createServer }, express, helmet, httpServer, io, mongoose (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (9): mongoose, transactionSchema, transactionTicketSchema, crypto, Event, express, router, Ticket (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (11): 1.1 — Monorepo Scaffold, 1.2 — Database Models (14 Schemas), 1.3 — Authentication System, 1.4 — Admin Settings Engine (CRITICAL — Build First, Used Everywhere), 1.5 — PWA Setup, `AdminSettings.model.js` — SINGLETON (highest priority), `Event.model.js`, PHASE 1 — FOUNDATION (Weeks 1–4) (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (10): { authenticate }, express, fs, localUploadsDir, multer, path, router, sharp (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (8): authenticate(), authorize(), jwt, User, { authenticate }, Event, express, router

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (8): mongoose, ticketSchema, { authenticate, authorize }, Event, express, router, Ticket, Transaction

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (10): Goal: Full admin panel, sponsor dashboard, platform analytics, performance, security hardening, launch, MODULE 6.1 — COMPLETE ADMIN CONTROL PANEL, MODULE 6.2 — SPONSOR DASHBOARD, MODULE 6.3 — ADVANCED ANALYTICS (REEL-NATIVE), MODULE 6.4 — PERFORMANCE HARDENING, MODULE 6.5 — SECURITY HARDENING, MODULE 6.6 — MOBILE APP WRAPPING (CAPACITOR), MODULE 6.7 — LAUNCH CHECKLIST (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.20
Nodes (9): { authenticate, authorize }, crypto, Event, express, jwt, PricingService, router, Ticket (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.22
Nodes (9): Goal: Platform skeleton, auth, database, admin settings engine, MODULE 1.1 — PROJECT SCAFFOLD & MONOREPO SETUP, MODULE 1.2 — DATABASE FOUNDATION, MODULE 1.3 — AUTHENTICATION SYSTEM, MODULE 1.4 — ADMIN SETTINGS ENGINE (CRITICAL), MODULE 1.5 — PWA + MOBILE WRAPPER SETUP, PHASE 1 — FOUNDATION & CORE INFRASTRUCTURE, Timeline: Weeks 1–4 (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (6): mongoose, notificationSchema, { authenticate }, express, Notification, router

### Community 22 - "Community 22"
Cohesion: 0.25
Nodes (8): Goal: PassCoins, scene streaks, community features, digital locker, notifications, MODULE 4.1 — PASSCOINS ENGINE, MODULE 4.2 — SCENE STREAKS & BADGES, MODULE 4.3 — COMMUNITY FEATURES, MODULE 4.4 — DIGITAL EVENT LOCKER, MODULE 4.5 — NOTIFICATIONS SYSTEM, PHASE 4 — LOYALTY, COMMUNITY & ENGAGEMENT, Timeline: Weeks 15–20

### Community 23 - "Community 23"
Cohesion: 0.40
Nodes (4): cardBenefitTierSchema, eventSchema, mongoose, ticketCategorySchema

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **316 isolated node(s):** `name`, `version`, `main`, `start`, `seed` (+311 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `authenticate()` connect `Community 15` to `Community 3`, `Community 6`, `Community 9`, `Community 10`, `Community 14`, `Community 16`, `Community 18`, `Community 21`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 14 inferred relationships involving `useAuthStore` (e.g. with `LoginPage()` and `ProtectedRoute()`) actually correct?**
  _`useAuthStore` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `main` to the rest of the system?**
  _316 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._