# PASSWALE — FEATURE FLAGS & SCOPE CONTROL
# ─────────────────────────────────────────────────────────────────────────────
# Edit this file to tell the AI agent which features to build, skip, or defer.
# Format:  [STATUS] FeatureName — description
#   STATUS options:
#     MVP    = Build NOW in MVP (Phase 1–3)
#     DEFER  = Skip for MVP, build later (Phase 4–6)
#     OFF    = Do not build (disabled entirely)
#     DONE   = Already implemented
#
# After editing, tell the agent: "Read FEATURES.md and update your plan."
# ─────────────────────────────────────────────────────────────────────────────

## ━━━ PHASE 1 — FOUNDATION ━━━

[MVP]  MonorepoScaffold          — Vite + React 18 + Express monorepo with Docker Compose
[MVP]  DatabaseModels            — All 14 Mongoose models (see list below)
[MVP]  AuthEmail                 — Email + password signup/login (JWT)
[MVP]  AuthGoogle                — Google OAuth via Passport.js
[MVP]  AuthPhoneOTP              — Phone OTP via Twilio (SMS)
[MVP]  AdminSettingsEngine       — Singleton config model; all fees stored here, NEVER hardcoded
[MVP]  PricingService            — Dynamic fee calculator (3.69% platform fee, per-organizer overrides)
[MVP]  PWAManifest               — PWA manifest + service worker (Workbox) for offline QR
[DEFER] CapacitorMobileWrapper   — Android/iOS wrapping via Capacitor.js (after web MVP)

## ━━━ DATABASE MODELS (all MVP) ━━━

[MVP]  Model_AdminSettings       — Singleton; stores platform fee, commissions, card pricing
[MVP]  Model_User                — Multi-role (attendee/organizer/vendor/volunteer/admin)
[MVP]  Model_Scene               — Cultural category with color + slug
[MVP]  Model_Event               — Full event with ticketing categories array
[MVP]  Model_Ticket              — Individual ticket with QR reference
[MVP]  Model_Transaction         — Pricing breakdown with 3.69% fee
[MVP]  Model_PassCoinTransaction — Coin ledger (earn/redeem/expire)
[MVP]  Model_Squad               — Group pass with lock deadline
[MVP]  Model_PassCollection      — Recurring event series (IP pages)
[MVP]  Model_Subscription        — Passwale Card subscription
[MVP]  Model_Payout              — Organizer/vendor/volunteer payouts
[MVP]  Model_Refund              — Refund requests and tracking
[MVP]  Model_AuditLog            — Every admin action logged
[MVP]  Model_Notification        — In-app + push notifications

## ━━━ PHASE 2 — SCENE SYSTEM & EVENT CORE ━━━

[MVP]  SceneDiscovery            — 6 seeded scenes, colorful grid, scene detail pages
[MVP]  SceneLeaderboard          — Top attendees per scene (nightly cron)
[MVP]  EventCreationWizard       — 9-step wizard for organizers
[MVP]  EventMicrosite            — Auto-generated branded pages at /e/:slug
[MVP]  EventDiscoveryPage        — Browsing with filters (scene, city, date, price, type)
[MVP]  EventSearch               — Full-text MongoDB text search
[MVP]  EventNearby               — Geospatial query for nearby events
[MVP]  OrganizerDashboardCore    — Stats, revenue chart, events list, basic analytics
[MVP]  EventAnalyticsBasic       — Traffic sources, sales over time, attendee list CSV
[DEFER] EventMapView             — Google Maps event discovery toggle
[DEFER] AutoGenerateCreatives    — Story/post creative auto-generation (canvas)
[DEFER] SceneChallenges          — Monthly scene challenges with bonus coins

## ━━━ PHASE 3 — TICKETING & PAYMENTS (CORE MVP) ━━━

