# PASSWALE
## Deep Implementation Plan for Antigravity (AI Vibe Coding Platform)
### Greenfield · PWA + Web + Android + iOS · 6 Phases

---

> **Platform Stack Locked:**
> Frontend: React 18 + Tailwind CSS + PWA manifest
> Backend: Node.js + Express + MongoDB (Mongoose)
> Payments: Cashfree Payment Gateway
> Mobile: Capacitor.js (wrap PWA → Android + iOS)
> Storage: AWS S3
> Real-time: Socket.io
> Auth: JWT + Google OAuth + Phone OTP
> Hosting: AWS EC2 / Vercel (frontend) + MongoDB Atlas

---

## BEFORE YOU START — PROMPT ARCHITECTURE FOR ANTIGRAVITY

Since Antigravity is an AI vibe coding platform, every phase is broken into **prompt-ready modules**. Each module = one self-contained AI generation prompt. Feed them in sequence. Never combine more than one module in a single prompt or the output quality degrades.

**Golden Rule for prompting:**
- Always prefix every prompt with the full system context (stack, brand, business rules)
- Always end every prompt with "Generate complete, working, production-ready code. No placeholders."
- After each module is generated, test before moving to next

---

# PHASE 1 — FOUNDATION & CORE INFRASTRUCTURE
## Timeline: Weeks 1–4
## Goal: Platform skeleton, auth, database, admin settings engine

---

### WHAT WE'RE BUILDING IN PHASE 1

Phase 1 is purely invisible infrastructure. No user-facing features beyond login/signup. This phase is the hardest to rush and the most expensive to redo. Get it right.

---

### MODULE 1.1 — PROJECT SCAFFOLD & MONOREPO SETUP

**Deliverable**: Complete project structure, dev environment, CI/CD skeleton

**What to generate:**
- Monorepo structure:
  ```
  passwale/
  ├── apps/
  │   ├── web/          (React PWA)
  │   └── api/          (Node.js backend)
  ├── packages/
  │   ├── ui/           (Shared component library)
  │   └── utils/        (Shared utility functions)
  ├── docker-compose.yml
  └── .env.example
  ```
- React app with Vite + Tailwind + PWA plugin
- Node.js app with Express + MongoDB connection
- Environment variable structure (.env.example)
- ESLint + Prettier configuration
- Git hooks (Husky) for pre-commit linting
- Docker compose for local development (MongoDB, backend, frontend)
- README.md with setup instructions

