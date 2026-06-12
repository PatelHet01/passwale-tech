# PASSWALE — MVP IMPLEMENTATION PLAN
### Ultra-Responsive · Scene-Driven Ticketing Platform · 14-Week MVP

> **Stack**: React 18 + Vite + Tailwind CSS + PWA | Node.js + Express + MongoDB (Mongoose)  
> **Payments**: Cashfree | **Storage**: AWS S3 | **Real-time**: Socket.io  
> **Auth**: JWT + Google OAuth + Phone OTP | **Email**: SendGrid | **SMS**: Twilio  
> **Feature control**: Edit [`FEATURES.md`](file:///Users/hackair/passwale%20tech/FEATURES.md) — agents read this before every session

---

## Design System — Built First, Used Everywhere

Before any component, these tokens go into `tailwind.config.js` and `src/styles/design-system.css`:

| Token | Value | Usage |
|---|---|---|
| `--brand-blue` | `#1D4ED8` | Primary CTA, nav, links |
| `--brand-yellow` | `#FACC15` | Accents, badges, highlights |
| `--surface-dark` | `#0F172A` | Dark card backgrounds |
| `--surface-mid` | `#1E293B` | Panels, dropdowns |
| `--text-primary` | `#F8FAFC` | On dark backgrounds |
| `--radius-card` | `16px` | All cards |
| `--shadow-glow` | `0 0 24px rgba(29,78,216,0.35)` | Hover glows |

**Motion**: All page transitions use `framer-motion` `AnimatePresence`. Micro-animations on every interactive element (100ms ease-out). No static, dead-feeling interfaces.

**Typography**: Google Fonts — `Inter` (body), `Space Grotesk` (display headings). Load via `@import` in `index.css`.

**Responsive breakpoints**: Mobile-first. `sm:640px md:768px lg:1024px xl:1280px`. Every layout must work on 375px iPhone SE.

---

## PHASE 1 — FOUNDATION (Weeks 1–4)

### 1.1 — Monorepo Scaffold

**Build order**: scaffold → env → Docker → lint → "Hello Passwale" page

```
passwale/
├── apps/
│   ├── web/                    # React 18 + Vite + Tailwind PWA
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── pages/          # Route-level pages
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── stores/         # Zustand state stores
│   │   │   ├── services/       # API client functions
│   │   │   ├── styles/         # design-system.css + globals
│   │   │   └── utils/          # Helpers, formatters
│   │   ├── public/
│   │   │   ├── manifest.json
│   │   │   └── icons/          # PWA icons (192, 512, maskable)
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js  # Brand tokens locked here
│   │   └── index.html
│   └── api/                    # Node.js + Express
│       ├── src/
│       │   ├── models/         # 14 Mongoose models
│       │   ├── routes/         # Express route files
│       │   ├── controllers/    # Business logic
│       │   ├── services/       # PricingService, PaymentService, etc.
│       │   ├── middleware/      # auth, rbac, rateLimit, audit
│       │   ├── utils/          # jwt, otp, mailer, sms
│       │   └── jobs/           # node-cron scheduled jobs
│       ├── server.js
│       └── package.json
├── packages/
│   └── ui/                     # Shared component stubs (future)
├── docker-compose.yml          # MongoDB + API + Web
├── .env.example                # All env vars documented
└── FEATURES.md                 # Feature flags (agents read this)
```

**Key files to generate:**
- `tailwind.config.js` — extend colors with all brand tokens + custom `scene-*` colors for 6 scenes
- `vite.config.js` — include `@vite-pwa/vite-plugin-pwa`
- `docker-compose.yml` — MongoDB 7, Redis (for future), API, Web with hot-reload
- `.env.example` — document every required var (MongoDB URI, Cashfree keys, S3, JWT secret, Twilio, SendGrid, Google OAuth)
- ESLint + Prettier + Husky pre-commit hook

---

### 1.2 — Database Models (14 Schemas)

Generate in this order (dependencies first):

#### `AdminSettings.model.js` — SINGLETON (highest priority)
```javascript
{
  platformFee: { type: Number, default: 3.69 },      // NEVER hardcode elsewhere
  commissionTiers: [
    { name: 'Starter', minGMV: 0,      maxGMV: 100000,  rate: 15 },
    { name: 'Growth',  minGMV: 100001, maxGMV: 500000,  rate: 12 },
    { name: 'Scale',   minGMV: 500001, maxGMV: 2000000, rate: 10 },
    { name: 'Pro',     minGMV: 2000001,maxGMV: 10000000,rate: 8  },
    { name: 'Elite',   minGMV: 10000001,maxGMV: Infinity,rate: 5 },
  ],
  volunteerFeePercent: { type: Number, default: 5 },
  vendorCommissionPercent: { type: Number, default: 8 },
  cardPricing: {
    plus:  { monthly: 199,  annual: 1999 },
    pro:   { monthly: 599,  annual: 5999 },
  },
  cardSubsidy: { platformPercent: 60, organizerPercent: 40 },
  resaleFees:  { standard: 100, priority: 199, guaranteed: 299 },
  passCoinConfig: {
    earningRate: { free: 1, plus: 2, pro: 3, black: 5 },  // coins per ₹10 spent
    expiryDays:  { free: 90, plus: 180, pro: 365, black: 730 },
  },
}
```
Include: `static getInstance()` method, `pre-save` audit hook.

#### `User.model.js`
```javascript
{
  name, email, phone, passwordHash,
  roles: [enum: 'attendee','organizer','vendor','volunteer','admin','super_admin'],
  activeRole: String,
  googleId, profilePhoto,
  scenePreferences: [{ type: ObjectId, ref: 'Scene' }],
  passwaleCard: {
    tier: { type: String, enum: ['free','plus','pro','black'], default: 'free' },
    expiresAt: Date, startedAt: Date,
  },
  passCoinBalance: { type: Number, default: 0 },
  referralCode: String,
  referredBy: { type: ObjectId, ref: 'User' },
  organizerProfile: {
    commissionOverride: Number,    // null = use tier default
    verificationStatus: enum,
    bankDetails: { encrypted: String },
    totalGMV: Number,
  },
  isBlocked: Boolean, blockReason: String,
  emailVerified: Boolean, phoneVerified: Boolean,
  lastLoginAt: Date,
}
```

#### `Scene.model.js`
```javascript
{
  name, slug, color: String,   // hex color
  coverImage: String,          // S3 URL
  description, isActive: Boolean,
  stats: { totalEvents, totalAttendees, growthRate, activeUsers },
  ambassador: { type: ObjectId, ref: 'User' },
}
```
**Seed**: Techno (#6D28D9), Bollywood (#DC2626), Garba (#D97706), Campus (#2563EB), Comedy (#059669), Startup (#0891B2)

#### `Event.model.js`
```javascript
{
  organizer: { type: ObjectId, ref: 'User' },
  title, slug, shortDescription, description: String,  // rich text HTML
  scenes: [{ type: ObjectId, ref: 'Scene' }],
  tags: [String],
  type: enum['free','paid','donation','hybrid'],
  category: enum['music','workshop','conference','sports','nightlife','campus','festival'],
  status: enum['draft','pending','published','cancelled','completed'],
  dates: { start: Date, end: Date },
  location: {
    type: enum['physical','virtual','hybrid'],
    venue: String, address: String, city: String, state: String,
    coordinates: { type: [Number], index: '2dsphere' },
    virtualUrl: String, virtualPlatform: String,
  },
  media: { cover: String, gallery: [String], videoUrl: String },
  lineup: [{ name, role, bio, photo, socialLinks: {}, performanceTime: Date }],
  ticketCategories: [{
    name, description, price: Number, quantity: Number, sold: { type: Number, default: 0 },
    salesStart: Date, salesEnd: Date,
    isSquadPass: Boolean, squadSettings: { minMembers, maxMembers, lockDeadlineMinutes, discount },
    timeSlots: [{ name, startTime, endTime, capacity }],
    passwaleCardBenefits: {
      enabled: Boolean,
      plus:  { discount: Number, earlyAccessHours: Number },
      pro:   { discount: Number, earlyAccessHours: Number },
      black: { discount: Number, earlyAccessHours: Number },
    },
  }],
  totalCapacity, resaleEnabled, waitlistEnabled,
  communitySettings: { chatEnabled, pollsEnabled, qnaEnabled },
  rules: { dressCode, ageRestriction, prohibitedItems: [String], guidelines: String },
  analytics: {
    pageViews, trafficSources: { reel, story, whatsapp, direct, search },
    salesFunnel: { views, ticketPage, checkout, purchased },
  },
  visibility: enum['public','private','invite-only'],
  creativeUrls: { story: String, post: String },
}
```

#### Remaining 10 models (generate in sequence):
- `Ticket.model.js` — ticketNumber (unique), eventId, userId, categoryId, qrCode (S3 URL), qrSecret (for JWT signing), status (active/used/cancelled/transferred), holderName, checkedInAt
- `Transaction.model.js` — userId, eventId, tickets[{ticketId, categoryId, basePrice, discount, subtotal}], platformFee, totalAmount, cashfreeOrderId, cashfreePaymentId, status, pricingSnapshot (copy of AdminSettings at purchase time)
- `PassCoinTransaction.model.js` — userId, type (earn/redeem/expire/gift), amount, balance (running), referenceId, referenceType, expiresAt, multiplierUsed
- `Squad.model.js` — eventId, categoryId, creatorId, name, inviteCode, members[{userId, ticketId, joinedAt}], minMembers, maxMembers, status (forming/locked/cancelled), lockDeadline, discount
- `PassCollection.model.js` — organizerId, name, slug, description, cover, events[{type: ObjectId}], seasonPass: {enabled, price, validCount}
- `Subscription.model.js` — userId, tier, cashfreeSubscriptionId, status, startedAt, expiresAt, autoRenew, billingHistory[{date, amount, invoiceUrl}]
- `Payout.model.js` — recipientId, recipientType (organizer/vendor/volunteer), eventId, amount, fee, netAmount, status (pending/processing/completed/failed), cashfreePayoutId, upiId, bankDetails
- `Refund.model.js` — transactionId, ticketIds[ObjectId], userId, reason, amount, status (pending/approved/rejected/processed), adminNote, cashfreeRefundId
- `AuditLog.model.js` — adminId, action, targetType, targetId, before: Mixed, after: Mixed, ip, userAgent, timestamp
- `Notification.model.js` — userId, type, title, body, data: Mixed, read, channels: {inApp, email, sms, push}, sentAt, readAt

**Seed script** (`scripts/seed.js`): Creates `AdminSettings` singleton with defaults, 6 scenes with colors, super admin user (`admin@passwale.com`).

---

### 1.3 — Authentication System

**Backend routes** (`apps/api/src/routes/auth.routes.js`):

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Email + password + role |
| POST | `/api/auth/login` | Email + password |
| POST | `/api/auth/google` | Google OAuth callback |
| POST | `/api/auth/send-otp` | SMS OTP via Twilio |
| POST | `/api/auth/verify-otp` | Verify OTP → JWT |
| POST | `/api/auth/refresh-token` | Refresh JWT |
| POST | `/api/auth/forgot-password` | Send reset email |
| POST | `/api/auth/reset-password/:token` | Reset password |
| GET  | `/api/auth/verify-email/:token` | Verify email |
| GET  | `/api/auth/me` | Current user (protected) |

**Middleware** (`middleware/`):
- `authenticate.js` — Verify JWT, attach `req.user`
- `authorize.js` — RBAC: `authorize('admin', 'organizer')` usage
- `rateLimiter.js` — 5 login attempts/15min/IP; 3 OTP attempts/10min

**Security rules** (never deviate):
- bcrypt: 10 salt rounds
- JWT access: 7-day TTL, refresh: 30-day TTL
- OTP: 6-digit, 10-minute expiry, stored hashed

**Frontend pages**:

`/login` — Dark glassmorphism card, center of screen. Tabs: Email | Phone. Google OAuth button with branded icon. Smooth tab transition. Remember me checkbox.

`/signup` — 5-step wizard with animated progress bar:
1. **Identity**: Name + email + password (strength meter)
2. **Role**: 4 large icon cards (Attendee/Organizer/Vendor/Volunteer) — multi-select
3. **Scenes**: Colorful 6-tile grid with scene colors — min 3 required, tiles animate on select
4. **Photo**: Drag-drop + crop tool (use `react-image-crop`)
5. **Verify**: Email sent animation, resend countdown timer

`/forgot-password`, `/reset-password/:token` — Minimal centered cards.

**State**: Zustand `useAuthStore` — `{ user, token, isLoading, login(), logout(), refreshToken() }`

**Protected route wrapper**: Redirect to `/login` with `?redirect=` if unauthenticated.

**Role redirect after login**: attendee → `/dashboard` | organizer → `/organizer` | admin → `/admin`

---

### 1.4 — Admin Settings Engine (CRITICAL — Build First, Used Everywhere)

**Backend service** (`services/pricing.service.js`):

```javascript
class PricingService {
  // Never hardcode. Always read from AdminSettings.
  static async calculateTicketPrice({ basePrice, userId, organizerId, quantity }) {
    const settings = await AdminSettings.getInstance()
    const user = await User.findById(userId).select('passwaleCard')
    const organizer = await User.findById(organizerId).select('organizerProfile')
    
    let subtotal = basePrice * quantity
    let discount = 0
    let discountBreakdown = {}
    
    // Card benefits
    if (user.passwaleCard.tier !== 'free' && category.passwaleCardBenefits.enabled) {
      const rate = category.passwaleCardBenefits[user.passwaleCard.tier].discount
      discount = subtotal * (rate / 100)
      const platformPays = discount * (settings.cardSubsidy.platformPercent / 100)
      const organizerPays = discount * (settings.cardSubsidy.organizerPercent / 100)
      discountBreakdown = { rate, platformPays, organizerPays }
    }
    
    const afterDiscount = subtotal - discount
    const platformFeeAmount = afterDiscount * (settings.platformFee / 100)
    const total = afterDiscount + platformFeeAmount
    
    // Commission
    const commissionRate = organizer.organizerProfile.commissionOverride
      ?? PricingService.getTierCommission(organizer.organizerProfile.totalGMV, settings)
    const commission = afterDiscount * (commissionRate / 100)
    const organizerNet = afterDiscount - commission - discountBreakdown.organizerPays
    
    return { subtotal, discount, discountBreakdown, platformFeeAmount, total,
             commissionRate, commission, organizerNet }
  }
  
  static getTierCommission(gmv, settings) { /* find tier by GMV */ }
}
```

**Admin API routes** (`routes/admin.routes.js`):
- `GET/PATCH /api/admin/pricing` — Full settings CRUD
- `PATCH /api/admin/organizers/:id/commission` — Override per organizer
- All mutations wrapped in `auditLog()` middleware

**Admin Pricing Frontend** (`/admin/pricing`):
- Dark sidebar layout, animated cards per pricing group
- Live preview panel: "If base price ₹1000, user pays ₹X" — updates on every input change
- Commission tiers: Inline editable table rows
- Card subsidy: Two sliders that always sum to 100%
- All saves optimistic (update UI instantly, rollback on error)

---

### 1.5 — PWA Setup

- `manifest.json`: name="Passwale", theme_color="#1D4ED8", display="standalone", icons (192/512/maskable)
- `sw.js` (Workbox): Pre-cache app shell; runtime cache event pages (60s) and ticket QR codes (offline-first)
- Push notification service worker registration
- `vite-plugin-pwa` config: `registerType: 'autoUpdate'`, `includeAssets` for all icons

---

## PHASE 2 — SCENE SYSTEM & EVENT CORE (Weeks 5–9)

### 2.1 — Scene System

**API routes:**
```
GET  /api/scenes                        → all scenes (with stats)
GET  /api/scenes/:slug                  → scene + upcoming events
POST /api/users/scenes/select           → set user scene preferences
GET  /api/scenes/:slug/leaderboard      → top 10 attendees
```

**Frontend: `/scenes` (Scene Discovery)**
- Full-screen dark hero with animated gradient mesh
- 6 scene cards in CSS Grid (3×2 desktop, 2×3 tablet, scroll on mobile)
- Each card: scene color as background, glowing border on hover, event count badge, community size
- Click → navigate to `/scenes/:slug`
- Mobile: Sticky horizontal pill row at top of `/events` page

**Frontend: `/scenes/:slug` (Scene Detail)**
- Full-bleed cover image with color overlay + blur
- Stats bar: events count, attendees, growth rate
- Upcoming events grid (reuse EventCard component)
- Leaderboard: top 10 avatars with streak fire indicator
- "Join Scene" button (adds to preferences) — animated on click

**Nightly cron** (`jobs/scene-stats.job.js`): Aggregate event/attendee counts per scene with `node-cron`.

---

### 2.2 — Event Creation Wizard

**API routes:**
```
POST   /api/events              → create draft
PATCH  /api/events/:id          → update
POST   /api/events/:id/publish  → publish (validation gate)
POST   /api/events/:id/duplicate
DELETE /api/events/:id
POST   /api/upload/event-cover  → S3 upload (Sharp compress before upload)
POST   /api/upload/event-gallery
```

**Frontend: `/organizer/events/create` — 9-step wizard**

Progress: Animated step dots at top. Each step slides in from the right (Framer Motion).

| Step | Content | Validation |
|---|---|---|
| 1 Basics | Name (auto-slug preview), short desc, rich text (Tiptap), scenes, tags | Name required |
| 2 Type | Free/Paid/Donation/Hybrid (icon buttons), category | Type required |
| 3 Dates & Location | Date range picker, time, physical/virtual toggle, Google Places | Start date required |
| 4 Media | Cover drag-drop+crop, gallery (up to 10), video URL | Cover required |
| 5 Lineup | Repeatable cards (drag to reorder), name/role/bio/photo/social | Optional |
| 6 Tickets | Global capacity + repeatable category builder (see below) | Min 1 category if paid |
| 7 Rules | Dress code, age restriction, prohibited items tags, guidelines | Optional |
| 8 Community | Chat/polls/Q&A toggles | Optional |
| 9 Review | Full summary + microsite URL preview + visibility + Save/Publish | — |

**Ticket Category Builder (Step 6 — most complex component):**
- Accordion cards, one per category
- Fields: name, price, quantity, sales dates
- Squad Pass toggle → inline squad config (min/max members, deadline, discount)
- Time Slots toggle → slot builder (name, start, end, capacity per slot)
- **Passwale Card Benefits section** (collapsible):
  - Master toggle: "Enable card benefits for this category"
  - Three tier rows (Plus / Pro / Black): discount % slider + early access hours input
  - Live preview: "Plus members save ₹X on ₹1,000 ticket"
  - Subsidy info chip: "Platform covers 60% of discount"

---

### 2.3 — Event Microsite Engine

**API:** `GET /api/events/slug/:slug` — public, no auth, track page view + UTM source

**Frontend: `/e/:slug`**
- Mobile-first (375px base), dark background, Instagram-story aesthetic
- Sticky bottom: "Get Tickets" CTA (neon blue, full-width on mobile)
- Sections (loaded lazy with React.Suspense):
  1. **Hero**: Full-screen cover with gradient overlay, event name in Space Grotesk
  2. **Quick info**: Date chip, time chip, venue chip, scene badge with scene color
  3. **Countdown timer**: `days:hours:mins:secs` with flip animation
  4. **Ticket categories**: Live availability, price with fee, card benefit chips
  5. **About**: Tiptap rendered HTML
  6. **Lineup carousel**: Swipe on mobile (Embla carousel)
  7. **Location**: Google Maps embed
  8. **Share**: WhatsApp button, copy link, Instagram story link (UTM tagged)
  9. **Related events**: 3 cards from same organizer
- Open Graph meta: title, description, image auto-generated per event

**UTM tracking**: On page load, parse `?ref=` param → store in localStorage + POST to analytics API

---

### 2.4 — Event Discovery Page (`/events`)

**API queries:**
```
GET /api/events?scene=&city=&dateFrom=&dateTo=&type=&minPrice=&maxPrice=&sort=&page=
GET /api/events/trending
GET /api/events/search?q=
GET /api/events/recommended   (auth required)
```

**Frontend:**
- Dark sticky filter bar: scene pill chips (colored), city dropdown, date quick-picks, price range slider, type toggle
- Sort bar: Trending | Upcoming | Price ↑↓
- Event grid: 3 col desktop → 2 tablet → 1 mobile
- **Infinite scroll**: 12 events per page, IntersectionObserver trigger
- Skeleton loaders (animated shimmer) while fetching
- Mobile: Filter panel opens as bottom sheet drawer (full height, with drag handle)
- Empty state: "No events in this scene yet — be the first organizer!" with CTA

**EventCard Component** (reused everywhere):
- 16:9 cover image with lazy loading (`loading="lazy"`)
- Top scene color strip (3px, scene's hex color)
- Event name (2-line clamp)
- Date + time | Venue/city
- Organizer with verified badge ✓
- Price chip ("Free" or "From ₹X") | Tickets left warning (< 20% = orange "Only N left!")
- Passwale Card badge (blue sparkle chip if card benefits enabled)
- Hover: card lifts `translateY(-4px)`, glow shadow

---

### 2.5 — Organizer Dashboard (Core)

**API:**
```
GET /api/organizer/dashboard                      → stats overview
GET /api/organizer/events?status=&page=           → events list
GET /api/organizer/events/:id/analytics           → detailed analytics
GET /api/organizer/events/:id/attendees?page=     → attendee list
GET /api/organizer/events/:id/attendees/export    → CSV download
```

**Frontend: `/organizer`**

Layout: Dark sidebar (fixed on desktop, drawer on mobile) + main content area.

Sidebar links: Dashboard | Events | Create Event | Analytics | Volunteers | Payouts | Settings

**Home dashboard stats row:**
- 4 animated counter cards: Total Events | Active Events | Total Revenue ₹ | Tickets Sold This Month
- Revenue bar chart (Recharts, last 6 months)
- Recent sales feed (last 10 with avatar, ticket type, amount, time ago)
- Quick actions: "Create Event" neon button, "View Payouts" link

**Events list** (`/organizer/events`):
- Tabs: All | Published | Draft | Past | Cancelled — animated underline indicator
- Table: Name | Date | Sold/Cap | Revenue | Status badge | Actions menu
- Actions: Edit | Duplicate | Analytics | Check-in | Cancel

**Event analytics** (`/organizer/events/:id/analytics`):
- 4 overview cards: Tickets sold | Gross revenue | Net revenue | Conversion rate
- Traffic sources donut (Recharts): Reel / Story / WhatsApp / Direct / Search
- Sales funnel: Views → Ticket page → Checkout → Purchased (funnel chart or bar)
- Sales timeline line chart (daily)
- Ticket category breakdown bar
- Attendee table: Name | Email | Category | Check-in status | CSV export button

---

## PHASE 3 — TICKETING & PAYMENTS (Weeks 10–14)

### 3.1 — Ticket Purchase Flow

**Payment Flow (critical — implement exactly):**

```
1. User clicks "Get Tickets" on event page
2. Ticket selection modal opens (step 1: select category + quantity)
3. POST /api/pricing/calculate → returns full breakdown (no auth needed for preview)
4. User reviews pricing breakdown (step 2)
5. POST /api/tickets/purchase (auth required)
   → PricingService.calculateTicketPrice()
   → Create Transaction (status: pending)
   → Cashfree.createOrder() → returns paymentSessionId
6. Frontend loads Cashfree checkout SDK with paymentSessionId
7. User completes payment on Cashfree
8. Cashfree fires webhook → POST /api/webhooks/cashfree
   → Verify signature (HMAC-SHA256)
   → Idempotency check (has this orderId been processed?)
   → If SUCCESS:
       - Transaction.status = 'completed'
       - Generate Ticket records (one per ticket in order)
       - Generate QR code (qrcode npm) → upload to S3
       - Event.ticketCategories[n].sold += quantity
       - Award PassCoins (based on tier multiplier)
       - SendGrid confirmation email
       - Twilio SMS confirmation
       - Push notification (FCM)
   → If FAILED: Transaction.status = 'failed', notify user
```

**Idempotency**: Store processed `cashfreeOrderId` in a `ProcessedWebhooks` collection. On webhook receipt, check first. Reject duplicates with 200 OK (don't reprocess).

**API routes:**
```
POST /api/pricing/calculate             → public pricing preview
POST /api/tickets/purchase              → initiate purchase
POST /api/webhooks/cashfree             → Cashfree webhook handler
GET  /api/tickets/my-tickets?status=   → user's tickets
GET  /api/tickets/:ticketNumber        → single ticket + QR
POST /api/tickets/check-in             → verify + mark used
GET  /api/tickets/check-in/:eventId/stats
```

**QR Code spec:**
- Payload: `passwale://ticket/{ticketNumber}/{signedJWT}`
- JWT contains: ticketId, ticketNumber, expiresAt (30s from now), issued by server secret
- `qrcode` npm → PNG → upload to S3 → URL stored in Ticket.qrCode
- On check-in: server generates fresh JWT, QR auto-refreshes every 30s on frontend

**Frontend — Ticket Purchase Modal:**

Full-screen modal on mobile, centered dialog on desktop. 5 steps:

1. **Select**: Category cards with live availability meter, quantity stepper (min 1, max per-category limit)
2. **Pricing breakdown**: Animated table showing all line items (see format in original spec)
3. **Review**: Buyer name, email, phone (pre-filled from auth), optional: add attendee names per ticket
4. **Payment**: Cashfree SDK loads in iframe/redirect (use `cashfree-js` CDN)
5. **Success**: Confetti animation, large QR code preview, "View My Tickets" CTA

**Payment callback page** (`/payment/callback`): Spinner → verify with API → success/failure state.

---

### 3.2 — Squad Passes

**API:**
```
POST /api/squads/create              → create squad (also purchases organizer's spot)
POST /api/squads/:id/join            → join squad
GET  /api/squads/:id                 → squad status (public — shareable link works without auth)
POST /api/squads/:id/lock            → manually lock when minimum reached
```

**Cron job** (`jobs/squad-cleanup.job.js`): Every 5 minutes, auto-cancel squads past deadline that didn't lock. Notify members.

**Frontend — Squad Creation Modal** (from ticket purchase flow):
- Squad name input
- Copy link + WhatsApp share button
- Member slots visualization: empty circles → fill with avatars as friends join (Socket.io real-time)
- Countdown timer to deadline (animated)
- "Current status: 2/4 members — Discount activates at 4"

**Squad Join Page** (`/squad/:inviteCode`): Public page. Event details + current members + join CTA. If not logged in → signup prompt → return to join.

Socket.io: `join-squad-room` event → broadcast `member-joined` to all squad members in real-time.

---

### 3.3 — My Tickets & QR Viewer

**Frontend: `/dashboard/tickets`**
- Tabs: Upcoming | Past | Cancelled
- Ticket cards with blurred event cover as background
- Status badge: Active (green) / Used (grey) / Cancelled (red)
- **Ticket detail modal** (tap/click on card):
  - Large QR code (auto-refreshes every 30s via `setInterval` + re-fetch signed URL)
  - Ticket number, holder name, event details, slot time
  - Download PDF button (`react-to-print` or server-generated PDF via puppeteer)
  - Transfer button (if resale enabled)
- Service worker: Cache ticket data + QR in IndexedDB for offline access

**Check-in Scanner** (`/organizer/check-in/:eventId`):
- Full-screen camera view (use `@zxing/library` for QR decode)
- Scan → POST `/api/tickets/check-in` → green flash (valid) or red flash (invalid/used)
- Shows: attendee name, ticket category, timestamp
- Manual fallback: Type ticket number
- Live stats bar at bottom: X checked in / Y total

---

### 3.4 — Passwale Card Subscriptions

**API:**
```
POST /api/subscriptions/purchase     → buy Plus/Pro via Cashfree
GET  /api/subscriptions/my-card      → current subscription
POST /api/subscriptions/cancel       → cancel auto-renew
POST /api/subscriptions/upgrade      → Plus → Pro
```

**Crons**: Daily check for expired cards → downgrade tier. 7-day renewal reminder email.

**Frontend: `/dashboard/card`**
- Visual card design (CSS 3D perspective card): Free = white, Plus = blue gradient, Pro = dark premium, Black = metallic black
- Benefits list for current tier
- Feature comparison table (responsive, scrollable on mobile)
- Monthly/Annual toggle with savings badge ("Save 17%")
- Upgrade CTA → Cashfree checkout
- Usage stats: Total saved | Early access used | Coins earned via tier multiplier
- Billing history accordion

---

### 3.5 — Passwale Card Benefits at Checkout

This is pure `PricingService` logic — already implemented in 1.4. Frontend additions:

- If user has Plus/Pro: Show green chip "Your Passwale [Tier] saves you ₹X" in pricing breakdown
- If user is Free: Show blue banner "Upgrade to Plus and save ₹X on this ticket" (links to `/dashboard/card`)
- If organizer disabled benefits for this category: Show nothing (no teasing unavailable benefits)

---

### 3.6 — Admin Financial Panel (MVP Scope)

**Frontend: `/admin/financials`**
- Revenue KPI row: GMV | Platform Revenue | Commissions | Subscriptions
- Revenue chart (7-day, 30-day, all-time toggle)
- Pending payouts table: Organizer | Amount | Events | Bank/UPI | Approve button
- Refund queue: Requester | Amount | Reason | Review | Approve/Reject

**Frontend: `/admin/pricing`** (built in Phase 1.4 — surfaced here)

**Frontend: `/admin/users`**:
- Table: Name | Email | Role | Tier | Status | Actions
- User detail drawer: Full profile, role toggle, PassCoins adjust, block/unblock, transaction history

**Frontend: `/admin/events`**:
- Table: Event | Organizer | Date | Status | Revenue
- Actions: Approve | Feature | Cancel (with reason modal)

**Frontend: `/admin/audit-logs`**:
- Filterable table: Admin | Action | Target | Before | After | Time | IP
- CSV export

---

## RESPONSIVE DESIGN RULES (Apply Everywhere)

Every screen must work on all these viewports:
- **375px** — iPhone SE (smallest target)
- **390px** — iPhone 14
- **768px** — iPad
- **1024px** — iPad Pro / small laptop
- **1440px** — Desktop

Rules:
1. Sidebar navigation collapses to bottom tab bar on mobile (not hamburger menu)
2. All modals are full-screen bottom sheets on mobile
3. All tables become card stacks on < 768px
4. Touch targets minimum 44×44px
5. Tap highlights disabled on mobile (use CSS `-webkit-tap-highlight-color: transparent`)
6. No horizontal scroll ever (except intentional carousels)
7. Fonts: clamp-based fluid sizes `clamp(14px, 4vw, 18px)`

---

## PERFORMANCE TARGETS

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Bundle size (initial JS) | < 150kB gzipped |
| Image format | WebP everywhere |
| Event microsite | < 2s load |

Techniques: Route-based code splitting (`React.lazy`), image lazy loading, skeleton loaders, HTTP compression (gzip/brotli), S3 + CloudFront CDN for assets.

---

## API RESPONSE FORMAT (Standardize From Day 1)

```javascript
// Success
{ success: true, data: { ... }, meta: { page, limit, total } }

// Error
{ success: false, error: { code: 'TICKET_SOLD_OUT', message: 'No tickets remaining', details: {} } }
```

All errors use semantic HTTP codes. All timestamps in ISO 8601 UTC.

---

## ENVIRONMENT VARIABLES (`.env.example`)

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/passwale
MONGODB_URI_PROD=

# Auth
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

# Cashfree
CASHFREE_APP_ID=
CASHFREE_SECRET_KEY=
CASHFREE_WEBHOOK_SECRET=
CASHFREE_ENV=sandbox   # sandbox | production

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=passwale-media

# Twilio OTP + SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@passwale.com

# Firebase (Push Notifications)
FIREBASE_SERVER_KEY=
FIREBASE_PROJECT_ID=

# App
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
```

---

## BUILD ORDER (Week-by-Week)

| Week | Focus | Deliverable |
|---|---|---|
| 1 | Scaffold + Docker + Brand tokens | `Hello Passwale` page, DB connected |
| 2 | All 14 models + seed script | DB fully structured, seeded |
| 3 | Auth system (backend + frontend) | Full login/signup/OAuth/OTP working |
| 4 | AdminSettings engine + Pricing UI | Admin can change fee, see live preview |
| 5 | Scene system (backend + pages) | 6 scenes discoverable, scene pages live |
| 6 | Event creation wizard | Organizer can create and publish event |
| 7 | Event microsite + discovery page | Public can find and view events |
| 8 | Organizer dashboard core | Real stats, events list, basic analytics |
| 9 | Event analytics + attendee export | Traffic sources, CSV download |
| 10 | Cashfree integration + pricing breakdown | Payment sandbox working |
| 11 | QR generation + ticket wallet | QR generated, viewable in dashboard |
| 12 | Check-in scanner + webhook idempotency | Organizer can scan QR at entry |
| 13 | Passwale Card + Squad Passes | Card purchase, squad flow, benefits |
| 14 | Admin financial panel + hardening | Admin financials, security, launch prep |

---

## VERIFICATION PLAN

**After each week:**
- Run full E2E test of that week's feature manually
- Commit to `main` only after feature is tested
- Keep `.env.example` updated with any new variables

**Phase 1 exit:**
- [ ] `docker-compose up` runs full stack
- [ ] Auth flow: email, Google, OTP all work
- [ ] Admin login → change platform fee → PricingService reflects new value
- [ ] PWA installable on Android Chrome

**Phase 2 exit:**
- [ ] 6 scenes visible at `/scenes`
- [ ] Create event → published at `/e/:slug`
- [ ] Organizer dashboard shows real revenue

**Phase 3 exit (MVP LAUNCH READY):**
- [ ] Buy ticket end-to-end (Cashfree sandbox)
- [ ] QR code in dashboard after purchase
- [ ] Check-in scanner validates QR
- [ ] 3.69% fee showing on all breakdowns
- [ ] Admin can see transaction in financials
- [ ] PasswaleCard discount applied correctly
- [ ] Squad pass flow: create + join + lock

---

## HOW TO USE FEATURES.md

The [`FEATURES.md`](file:///Users/hackair/passwale%20tech/FEATURES.md) file controls agent scope:

- `[MVP]` → Build it now
- `[DEFER]` → Skip, note it in TODO
- `[OFF]` → Never build (until changed)
- `[DONE]` → Already built, don't touch

**To add a feature**: Add a new line `[MVP] FeatureName — description` under the right phase section.  
**To skip a feature**: Change `[MVP]` to `[DEFER]`.  
**Agent instruction**: At the start of every session, agents should read `FEATURES.md` and only build `[MVP]` flagged items.