[MVP]  TicketPurchaseFlow        — End-to-end buy flow (select → price breakdown → Cashfree → QR)
[MVP]  CashfreeIntegration       — UPI, cards, net banking, wallets (sandbox first)
[MVP]  WebhookIdempotency        — Deduplicate Cashfree webhook events (no duplicate tickets)
[MVP]  QRCodeGeneration          — Unique signed QR per ticket (uploaded to S3)
[MVP]  DynamicQRRefresh          — QR signed JWT expires every 30s (anti-screenshot)
[MVP]  TicketWallet              — /dashboard/tickets — Upcoming/Past/Cancelled with QR viewer
[MVP]  CheckInScanner            — Camera QR scanner for organizers/volunteers at entry
[MVP]  PasswaleCardSubscription  — Plus/Pro card purchase, management, benefits activation
[MVP]  CardBenefitsAtCheckout    — Discount + subsidy logic applied during ticket purchase
[MVP]  SquadPasses               — Group ticket with social lock-in and shareable link
[DEFER] AppleGoogleWallet        — Add ticket to Apple/Google Wallet
[DEFER] NFCTicketTransfer        — NFC tap to share ticket
[DEFER] TicketResalePool         — Resale at original price (Phase 5)
[DEFER] Waitlist                 — Waitlist with priority tiers (Phase 5)

## ━━━ PHASE 4 — LOYALTY & COMMUNITY ━━━

[DEFER] PassCoinsEngine          — Earn/redeem/gift coins, multipliers per card tier
[DEFER] SceneStreaksAndBadges    — Gamification: streaks, badge milestones, perks
[DEFER] EventChatRooms           — Socket.io live chat per event
[DEFER] EventPolls               — Real-time polls during event
[DEFER] EventQnA                 — Attendee Q&A with upvotes
[DEFER] DigitalEventLocker       — Photo gallery with face-match tagging per event
[DEFER] PushNotifications        — FCM push notifications (in-app + push)
[MVP]   EmailNotifications        — SendGrid transactional emails (purchase, reminders)
[MVP]   SMSNotifications          — Twilio SMS for critical alerts (purchase confirmation)

## ━━━ PHASE 5 — MARKETPLACE ━━━

[DEFER] VolunteerMarketplace     — Volunteer hiring + escrow payment
[DEFER] VendorSystem             — Vendor booking and management
[DEFER] PassCollections          — IP/branded pages for recurring event series
[DEFER] SeasonPass               — Season pass purchase for collections
[DEFER] ResalePool               — Fair resale at original price
[DEFER] WaitlistPriority         — Waitlist with paid priority spots

## ━━━ PHASE 6 — ADMIN, ANALYTICS, LAUNCH ━━━

[MVP]  AdminPricingPanel         — Full dynamic pricing dashboard (/admin/pricing)
[MVP]  AdminUserManagement       — User table, role management, block/unblock
[MVP]  AdminEventManagement      — All events, approve/reject, cancel
[MVP]  AdminOrganizerOverrides   — Per-organizer commission override
[MVP]  AdminFinancials           — Revenue overview, pending payouts, refund queue
[MVP]  AdminAuditLogs            — Every admin action logged with before/after
[DEFER] AdminSponsorDashboard    — Sponsor campaign management + analytics
[DEFER] AdminSceneManagement     — Scene treasury, ambassador assignment
[DEFER] AdminPassCoinControl     — Coin liability dashboard, manual ops
[DEFER] RedisCache               — Cache layer for events, scenes, AdminSettings
[DEFER] BullQueue                — Queue for high-traffic ticket drops (anti-oversell)
[DEFER] LoadTesting              — k6/Artillery load test (1k+ concurrent)
[DEFER] SponsorDashboard         — Sponsor-facing campaign tools
[DEFER] ReelAnalytics            — UTM/reel-to-ticket conversion tracking

## ━━━ ADDITIONAL FEATURES (Post-MVP) ━━━

[DEFER] SalesPartnerDashboard    — Affiliate links, commission tracking, leaderboard for DJs/influencers
[DEFER] VibeCheckIn              — Live vibe meter during events (🔥/😐/💀)
[DEFER] CreatorDMToPass          — Creator bio link → event landing page
[DEFER] BiometricAuth            — Face ID / fingerprint login (Capacitor)
[DEFER] OfflineCheckinSync       — Scan queue for offline check-in sync

## ━━━ BRAND / GLOBAL CONFIG ━━━
# Do NOT change these unless rebranding

BRAND_PRIMARY_COLOR   = #1D4ED8
BRAND_ACCENT_COLOR    = #FACC15
BRAND_BG_COLOR        = #FFFFFF
BRAND_FONT_PRIMARY    = Inter
BRAND_FONT_DISPLAY    = Space Grotesk
PLATFORM_FEE_DEFAULT  = 3.69
CURRENCY              = INR
PAYMENT_GATEWAY       = Cashfree
STORAGE               = AWS S3
REALTIME              = Socket.io
AUTH_PROVIDERS        = email,google,phone-otp