**Brand configuration to inject:**
- Primary color: Blue (#1D4ED8)
- Accent color: Yellow (#FACC15)
- Background: White (#FFFFFF)
- Font: Inter (primary), Space Grotesk (display)
- Logo placeholder

**Antigravity Prompt Note:** Generate the full project scaffold. Include package.json files, vite.config.js, tailwind.config.js with Passwale brand tokens, docker-compose.yml, and a working "Hello Passwale" page that confirms the stack is wired.

---

### MODULE 1.2 — DATABASE FOUNDATION

**Deliverable**: All 14 Mongoose models, indexes, relationships

**Models to generate (in order):**
1. `AdminSettings` — Singleton. Stores ALL platform pricing/config
2. `User` — Multi-role schema (attendee, organizer, vendor, volunteer, admin)
3. `Scene` — Cultural categories
4. `Event` — Full event schema with ticketing categories
5. `Ticket` — Individual ticket with QR reference
6. `Transaction` — Complete pricing breakdown with 3.69% fee
7. `PassCoinTransaction` — Coin ledger
8. `Squad` — Group pass management
9. `PassCollection` — Recurring event series (IP pages)
10. `Subscription` — Passwale Card subscriptions
11. `Payout` — Organizer/vendor/volunteer payouts
12. `Refund` — Refund requests and tracking
13. `AuditLog` — Every admin action logged
14. `Notification` — In-app + push notifications

**Critical business rules to embed in schema:**
- Platform fee: 3.69% (stored in AdminSettings, referenced everywhere)
- Every commission is overridable per organizer by admin
- PassCoins earning multipliers per card tier (1x/2x/3x/5x)
- Ticket QR codes are unique, tamper-evident

**Antigravity Prompt Note:** Generate all 14 Mongoose schemas in separate files. Include indexes, virtuals, pre-save hooks, and static methods. Include a database seed script that creates default AdminSettings with 3.69% platform fee, 6 default scenes, and a super admin user.

---

### MODULE 1.3 — AUTHENTICATION SYSTEM

**Deliverable**: Complete auth flow — signup, login, OAuth, OTP, JWT, role switching

**What to generate:**

**Backend:**
- `POST /api/auth/signup` — Email + password + role selection
- `POST /api/auth/login` — Email/password login
- `POST /api/auth/google` — Google OAuth callback
- `POST /api/auth/send-otp` — Phone OTP via SMS
- `POST /api/auth/verify-otp` — Verify OTP, return JWT
- `POST /api/auth/refresh-token` — Refresh expired JWT
- `POST /api/auth/forgot-password` — Send reset email
- `POST /api/auth/reset-password/:token` — Reset password
- `POST /api/auth/verify-email/:token` — Email verification
- JWT middleware (verifies token on protected routes)
- RBAC middleware (checks role for route access)

**Frontend:**
- `/login` page — Email/password form + Google button + Phone OTP tab
- `/signup` page — 5-step onboarding wizard:
  - Step 1: Name, email, password
  - Step 2: Role selection (Attendee/Organizer/Vendor/Volunteer) — can select multiple
  - Step 3: Scene preference selection (minimum 3 scenes from grid)
  - Step 4: Profile photo upload (drag-drop, crop tool)
  - Step 5: Email verification prompt
- `/forgot-password` page
- `/reset-password` page
- Auth context (React Context API or Zustand store)
- Protected route wrapper component
- Role-based redirect after login (attendee → /dashboard, organizer → /organizer, admin → /admin)

**Security rules:**
- Passwords: bcrypt, 10 salt rounds
- JWT: 7-day access token, 30-day refresh token
- OTP: 6-digit, 10-minute expiry, max 3 attempts
- Rate limiting: 5 login attempts per 15 minutes per IP

**Antigravity Prompt Note:** Generate complete auth system including all API endpoints, JWT/bcrypt utilities, Google OAuth integration with passport.js, SMS OTP with Twilio, and all frontend pages with form validation using React Hook Form + Zod.

---

### MODULE 1.4 — ADMIN SETTINGS ENGINE (CRITICAL)

**Deliverable**: Dynamic pricing configuration system — the brain of all financial logic

**What to generate:**

**Backend:**
- `AdminSettings` service with `getSettings()` singleton pattern
- `PricingService` — Calculates all fees dynamically from AdminSettings:
  - `calculateTicketPrice(basePrice, userId, organizerId, cardBenefits, quantity)`
  - `calculateCommission(organizerId, amount)` — checks custom override first
  - `calculateVolunteerFee(amount)`
  - `calculateVendorCommission(amount)`
- All admin pricing API endpoints:
  - `GET /api/admin/pricing` — Get all settings
  - `PATCH /api/admin/pricing/platform-fee` — Update 3.69% base fee
  - `PATCH /api/admin/pricing/commission-tiers` — Update tier commissions
  - `PATCH /api/admin/pricing/volunteer-fee`
  - `PATCH /api/admin/pricing/vendor-commission`
  - `PATCH /api/admin/pricing/card-pricing`
  - `PATCH /api/admin/pricing/card-subsidy`
  - `PATCH /api/admin/pricing/resale-fees`
  - `PATCH /api/admin/pricing/passcoins-config`
  - `PATCH /api/admin/organizers/:id/commission` — Per-organizer override
  - `DELETE /api/admin/organizers/:id/commission` — Reset to default

**AuditLog middleware:** Every admin change logs before/after values with admin ID, timestamp, IP

**Frontend (Admin):**
- `/admin/pricing` — Full pricing dashboard:
  - Platform fee card (input + live example calculation)
  - Commission tiers table (all 5 tiers, inline edit)
  - Volunteer fee card
  - Vendor commission card
  - Passwale Card pricing (Plus/Pro monthly + annual)
  - Card subsidy split slider (platform % / organizer %)
  - Resale fees configuration
  - PassCoins earning rates per tier
- `/admin/organizers/:id` — Per-organizer commission override modal
- Audit log table showing all changes

**Antigravity Prompt Note:** This is the most critical module. Every financial calculation in the platform must call PricingService, never hardcode values. Generate complete service with JSDoc comments showing the math. Include a live pricing preview component that updates in real-time as admin changes values.

---

### MODULE 1.5 — PWA + MOBILE WRAPPER SETUP

**Deliverable**: PWA configuration + Capacitor setup for Android/iOS

**What to generate:**
- `manifest.json` — Passwale PWA manifest (name, icons, theme_color: #1D4ED8, background_color: #FFFFFF, display: standalone)
- Service worker (Workbox) — offline support for:
  - Cached ticket QR codes (work offline at venue)
  - Recently viewed events
  - User profile data
- Push notification setup (Firebase Cloud Messaging)
- `capacitor.config.ts` — iOS + Android configuration
- Android build configuration
- iOS build configuration
- App icons and splash screens for both platforms
- Deep linking setup (passwale.com/e/:slug opens in app)

**Phase 1 Exit Criteria:**
- [ ] All 14 database models created and seeded
- [ ] Auth flow working (email, Google, OTP)
- [ ] Admin can log in and update platform fee
- [ ] PricingService correctly calculates 3.69% on any input
- [ ] PWA installable on mobile
- [ ] Docker compose runs entire stack locally
- [ ] All environment variables documented

---

# PHASE 2 — SCENE SYSTEM & EVENT CORE
## Timeline: Weeks 5–9
## Goal: Scene discovery, event creation, microsites, organizer dashboard

---

### WHAT WE'RE BUILDING IN PHASE 2

This is where Passwale starts looking and feeling different from competitors. Scene-based discovery is the core identity. Event creation must be world-class.

---

### MODULE 2.1 — SCENE SYSTEM

**Deliverable**: Complete scene discovery engine (frontend + backend)

**Backend:**
- Scene CRUD APIs:
  - `GET /api/scenes` — All active scenes (with stats)
  - `GET /api/scenes/:slug` — Scene detail + upcoming events
  - `POST /api/scenes` — Admin: Create scene
  - `PATCH /api/scenes/:id` — Admin: Update scene
  - `DELETE /api/scenes/:id` — Admin: Deactivate scene
- `POST /api/users/scenes/select` — User sets preferred scenes
- `GET /api/scenes/:slug/leaderboard` — Top attendees in scene
- Scene stats aggregation job (runs nightly):
  - Total events, total attendees, growth rate, active users

**Seed data (6 default scenes):**
```
Techno    → Color: #6D28D9 (purple)
Bollywood → Color: #DC2626 (red)
Garba     → Color: #D97706 (amber)
Campus    → Color: #2563EB (blue)
Comedy    → Color: #059669 (green)
Startup   → Color: #0891B2 (cyan)
```

**Frontend:**
- `/scenes` — Scene discovery grid page:
  - 6 scene cards in colorful grid
  - Each card: Scene cover, name, active event count, community size
  - Hover effect: Scene color background wash
  - Mobile: Horizontally scrollable pill row at top
- `/scenes/:slug` — Scene detail page:
  - Full-width cover image with scene color overlay
  - Upcoming events in this scene (event cards)
  - Scene leaderboard (top 10 attendees with streaks)
  - Scene ambassadors section
  - Stats bar (total events, attendees, growth)
  - "Join this scene" button (adds to user preferences)
- Scene preference selector component (used in onboarding + settings):
  - Colorful grid of scene tiles
  - Click to select/deselect
  - Minimum 3 required
- Scene badge/streak display component

**Antigravity Prompt Note:** The scene grid must feel like a culture board, not a category list. Use the scene's color as the card's dominant color. Include micro-animations on hover. Generate the nightly aggregation cron job using node-cron.

---

### MODULE 2.2 — EVENT CREATION WIZARD

**Deliverable**: Full 9-step event creation form for organizers

**Backend:**
- `POST /api/events` — Create event (draft)
- `PATCH /api/events/:id` — Update event
- `POST /api/events/:id/publish` — Publish event (triggers approval if required)
- `POST /api/events/:id/duplicate` — Clone event
- `DELETE /api/events/:id` — Delete draft
- `POST /api/events/:id/cancel` — Cancel with reason
- Auto-generate slug from event name (unique check)
- Media upload to AWS S3:
  - `POST /api/upload/event-cover`
  - `POST /api/upload/event-gallery`
  - Image compression before upload (Sharp.js)
  - Auto-generate thumbnail (400x300)
- Auto-generate event creatives:
  - Story creative (1080x1920 canvas, event name + date overlay)
  - Post creative (1080x1080)

**Frontend — 9-step wizard:**

**Step 1: Basics**
- Event name (auto-generates slug preview below)
- Short description (200 char counter)
- Full description (rich text: Tiptap editor)
- Scene selection (multi-select from scene chips)
- Tags (autocomplete input)

**Step 2: Type & Category**
- Event type: Free / Paid / Donation / Hybrid (large icon buttons)
- Category: Music / Workshop / Conference / Sports / Nightlife / Campus / Festival
- If Paid: Currency display (₹)

**Step 3: Date & Location**
- Date range picker (start + end)
- Time pickers
- Location type: Physical / Virtual / Hybrid
- Physical: Google Places autocomplete for venue
- Virtual: Platform dropdown + Stream URL

**Step 4: Media**
- Cover image upload (drag-drop + crop)
- Gallery upload (up to 10 images)
- Video URL input
- Auto-generate creatives checkbox

**Step 5: Lineup**
- Repeatable card: Name, role, bio, photo, social links, performance time
- Drag to reorder

**Step 6: Tickets**
- Global capacity input
- Repeatable ticket categories:
  - Name, description, price, quantity
  - Sales start/end dates
  - Squad pass toggle + settings
  - Time slots toggle + slot builder
  - Passwale Card benefits section (collapsible):
    - Master toggle: "Enable Passwale Card benefits for this event"
    - If ON: Per-tier discount % sliders + early access hours
    - Live preview: "Plus members save ₹X on ₹1000 ticket"
    - Subsidy info: "Platform covers 60% of discount"
- Enable resale pool toggle
- Enable waitlist toggle

**Step 7: Rules**
- Dress code
- Age restriction
- Prohibited items (multi-tag input)
- Guidelines textarea

**Step 8: Community**
- Enable chat toggle
- Enable polls toggle
- Enable Q&A toggle

**Step 9: Review & Publish**
- Full event summary
- Microsite URL preview (eventslug.passwale.com)
- Visibility: Public / Private / Invite-only
- Save as Draft / Publish buttons

**Progress bar at top of wizard. Validation on each step before proceeding.**

**Antigravity Prompt Note:** The wizard must feel premium. Each step on its own screen with smooth slide transition. Use Framer Motion for step transitions. The ticket category builder must support adding unlimited categories. The Passwale Card benefits section must show live math (e.g., "organizer effectively pays only 4% due to 60% platform subsidy").

---

### MODULE 2.3 — EVENT MICROSITE ENGINE

**Deliverable**: Auto-generated branded event pages at passwale.com/e/:slug

**Backend:**
- `GET /api/events/slug/:slug` — Public event data (no auth required)
- Track page view analytics on every hit
- Track traffic source via UTM parameters:
  - `?ref=reel` / `?ref=story` / `?ref=whatsapp` / etc.
  - Store in event.analytics.trafficSources

**Frontend — `/e/:slug` (event microsite):**
- Mobile-first, full-screen layout (Instagram-story feel)
- Sections:
  1. Hero: Full-screen cover image/video with event name overlay
  2. Quick info bar: Date, time, venue, scene badge
  3. Countdown timer (days:hours:minutes:seconds)
  4. Organizer card with verified badge
  5. Lineup carousel (swipeable cards)
  6. Ticket categories (live availability, price with 3.69% fee shown)
  7. About (rich text description)
  8. Location (Google Maps embed)
  9. Related events from same organizer
  10. Share section (WhatsApp, Instagram story link, copy link)
- Sticky bottom bar: "Get Tickets" CTA button
- Open Graph meta tags for link preview (auto-generated)
- Share buttons generate UTM-tagged links

**Auto-generated creative download:**
- "Download Story Creative" button
- "Download Post Creative" button
- Templates pre-populated with event data

**Antigravity Prompt Note:** The microsite must load in under 2 seconds. Use React Suspense + lazy loading for below-fold sections. The countdown timer must be a reusable component. Implement UTM parameter parsing on page load that stores to localStorage and sends to analytics API.

---

### MODULE 2.4 — EVENT DISCOVERY PAGE

**Deliverable**: Main events browsing experience

**Backend:**
- `GET /api/events` — Paginated events with filters:
  - Query params: scene, city, dateFrom, dateTo, type, minPrice, maxPrice, sort
  - Default sort: upcoming + trending
- `GET /api/events/trending` — Trending events (by views + ticket velocity)
- `GET /api/events/nearby` — Events by coordinates (geospatial query)
- `GET /api/events/search?q=` — Full-text search (MongoDB text index)
- `GET /api/events/recommended` — Personalized (based on user scenes + history)

**Frontend — `/events`:**
- Top filter bar:
  - Scene chips (horizontal scroll, multi-select)
  - City dropdown
  - Date range quick picks: Today / This Weekend / This Week / Custom
  - Price range slider (₹0 — ₹10,000)
  - Type: All / Free / Paid
- Sort bar: Trending / Upcoming / Price ↑ / Price ↓
- Event cards grid (3 col desktop, 2 col tablet, 1 col mobile)
- Infinite scroll (load 12 at a time)
- "Map View" toggle (show events on Google Maps)
- Empty state with scene suggestions

**Event Card Component:**
- Cover image (16:9)
- Scene color strip at top
- Event name (truncated at 2 lines)
- Date + time
- Venue / city
- Organizer name + verified badge
- Price (starting from ₹X, or "Free")
- Tickets left indicator (if < 20% remaining: "Only 12 left!")
- Passwale Card badge (if card benefits enabled)

**Antigravity Prompt Note:** Implement skeleton loading for event cards. The filter panel on mobile must be a bottom sheet drawer. Geospatial nearby query requires 2dsphere index on event location coordinates.

---

### MODULE 2.5 — ORGANIZER DASHBOARD (CORE)

**Deliverable**: Organizer home, events list, event analytics

**Backend:**
- `GET /api/organizer/dashboard` — Stats overview
- `GET /api/organizer/events` — Organizer's events with filters
- `GET /api/organizer/events/:id/analytics` — Detailed analytics per event
- `GET /api/organizer/events/:id/attendees` — Attendee list (exportable)

**Frontend — `/organizer/*`:**

**Home dashboard:**
- Stats row: Total events / Active events / Total revenue / Tickets sold this month
- Revenue chart (last 6 months, bar chart with Recharts)
- Recent sales feed (last 10 transactions with buyer name, ticket type, amount)
- Pending actions card:
  - Volunteer applications awaiting review
  - Vendor requests pending
- Quick action buttons: Create event / View analytics / Manage payouts

**Events list:**
- Tabs: All / Published / Draft / Past / Cancelled
- Table view: Event name, date, sold/capacity, revenue, status, actions
- Card view toggle
- Actions: Edit / Duplicate / Analytics / Cancel

**Event analytics page:**
- Overview cards: Tickets sold, Revenue (gross + net), Conversion rate, Avg ticket value
- Traffic sources donut chart (Reel / Story / WhatsApp / Direct / Search)
- Sales funnel (Page views → Ticket page → Checkout → Purchased)
- Sales over time line chart
- Ticket category breakdown bar chart
- Attendee demographics (city, device)
- Attendee list table (name, email, ticket type, check-in status) + CSV export

**Phase 2 Exit Criteria:**
- [ ] 6 scenes seeded and discoverable
- [ ] Organizer can create a complete event in under 10 minutes
- [ ] Event microsite live at /e/:slug with share tracking
- [ ] Discovery page with all filters working
- [ ] Organizer dashboard showing real data
- [ ] PWA installable and event pages work offline

---

# PHASE 3 — TICKETING, PAYMENTS & PASSES
## Timeline: Weeks 10–14
## Goal: Complete ticket purchase flow, QR passes, squad passes, Cashfree integration

---

### WHAT WE'RE BUILDING IN PHASE 3

Money flows. This is the most critical phase technically. Every edge case must be handled. Cashfree integration, 3.69% fee, commission splits, ticket generation, QR codes.

---

### MODULE 3.1 — TICKET PURCHASE FLOW

**Deliverable**: Complete end-to-end ticket buying experience

**Backend:**
- `POST /api/pricing/calculate` — Returns full pricing breakdown (public, no auth needed for preview)
- `POST /api/tickets/purchase` — Initiate purchase, create Cashfree order
- `POST /api/tickets/payment-callback` — Handle Cashfree return
- `POST /api/webhooks/cashfree` — Handle Cashfree server-to-server webhook
- `GET /api/tickets/my-tickets` — User's tickets
- `GET /api/tickets/:ticketNumber` — Single ticket detail + QR

**Critical payment flow:**
```
User clicks Buy
→ POST /api/tickets/purchase
  → PricingService.calculateTicketPrice() [applies 3.69%]
  → Create Transaction (status: pending)
  → PaymentService.createOrder() [Cashfree order]
  → Return paymentSessionId to frontend

Frontend loads Cashfree checkout
→ User pays
→ Cashfree redirects to /payment/callback

Backend webhook fires
→ Verify payment with Cashfree
→ If SUCCESS:
  → Transaction status: completed
  → Generate Ticket records
  → Generate QR codes (one per ticket)
  → Update event sold count
  → Award PassCoins
  → Send confirmation email + SMS
  → Send push notification
→ If FAILED:
  → Transaction status: failed
  → No tickets generated
  → Notify user
```

**Cashfree SDK integration:**
- Use `cashfree-pg` npm package
- Support: UPI, Credit/Debit Cards, Net Banking, Wallets
- Sandbox mode for testing
- Webhook signature verification

**QR Code generation:**
- Use `qrcode` npm package
- QR contains: `passwale://ticket/{ticketNumber}/{secureHash}`
- Upload QR image to S3
- Dynamic QR refresh every 30 seconds (anti-screenshot)

**Frontend:**

**Ticket Purchase Modal (opens from event page):**
- Step 1: Select ticket category + quantity
  - Live availability counter
  - Max per order enforcement
- Step 2: Pricing breakdown display:
  ```
  Ticket: General Admission × 2
  ─────────────────────────────
  Base price:          ₹2,000
  Passwale Plus (10%): -₹200
  ─────────────────────────────
  Subtotal:            ₹1,800
  Platform fee (3.69%): ₹66.42
  ─────────────────────────────
  TOTAL:               ₹1,866.42
  ─────────────────────────────
  You earn: 180 PassCoins 🪙
  ```
- Step 3: Review details + contact info
- Step 4: Cashfree checkout (loads SDK)
- Step 5: Success screen with ticket preview + QR

**Payment callback page** (`/payment/callback`):
- Spinner while verifying
- Success: Show tickets, CTA to view in dashboard
- Failed: Error message, retry button

**Antigravity Prompt Note:** Implement idempotency for the webhook handler — same Cashfree event must not create duplicate tickets. Use a processed webhooks cache (Redis or MongoDB set). The QR dynamic refresh should use a signed JWT that expires every 30 seconds, verified at check-in.

---

### MODULE 3.2 — SQUAD PASSES

**Deliverable**: Group ticket system with social lock-in mechanics

**Backend:**
- `POST /api/squads/create` — Create squad + purchase first ticket
- `POST /api/squads/:squadId/join` — Join existing squad
- `GET /api/squads/:squadId` — Squad status, members, countdown
- `POST /api/squads/:squadId/lock` — Lock squad when minimum reached
- Cron job: Auto-cancel squads that don't lock by deadline

**Squad Flow:**
```
User selects "Squad Pass" ticket category
→ Create squad (min 4, max 8 members, e.g.)
→ Shareable squad link generated
→ Lock deadline set (e.g., 2 hours)
→ Friends join via link
→ When minimum reached: Squad locks, discount activates
→ All members pay reduced price
→ If minimum not reached by deadline: Squad cancelled, no charge
```

**Frontend:**
- Squad creation modal (from ticket purchase):
  - Squad name input
  - Copy shareable link button
  - WhatsApp share button
  - Member slots visual (empty circles filling as friends join)
  - Countdown timer to lock deadline
  - Current discount (activates at minimum)
- Squad join page (`/squad/:squadId`):
  - Event details
  - Current members (avatars)
  - Spots remaining
  - Countdown
  - "Join Squad" CTA
- Squad status widget on ticket dashboard:
  - Members list
  - Lock status
  - Savings display

**Antigravity Prompt Note:** The squad share link must work without auth (joiners see the squad page, then prompted to login/signup). Use Socket.io for real-time member join notifications on the squad page.

---

### MODULE 3.3 — MY TICKETS & QR PASS VIEWER

**Deliverable**: Ticket wallet in user dashboard

**Frontend — `/dashboard/tickets`:**
- Tabs: Upcoming / Past / Cancelled
- Ticket cards:
  - Event cover image (blurred background)
  - Event name, date, venue
  - Ticket category + number
  - Status badge (Active / Used / Cancelled)
- Ticket detail modal (tap to open):
  - Large QR code (dynamic, refreshes every 30s)
  - Ticket number
  - Holder name
  - Entry slot time (if applicable)
  - Add to Apple/Google Wallet button
  - Download PDF button
  - Transfer ticket button (if resale enabled)
  - Share ticket (NFC tap to transfer)
- Offline support: Tickets cached in service worker

**Check-in Scanner (for organizers/volunteers):**
- `/organizer/check-in/:eventId`
- Camera-based QR scanner (react-qr-reader)
- Scan → Verify ticket via API → Green/Red flash
- Shows attendee name + ticket category
- Manual ticket number input fallback
- Works partially offline (sync queue)

**Backend:**
- `POST /api/tickets/check-in` — Verify + mark ticket as used
- `GET /api/tickets/check-in/:eventId/stats` — Live check-in stats
- Validate: ticket is active, event is today, not already used

---

### MODULE 3.4 — PASSWALE CARD SUBSCRIPTIONS

**Deliverable**: Card purchase, management, benefits activation

**Backend:**
- `POST /api/subscriptions/purchase` — Buy Plus/Pro card (Cashfree recurring or one-time annual)
- `GET /api/subscriptions/my-subscription` — Current subscription
- `POST /api/subscriptions/cancel` — Cancel auto-renew
- `POST /api/subscriptions/upgrade` — Upgrade Plus → Pro
- Cron job: Check expired subscriptions daily, downgrade to free tier
- Cron job: Send renewal reminder 7 days before expiry

**Pricing (from AdminSettings, dynamic):**
- Plus: ₹199/month or ₹1,999/year
- Pro: ₹599/month or ₹5,999/year

**Frontend — `/dashboard/card`:**
- Current tier display (visual card design per tier):
  - Free: White card
  - Plus: Blue gradient card
  - Pro: Dark blue premium card
  - Black: Black metal card (invite-only)
- Benefits list for current tier
- Upgrade section:
  - Feature comparison table (Free vs Plus vs Pro vs Black)
  - Monthly/Annual toggle (show savings)
  - Upgrade CTA (launches Cashfree for subscription)
- Usage stats:
  - Total saved (sum of card discounts)
  - Early access used
  - PassCoins earned via tier multiplier
- Subscription management:
  - Next renewal date
  - Cancel auto-renew
  - Billing history

---

### MODULE 3.5 — PASSWALE CARD BENEFITS AT CHECKOUT

**Deliverable**: Card benefits applied during ticket purchase

**Logic (in PricingService):**
```javascript
if (user.passwaleCard.tier !== 'free' 
    && category.passwaleCardBenefits.enabled) {
  
  // Get discount for user's tier
  const discount = category.passwaleCardBenefits[tier].discount
  
  // Apply discount to subtotal
  discountAmount = subtotal * (discount / 100)
  
  // Calculate subsidy split from AdminSettings
  platformPays = discountAmount * (settings.cardSubsidy.platformPercentage / 100)
  organizerPays = discountAmount * (settings.cardSubsidy.organizerPercentage / 100)
}
```

**Frontend display:**
- If user has Plus/Pro: Show "Your Passwale [tier] discount applied: -₹X" in green
- If user has free tier: Show "Upgrade to Plus and save ₹X on this ticket" banner
- If organizer disabled benefits: Don't show discount (no mention of it)

**Phase 3 Exit Criteria:**
- [ ] User can buy a ticket end-to-end (Cashfree sandbox)
- [ ] QR code generated and verifiable at check-in
- [ ] Squad pass flow works with 2+ members
- [ ] Passwale Card discount applied correctly at checkout
- [ ] 3.69% fee showing correctly on all transactions
- [ ] Organizer receives correct payout amount
- [ ] Admin can verify transaction breakdown in financials

---

# PHASE 4 — LOYALTY, COMMUNITY & ENGAGEMENT
## Timeline: Weeks 15–20
## Goal: PassCoins, scene streaks, community features, digital locker, notifications

---

### MODULE 4.1 — PASSCOINS ENGINE

**Deliverable**: Complete coin economy — earning, tracking, redeeming

**Backend:**
- PassCoin earning triggers (called from various controllers):
  - After ticket purchase: `earnCoins(userId, 'purchase', amount, transactionId)`
  - After verified review: `earnCoins(userId, 'review', eventId)`
  - After referral converts: `earnCoins(userId, 'referral', referredUserId)`
  - After scene challenge: `earnCoins(userId, 'challenge', challengeId)`
  - After volunteer shift: `earnCoins(userId, 'volunteer', eventId)`
  - After photo upload: `earnCoins(userId, 'upload', eventId)`
- Multipliers from AdminSettings (1x/2x/3x/5x by card tier)
- `POST /api/passcoins/redeem` — Redeem coins (creates discount on next purchase)
- `GET /api/passcoins/history` — Transaction history
- `POST /api/passcoins/gift` — Gift coins to friend
- Cron job: Expire coins past expiry date (by tier)

**Frontend — `/dashboard/wallet`:**
- Balance display (animated counter on load)
- Earning rate display (based on current card tier)
- Transaction history (earned/redeemed/expired rows)
- Redemption section:
  - Slider: How many coins to redeem (₹1 = 10 coins)
  - Applied to next purchase automatically
- Referral section:
  - Unique referral link
  - Referred friends count
  - Earnings from referrals
- "Gift coins" feature (send to friend by username)

---

### MODULE 4.2 — SCENE STREAKS & BADGES

**Deliverable**: Gamification layer tied to cultural attendance

**Backend:**
- Streak update logic (called after check-in confirmed):
  ```
  After check-in:
  → Get user's sceneStats for this scene
  → If last attendance was within 30 days: increment streak
  → Else: reset streak to 1
  → Update longestStreak if current > longest
  → Check badge milestones → award if reached
  → Update scene leaderboard
  ```
- Badge milestones per scene:
  - 1 event: "First Timer"
  - 5 events: "Regular"
  - 15 events: "Devotee"
  - 50 events: "Icon"
  - 100 events: "Legend"
- Streak perks (auto-applied at check-in):
  - 3-event streak: 10% off next event in this scene
  - 5-event streak: Priority queue entry
  - 10-event streak: Backstage access (if organizer enabled)
- `GET /api/scenes/leaderboard/:sceneId` — Top attendees this month

**Frontend:**
- Scene stats in `/dashboard/scenes`:
  - Per-scene card with streak fire 🔥 + count
  - Progress ring to next badge
  - Badge collection (earned badges glow, unearned are greyed)
  - Next milestone callout: "3 more Techno events → unlock Priority Entry"
- Scene leaderboard on scene detail page:
  - Top 10 with avatar, username, streak count, top badge
  - User's own rank highlighted

---

### MODULE 4.3 — COMMUNITY FEATURES

**Deliverable**: Event chat rooms, polls, Q&A

**Backend (Socket.io):**
- `io.on('join-event-room', eventId)` — User joins event chat
- `io.on('send-message', message)` — Broadcast to event room
- `io.on('poll-vote', pollId, option)` — Vote on poll
- REST APIs:
  - `GET /api/events/:id/messages` — Last 50 messages (on load)
  - `POST /api/events/:id/polls` — Organizer creates poll
  - `GET /api/events/:id/polls` — Active polls
  - `POST /api/events/:id/questions` — Attendee submits Q&A question
  - `PATCH /api/events/:id/questions/:qId/upvote` — Upvote question

**Frontend:**
- Event community tab (on event detail + microsite):
  - Live chat window (WhatsApp-style bubbles)
  - Online attendee count
  - Polls section (real-time vote bars)
  - Q&A section (upvote questions, organizer can answer)
  - Announcements (organizer-only broadcast, pinned at top)
- Moderation: Organizer can delete messages, mute users

---

### MODULE 4.4 — DIGITAL EVENT LOCKER

**Deliverable**: Post-event photo/video gallery with face-match segmentation

**Backend:**
- `POST /api/locker/:eventId/upload` — Organizer uploads photos/videos (S3)
- `POST /api/locker/:eventId/aftermovie` — Upload aftermovie URL
- Face matching (AWS Rekognition or open-source face-api.js):
  - On upload: Compare each face in photo to all attendee profile photos
  - Tag matching attendees
  - Store face match results per photo
- `GET /api/locker/:eventId/my-photos` — Attendee's matched photos
- `PATCH /api/locker/:eventId/photos/:photoId/hide` — Attendee hides photo
- Access control:
  - Public: Anyone can view
  - Attendees only: Must have valid ticket for event
  - VIP only: Must have VIP ticket

**Frontend — `/dashboard/locker`:**
- Events grid (events user attended)
- Per-event locker:
  - "My Photos" tab (face-matched, highlighted with blue border)
  - "All Photos" tab
  - Aftermovie player
  - Download button (quality based on card tier)
  - Share to Instagram button
  - Hide photo option
- Storage usage bar (Free: 500MB / Plus: 5GB / Pro: 25GB)
- Upgrade prompt when near limit

---

### MODULE 4.5 — NOTIFICATIONS SYSTEM

**Deliverable**: In-app + push + email + SMS notifications

**Backend:**
- Notification triggers:
  - Ticket purchase confirmation
  - Event reminder (24h before)
  - Squad member joined
  - Waitlist ticket available
  - Card early access window opened
  - PassCoins earned
  - Event cancelled
  - Check-in confirmed
  - Payout processed
- `GET /api/notifications` — User's notifications (paginated)
- `PATCH /api/notifications/:id/read` — Mark as read
- `PATCH /api/notifications/read-all` — Mark all read
- Firebase Cloud Messaging for push notifications
- SendGrid for email notifications
- Twilio for SMS (critical alerts only)

**Frontend:**
- Notification bell in header (red badge with unread count)
- Notification dropdown (last 10, grouped by date)
- Notification preferences page (`/dashboard/settings/notifications`):
  - Toggle each type: In-app / Email / SMS / Push

**Phase 4 Exit Criteria:**
- [ ] PassCoins awarded on every qualifying action
- [ ] Scene streaks updating after check-in
- [ ] Badges awarded at milestones
- [ ] Event chat working in real-time
- [ ] Photo locker with face-match working
- [ ] Push notifications arriving on PWA
- [ ] Organizer can upload event media post-event

---

# PHASE 5 — VOLUNTEER MARKETPLACE, VENDOR SYSTEM & PASS COLLECTIONS
## Timeline: Weeks 21–26
## Goal: Volunteer hiring + escrow, vendor booking, IP/pass collection pages, resale + waitlist

---

### MODULE 5.1 — VOLUNTEER MARKETPLACE

**Deliverable**: Volunteer hiring + escrow payment system

**Backend:**
- `GET /api/volunteers` — Browse volunteers (filter by skill, scene, city, availability)
- `POST /api/events/:id/volunteers/apply` — Volunteer applies to position
- `PATCH /api/events/:id/volunteers/:applicationId/accept` — Organizer accepts
- `PATCH /api/events/:id/volunteers/:applicationId/reject` — Organizer rejects
- Escrow flow:
  ```
  Organizer accepts volunteer
  → Volunteer fee reserved from organizer wallet
  → Held in escrow (status: held)
  → Event completes
  → Cron job (runs daily): Check events completed yesterday
  → Auto-release escrow to volunteer wallet
  → Volunteer can withdraw to UPI/bank
  ```
- `POST /api/volunteers/:id/rate` — Rate volunteer post-event
- Volunteer score update:
  - Punctuality score: 100% if check-in on time, -20 if late, -50 if no-show
  - Average rating from organizers

**Frontend — Volunteer dashboard:**
- Volunteer profile builder (skills, experience, scene expertise, availability calendar)
- Open positions browser:
  - Filter: Scene, date, role type, min payment
  - Position cards: Event name, role, payment, hours, organizer rating
  - One-click apply
- My applications:
  - Applied / Accepted / Rejected tabs
  - Upcoming shifts calendar
- Work history + ratings received
- Earnings: Pending (escrow) / Available / Withdrawn
- Withdraw button → UPI/bank transfer via Cashfree payout API

**Frontend — Organizer hiring view:**
- Post positions (in event creation Step 8)
- Applications inbox:
  - Volunteer card: Photo, name, skills, rating, punctuality score, past events
  - Accept / Reject buttons
  - View full profile modal
- Hired volunteers list with contact info + payment status

---

### MODULE 5.2 — VENDOR SYSTEM

**Deliverable**: Vendor booking and management

**Backend:**
- `GET /api/vendors` — Browse vendors by service type
- `POST /api/vendors/bookings` — Organizer requests vendor
- `PATCH /api/vendors/bookings/:id/accept` — Vendor accepts
- `PATCH /api/vendors/bookings/:id/reject` — Vendor rejects
- Commission: Vendor commission % from AdminSettings applied at payout
- `POST /api/vendors/:id/review` — Post-event review

**Frontend:**
- Vendor directory (filterable by service category)
- Vendor profile page:
  - Services + pricing ranges
  - Portfolio gallery
  - Reviews + rating
  - Availability calendar
  - "Request Booking" CTA
- Vendor dashboard: Booking requests, confirmed bookings, earnings

---

### MODULE 5.3 — PASS COLLECTIONS (IP PAGES)

**Deliverable**: Branded pages for recurring event series

**Backend:**
- `POST /api/collections` — Organizer creates collection
- `PATCH /api/collections/:id` — Update collection
- `POST /api/collections/:id/events` — Add event to collection
- `GET /api/collections/:slug` — Public collection page
- `POST /api/collections/:id/season-pass/purchase` — Buy season pass

**Frontend — `/collections/:slug`:**
- Collection cover image + brand logo
- Description
- Season pass CTA (if enabled): "Get all 8 nights for ₹2,499"
- Upcoming events in this collection
- Past events archive:
  - Aftermovies
  - Past lineups
  - Photo galleries
- Fan early access sign-up (for future events in collection)
- "Follow this collection" button → Get notified of new events

---

### MODULE 5.4 — RESALE & WAITLIST

**Deliverable**: Fair ticket resale and waitlist management

**Backend:**
- `POST /api/tickets/:id/list-resale` — List ticket in resale pool
- `POST /api/tickets/:id/buy-resale` — Buy from resale pool (original price only)
- `DELETE /api/tickets/:id/delist-resale` — Remove from pool
- `POST /api/events/:id/waitlist/join` — Join waitlist
- `POST /api/events/:id/waitlist/join/priority` — Pay for priority spot
- Resale processing fee: From AdminSettings (default ₹100)
- Auto-assignment: When ticket listed → First waitlist person gets notification + 30 min to purchase

**Frontend:**
- "List for Resale" button in ticket detail (if organizer enabled)
- Resale section on event page: "X tickets available at original price"
- Waitlist join button (when sold out):
  - Free spot
  - Priority spot (₹99)
  - Guaranteed spot (₹299)
- Waitlist position indicator: "You are #23 in queue"

**Phase 5 Exit Criteria:**
- [ ] Volunteer can apply, get hired, get paid via escrow
- [ ] Vendor can be booked and paid
- [ ] Pass Collection page live with archive + aftermovies
- [ ] Season pass purchaseable
- [ ] Resale pool working at original price
- [ ] Waitlist with priority tiers working
- [ ] All volunteer/vendor commissions calculated from AdminSettings

---

# PHASE 6 — ANALYTICS, ADMIN CONTROL PANEL, SPONSOR TOOLS & LAUNCH HARDENING
## Timeline: Weeks 27–32
## Goal: Full admin panel, sponsor dashboard, platform analytics, performance, security hardening, launch

---

### MODULE 6.1 — COMPLETE ADMIN CONTROL PANEL

**Deliverable**: Super-admin dashboard with full platform control

**Pages to generate:**

**`/admin` — Dashboard:**
- GMV card, Revenue card, Active users, Events this month
- Revenue breakdown chart (commissions vs subscriptions vs fees)
- Recent high-value transactions
- System health indicators

**`/admin/users` — User management:**
- Full user table with search + filter by role/status/tier
- User detail drawer:
  - Full profile view
  - Role management (add/remove roles)
  - PassCoins manual adjustment with reason
  - Block/unblock with reason
  - Transaction history
  - Subscription status
  - Impersonate user (for support) [super_admin only]

**`/admin/events` — Event management:**
- All events table with filters
- Pending approval queue (if enabled)
- Approve/reject with reason
- Feature/unfeature event
- Cancel event → triggers refunds
- View event analytics

**`/admin/organizers` — Organizer management:**
- Organizer table with verification status, tier, GMV
- Verification queue (review documents, approve)
- Per-organizer commission override:
  - Current commission (tier-based or custom)
  - Override modal: Set custom %, add reason, save
  - Reset to default button
- View organizer's full transaction history

**`/admin/pricing` — Dynamic pricing control [FULL IMPLEMENTATION]:**
- Platform fee: Current value, input, update button, live example
- Commission tiers: All 5 tiers, inline edit, save
- Volunteer fee: Current, edit, save
- Vendor commission: Current, edit, save
- Passwale Card pricing: Plus + Pro monthly/annual, edit, save
- Card subsidy split: Dual slider (platform % + organizer % must = 100%)
- Resale fees: All 3, edit, save
- PassCoins config: Earning rates per tier + per action, edit all

**`/admin/scenes` — Scene management:**
- Scene table: Edit name, color, description, cover image
- Feature/unfeature, activate/deactivate
- Assign ambassador (search users)
- Scene treasury balance + grant allocation

**`/admin/financials` — Financial overview:**
- Revenue by stream (commissions, subscriptions, fees, resale)
- GMV trend chart
- Pending payouts table:
  - Organizer payouts: Amount, bank details, approve button
  - Volunteer payouts: Amount, UPI, approve button
  - Vendor payouts: Amount, approve button
- Payout history
- Refund requests queue:
  - Review + approve/reject
  - Approve triggers Cashfree refund API

**`/admin/passcoins` — Coin economy control:**
- Liability dashboard: Total coins issued, redeemed, outstanding
- Manual coin operations: Add/deduct for any user with reason
- Expiry management: Bulk expire coins

**`/admin/card` — Passwale Card control:**
- Subscription analytics (MRR, churn, tier distribution)
- Manual tier assignment:
  - Upgrade any user to Black (invite-only logic)
  - Downgrade if needed

**`/admin/audit-logs` — Full audit trail:**
- Every admin action logged:
  - Admin name, action, target, before/after values, timestamp, IP
- Filterable by admin, action type, date range
- Export to CSV

**`/admin/support` — Support center:**
- User-submitted issues
- Flagged events
- Dispute queue (buyer vs organizer)
- Announcement composer (send to all users / by role / by scene)

**`/admin/settings` — Platform configuration:**
- Event approval toggle
- Auto-approve verified organizers toggle
- Max ticket price (anti-fraud)
- Feature flags (scenes, squad passes, volunteer marketplace, etc.)
- Cashfree API key management (sandbox ↔ production toggle)
- Email template editor

---

### MODULE 6.2 — SPONSOR DASHBOARD

**Deliverable**: Sponsor-facing tools for brand activation

**Backend:**
- `POST /api/sponsors/campaigns` — Create sponsorship campaign
- `GET /api/sponsors/analytics` — Campaign performance data
- `POST /api/sponsors/scene-sponsor` — Sponsor a scene (admin approval)

**Frontend — `/sponsor/*`:**
- Campaign management:
  - Active campaigns with event associations
  - Creative uploads (logo, banner)
  - Budget tracking
- Analytics dashboard:
  - Impressions, clicks, estimated reach
  - Event-level breakdown
  - ROI summary (cost per impression)
- Scene sponsorship application form

---

### MODULE 6.3 — ADVANCED ANALYTICS (REEL-NATIVE)

**Deliverable**: Organizer's reel-to-ticket conversion tracking

**Backend:**
- UTM source stored on every event page hit (Phase 2 laid groundwork)
- Analytics aggregation:
  - Per-source conversion rate
  - Revenue attributed by source
  - Time-to-purchase by source (Reel viewers buy faster?)

**Frontend — Organizer analytics enhancement:**
- "Reel Performance" card:
  - Total views from Reels
  - Conversions from Reels
  - Revenue from Reels
  - Conversion rate
- Source comparison chart (which source converts best)
- "Share your Reel creative" one-click download + Instagram deeplink

---

### MODULE 6.4 — PERFORMANCE HARDENING

**Deliverable**: Platform ready for high-traffic ticket drops

**What to implement:**
- Redis caching layer:
  - Cache event pages (TTL: 60 seconds)
  - Cache scene lists (TTL: 5 minutes)
  - Cache AdminSettings (TTL: 60 seconds, invalidate on update)
  - Session store for Socket.io
- Database query optimization:
  - Audit all queries for N+1 problems
  - Add compound indexes where missing
  - Pagination everywhere (no unbounded queries)
- API rate limiting (express-rate-limit):
  - 100 req/min for public endpoints
  - 300 req/min for authenticated
  - 10 req/min for payment endpoints
- Queue for ticket drops (Bull queue + Redis):
  - Purchase requests queued during high-traffic
  - Prevents overselling with distributed locks
- Image optimization:
  - All uploads compressed via Sharp.js
  - WebP conversion
  - CDN delivery via CloudFront
- Load testing (k6 or Artillery):
  - Simulate 10,000 concurrent users
  - Identify bottlenecks

---

### MODULE 6.5 — SECURITY HARDENING

**What to implement:**
- Helmet.js (HTTP security headers)
- CORS configuration (whitelist only passwale.com domains)
- SQL/NoSQL injection prevention (mongoose sanitization)
- XSS protection (DOMPurify on rich text inputs)
- CSRF tokens on all state-changing requests
- Ticket QR tamper prevention:
  - Signed JWTs as QR payload
  - Server-side verification at check-in
- PAN/Aadhaar document encryption (AES-256) in S3
- Bank details encryption in database (field-level)
- Audit every admin action (already built in Module 6.1)
- Penetration test checklist walkthrough

---

### MODULE 6.6 — MOBILE APP WRAPPING (CAPACITOR)

**Deliverable**: Android APK + iOS IPA from PWA

**What to implement:**
- Finalize Capacitor configuration:
  - App ID: `com.passwale.app`
  - Deep links: `passwale.com/e/*` → open in app
  - Push notifications plugin (capacitor-fcm)
  - Camera plugin (for QR check-in scanner)
  - Biometric auth plugin (Face ID / fingerprint)
  - NFC plugin (for NFC ticket support)
- Android:
  - Generate signed APK
  - Google Play Store listing assets
  - App icon + splash screen
- iOS:
  - Xcode project configuration
  - Apple Developer account setup
  - App Store listing assets
  - TestFlight distribution

---

### MODULE 6.7 — LAUNCH CHECKLIST

**Pre-launch:**
- [ ] All Cashfree webhooks tested in production mode
- [ ] SSL certificates on all domains
- [ ] Custom domain: passwale.com + *.passwale.com wildcard
- [ ] Monitoring: Sentry (error tracking), Datadog (performance)
- [ ] Backup: MongoDB Atlas daily backups enabled
- [ ] GDPR-style privacy policy live
- [ ] Refund policy live
- [ ] Terms of service live
- [ ] Admin seeded with correct default settings (3.69% fee)
- [ ] 6 scenes seeded with cover images
- [ ] Test event created + full purchase flow verified
- [ ] Email/SMS deliverability tested
- [ ] Push notifications tested on Android + iOS
- [ ] PWA installable on Android + iOS
- [ ] Load test passed (1,000+ concurrent)
- [ ] Security headers verified (securityheaders.com)
- [ ] Accessibility audit (WCAG 2.1 AA)

**Phase 6 Exit Criteria = LAUNCH:**
- [ ] Admin can control every pricing variable dynamically
- [ ] All 7 role dashboards functional
- [ ] Full ticket purchase flow live with Cashfree production keys
- [ ] Android + iOS apps submitted to stores
- [ ] Monitoring and alerting active
- [ ] First real event created by a real organizer

---

# DASHBOARD SUMMARY — ALL ROLES

| Dashboard | Route | Key Features |
|-----------|-------|-------------|
| Attendee | /dashboard | Feed, tickets (QR), scenes, locker, wallet, card |
| Organizer | /organizer | Events, create/edit, analytics, volunteers, payouts |
| Vendor | /vendor | Services, bookings, availability, earnings |
| Volunteer | /volunteer | Applications, shifts, history, earnings |
| Sponsor | /sponsor | Campaigns, analytics, ROI, scene sponsorship |
| Sales Partner | /sales | Referral links, commissions, leaderboard |
| Admin | /admin | Full platform control, pricing, users, financials |

---

# ADDITIONAL SUGGESTIONS FOR PASSWALE

Beyond what's in the current spec, here are features worth adding:

**1. Sales Partner Dashboard** (`/sales`)
Not in original spec but high value. DJs, influencers, campus reps get:
- Unique affiliate links per event
- Commission tracking (5-15% per ticket sold via their link)
- Leaderboard (top sellers this month)
- Payout dashboard
- Passwale handles payment, they just share links

**2. Organizer Mobile Check-in App**
The check-in scanner deserves its own dedicated flow:
- Offline-capable QR scanner
- Sync queue (scans when offline, syncs when online)
- Live attendee counter on organizer's screen
- Volunteer access (organizer grants check-in access to volunteers)

**3. Vibe Check-In (Low Effort, High Differentiation)**
During live events:
- Attendees see "Rate the vibe right now" notification
- 3 options: 🔥 / 😐 / 💀
- Organizer sees live vibe meter in their dashboard
- Post-event: Vibe timeline in analytics (energy by hour)

**4. Scene Monthly Challenges**
Admin creates challenges like:
- "Attend 3 Campus events this month → earn 500 bonus coins"
- Visible on scene pages and user dashboard
- Leaderboard for challenge participants
- Minimal backend: Just a Challenge model + cron to check completion

**5. Creator DM-to-Pass Flow**
Creators share a Passwale link in their Instagram bio/DMs:
- Link goes to a minimal landing page (like Linktree but for events)
- Shows creator's upcoming events
- Buy tickets without leaving the page
- Creator gets affiliate commission automatically
- Dashboard: `passwale.com/@username`

---

# PHASE TIMELINE SUMMARY

| Phase | Focus | Duration | Deliverable |
|-------|-------|----------|-------------|
| 1 | Foundation + Auth + DB + Admin Settings | Weeks 1–4 | Scaffold, all models, auth, pricing engine |
| 2 | Scenes + Event Creation + Discovery + Organizer Dashboard | Weeks 5–9 | Scene system, event wizard, microsites |
| 3 | Ticketing + Payments + QR + Card | Weeks 10–14 | Full buy flow, Cashfree live, QR passes |
| 4 | Loyalty + Community + Locker + Notifications | Weeks 15–20 | PassCoins, streaks, chat, photo locker |
| 5 | Volunteers + Vendors + Collections + Resale | Weeks 21–26 | Marketplace, IP pages, resale pool |
| 6 | Admin Panel + Sponsors + Performance + Launch | Weeks 27–32 | Full admin, hardening, app stores, launch |

**Total: 32 weeks (~8 months) for full platform**
**MVP (Phases 1–3): 14 weeks (~3.5 months)**

---

# ANTIGRAVITY PROMPT SEQUENCING GUIDE

When feeding into Antigravity, use this order:

**Always prepend this system context to every prompt:**
```
You are generating production-ready code for Passwale, a scene-driven 
event management SaaS platform. 
Stack: React 18 + Tailwind CSS + Node.js + Express + MongoDB (Mongoose) + Cashfree Payments.
Brand: Blue (#1D4ED8), Yellow (#FACC15), White (#FFFFFF). Font: Inter.
Platform fee: 3.69% on ALL transactions (stored in AdminSettings, never hardcoded).
All commissions are dynamic and admin-overridable.
Generate complete, working, production-ready code. No placeholders.
```

**Then add the specific module prompt.**

**After every module:**
1. Test the generated code locally
2. Fix any errors (feed error back to Antigravity with context)
3. Commit to Git before moving to next module
4. Never combine two modules in one prompt

---

*Document Version: 1.0*
*Prepared for: Passwale × Antigravity*
*Classification: Internal Development Reference*
