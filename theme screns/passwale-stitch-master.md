# PASSWALE — STITCH MASTER PROMPT + SCREEN INVENTORY
> Feed this file to Stitch. Every screen maps to the implementation plan phases.
> Design system: Kinetic Neo-Brutalism · Montserrat · Navy + Yellow + White

---

## STITCH SYSTEM PROMPT (Prepend to every Stitch session)

```
You are designing Passwale — a scene-driven youth event OS for India.

DESIGN SYSTEM (NON-NEGOTIABLE):
- Style: Kinetic Neo-Brutalism
- Font: Montserrat exclusively (800-900 weight for headlines, 400-500 for body)
- Colors: Navy #1B1F2B (borders, shadows, text), Yellow #FCD34D (CTAs, highlights, active states), White #FFFFFF (backgrounds, cards)
- Borders: 2px solid Navy minimum on all interactive containers, 3-4px on hero elements
- Shadows: Hard offset only — 4px or 8px offset in Navy #1B1F2B at 100% opacity. NO blur, NO soft shadows.
- Corner radius: 8px buttons/inputs, 16px cards, pill (9999px) for scene tags/badges
- Layout: 8px grid. Desktop: 64px outer margins. Mobile: 16px margins.
- Cards: White bg, 2-3px Navy border, 4-8px hard Navy shadow. Yellow cards for promos/highlights.
- Buttons PRIMARY: Yellow bg, 2px Navy border, 4px hard Navy shadow, Bold Navy text. On click: shadow removed, element shifts 4px down-right.
- Buttons SECONDARY: White bg, 2px Navy border, no shadow until hover.
- Labels: UPPERCASE for functional labels (ticket types, roles, status badges)
- Inputs: White or Yellow bg, 2px Navy border. Active: 3px border + 2px hard shadow.
- Chips/Tags: Rectangular, 4px radius, high contrast (Navy bg + White text OR Yellow bg + Navy text)
- Dividers: 2px solid Navy between list items and card sections
- Scene colors: Techno=#6D28D9, Bollywood=#DC2626, Garba=#D97706, Campus=#2563EB, Comedy=#059669, Startup=#0891B2
- Mobile-first. Every screen must work at 390px width.
- Brand mark: PASSWALE in Montserrat 900 weight, tracked wide.

TONE: Bold, direct, culture-first. Not corporate. Feels like a festival poster meets a SaaS dashboard.
```

---

## SCREEN INVENTORY — 87 SCREENS TOTAL

Organized by role and flow. Feed each GROUP as one Stitch prompt session.

---

# GROUP 1 — PUBLIC / MARKETING PAGES (8 screens)

**Stitch Prompt:**
```
Design Passwale public marketing pages. Scene-driven event OS for Indian youth.
Apply full Kinetic Neo-Brutalism design system.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 1.1 | **Landing / Home** | Hero with "The OS for Youth Culture" headline, scene pills row, trending events strip, how-it-works 3-step, social proof (event count, cities), CTA: Get Started + Host an Event |
| 1.2 | **Scene Discovery Page** | 6 scene cards in colorful grid (each card uses scene color as dominant), stats per scene (events, community size), CTA to join each scene |
| 1.3 | **Scene Detail Page** | Full-width scene cover with color overlay, upcoming events grid, leaderboard top 10, scene ambassador profiles, streaks display, "Join Scene" button |
| 1.4 | **All Events / Browse** | Filter bar (scene chips, city, date, price range, type toggle), event card grid (3-col desktop, 1-col mobile), map view toggle, infinite scroll |
| 1.5 | **Event Microsite** (`/e/:slug`) | Full-screen hero cover, countdown timer, quick info bar (date/venue/scene badge), lineup carousel, ticket categories with live availability, sticky "Get Tickets" CTA bar, share buttons (WhatsApp + IG story link), download creative button |
| 1.6 | **Pass Collection Page** (`/collections/:slug`) | Collection brand header, season pass CTA, upcoming events list, past events archive (aftermovies + past lineups), "Follow Collection" button, early access sign-up |
| 1.7 | **Creator Profile Page** (`/@username`) | Creator avatar + bio, upcoming events grid, "DM → Pass" style shareable link cards, follower count, scene badges |
| 1.8 | **Squad Join Page** (`/squad/:squadId`) | Event info header, member slots (avatar circles, empties show "waiting"), countdown to lock deadline, discount meter (activates at minimum), "Join Squad" CTA |

---

# GROUP 2 — ONBOARDING & AUTH (6 screens)

**Stitch Prompt:**
```
Design Passwale onboarding and authentication screens.
5-step signup wizard. Mobile-first. Neo-Brutalism design system.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 2.1 | **Login Page** | Email/password form, Google OAuth button, Phone OTP tab, "Forgot password" link, PASSWALE wordmark top center |
| 2.2 | **Signup — Step 1: Account** | Name, email, password fields, role selection chips (Attendee / Organizer / Vendor / Volunteer — multi-select), progress bar (Step 1 of 5) |
| 2.3 | **Signup — Step 2: Scene Preferences** | Scene grid (6 colored tiles, click to select), minimum 3 required counter, selected scenes show checkmark, "Why we ask this" tooltip |
| 2.4 | **Signup — Step 3: Profile Photo** | Drag-drop upload zone, crop tool preview, skip option (greyed, with consequence note for face-match locker) |
| 2.5 | **Signup — Step 4: Verify Email** | Email sent illustration, resend button, "Already verified? Continue" CTA |
| 2.6 | **Forgot / Reset Password** | Email input → sent confirmation → new password form |

---

# GROUP 3 — ATTENDEE DASHBOARD (12 screens)

**Stitch Prompt:**
```
Design Passwale attendee dashboard screens. User is logged in.
Culture-first, mobile-first. Full Neo-Brutalism system.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 3.1 | **Attendee Home Feed** | Scene-personalized event cards, "Your Scenes" quick filter strip, squad activity feed, upcoming events countdown cards, PassCoins balance chip top-right |
| 3.2 | **My Tickets — Upcoming** | Ticket cards (event cover as blurred bg, event name, date, venue, ticket type, status ACTIVE badge), tap to open QR |
| 3.3 | **Ticket Detail / QR Pass** | Large dynamic QR code (center), ticket number, holder name, entry slot time, Add to Wallet button, Download PDF, Transfer button, event info below |
| 3.4 | **My Tickets — Past** | Same layout, status USED badge, link to event locker photos |
| 3.5 | **Scene Dashboard** | Per-scene cards showing: streak count + fire emoji, next badge progress ring, badges earned (glow) vs locked (grey), scene leaderboard rank |
| 3.6 | **PassCoins Wallet** | Balance (large animated number), earning rate by card tier, transaction history list (earned/redeemed rows), redemption slider (₹1 = 10 coins), referral link section, Gift Coins to friend |
| 3.7 | **Passwale Card Page** | Visual card render per tier (White=Free / Blue gradient=Plus / Dark=Pro / Black=Black), benefits comparison table, monthly/annual toggle with savings display, upgrade CTA, usage stats (total saved, early access used), billing history |
| 3.8 | **Digital Event Locker** | Events attended grid, per-event gallery view, "My Photos" tab (face-matched, blue border), "All Photos" tab, aftermovie player, download + share to IG buttons |
| 3.9 | **My Squads** | Active squads with member count + countdown, past squads, create new squad CTA |
| 3.10 | **Notifications** | Bell icon with unread count, dropdown list grouped by date (ticket confirmed / squad joined / waitlist available / PassCoins earned), mark all read, preferences link |
| 3.11 | **Notification Preferences** | Toggle grid: In-app / Email / SMS / Push per notification type |
| 3.12 | **Profile & Settings** | Avatar, username, bio, scenes edit, privacy controls (photo visibility, discoverability), account settings, role switcher |

---

# GROUP 4 — TICKET PURCHASE FLOW (5 screens)

**Stitch Prompt:**
```
Design Passwale ticket purchase modal/flow. 5 steps.
Show pricing breakdown with 3.69% platform fee. PassCoins earned shown.
Neo-Brutalism design. Mobile-first.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 4.1 | **Step 1: Select Tickets** | Ticket categories list (name, price, availability bar, max-per-order), quantity selector per category, squad pass toggle, live availability counter (< 20% = "Only X left!" in red) |
| 4.2 | **Step 2: Pricing Breakdown** | Itemized receipt style — Base price, Card discount (green, if applicable), Subtotal, Platform fee 3.69%, TOTAL in bold, PassCoins you'll earn, upgrade nudge if free tier |
| 4.3 | **Step 3: Buyer Details** | Name, email, phone confirm, optional squad creation (if squad pass selected), share squad link |
| 4.4 | **Step 4: Payment (Cashfree)** | Cashfree SDK embed area, UPI/Card/Wallet tabs, security trust signals (encrypted badge), order summary sidebar |
| 4.5 | **Step 5: Success Screen** | Ticket QR preview, "View in My Tickets" CTA, "Share to Stories" button, PassCoins earned animation, squad status if applicable |

---

# GROUP 5 — ORGANIZER DASHBOARD (15 screens)

**Stitch Prompt:**
```
Design Passwale organizer dashboard. Data-heavy but culture-driven.
Organizer manages events, analytics, volunteers, payouts.
Neo-Brutalism. Left sidebar nav on desktop, bottom nav on mobile.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 5.1 | **Organizer Home** | Stats row (Total events / Active / Revenue / Tickets this month), Revenue chart (6-month bar), Recent sales feed, Pending actions card (volunteer applications, vendor requests), Quick action buttons |
| 5.2 | **Events List** | Tabs (All / Published / Draft / Past / Cancelled), Table: event name, date, sold/capacity progress bar, revenue, status badge, Actions (Edit / Duplicate / Analytics / Cancel) |
| 5.3 | **Event Creation — Step 1: Basics** | Event name + slug preview, short description (200 char counter), rich text editor, scene multi-select chips, tags autocomplete |
| 5.4 | **Event Creation — Step 2: Type & Date** | Type selector (Free/Paid/Donation/Hybrid as large icon buttons), date range picker, time pickers, location type (Physical/Virtual/Hybrid), Google Places input |
| 5.5 | **Event Creation — Step 3: Media** | Cover image drag-drop + crop, gallery upload (10 images grid), video URL input, auto-generate creatives toggle (story 1080x1920, post 1080x1080) |
| 5.6 | **Event Creation — Step 4: Lineup** | Repeatable performer cards (name, role, photo, time), drag to reorder handle, add performer CTA |
| 5.7 | **Event Creation — Step 5: Tickets** | Global capacity input, ticket category builder (repeatable): name, price, quantity, sale dates, squad pass toggle, time-slot builder, Passwale Card benefits collapsible (per-tier discount % sliders, live preview: "Plus members save ₹X"), resale pool toggle, waitlist toggle |
| 5.8 | **Event Creation — Step 6: Rules & Community** | Dress code, age restriction, prohibited items tags, guidelines, enable chat/polls/Q&A toggles |
| 5.9 | **Event Creation — Step 7: Review & Publish** | Full event summary, microsite URL preview (eventslug.passwale.com), visibility selector (Public/Private/Invite-only), Save Draft / Publish buttons |
| 5.10 | **Event Analytics** | Overview cards (sold, revenue gross/net, conversion rate), Traffic sources donut (Reel/Story/WhatsApp/Direct), Sales funnel (views→ticket→checkout→purchased), Sales timeline chart, Ticket category breakdown, Reel Performance card (views→conversions→revenue), Attendee list + CSV export |
| 5.11 | **Check-in Scanner** | Camera QR scanner (full screen), Green flash = valid / Red flash = invalid, attendee name + ticket type shown on scan, live counter (checked in / total), manual ticket number input fallback, volunteer grant access toggle |
| 5.12 | **Volunteer Management** | Post positions form (role, hours, pay), applications inbox (volunteer card: photo, skills, rating, punctuality score, Accept/Reject), hired list with payment escrow status |
| 5.13 | **Vendor Management** | Browse vendors by category, vendor card (services, rating, availability), request booking CTA, active bookings list |
| 5.14 | **Organizer Payouts** | Wallet balance, Available / Pending / Escrow breakdown, payout history table, Request Payout button → bank/UPI, invoice download |
| 5.15 | **Organizer Profile & Brand** | Brand logo upload, description, social links, verified badge status, active pass collections list, ratings & reviews display |

---

# GROUP 6 — VOLUNTEER DASHBOARD (5 screens)

**Stitch Prompt:**
```
Design Passwale volunteer dashboard. Volunteer finds gigs, gets hired, gets paid.
Neo-Brutalism. Mobile-first (volunteers are always on-ground).
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 6.1 | **Volunteer Home** | Upcoming shifts calendar view, available positions near me, earnings summary (Pending escrow / Available / Total withdrawn) |
| 6.2 | **Browse Positions** | Filter: Scene / Date / Role type / Min payment, Position cards (event name, organizer, role, payment, hours, apply CTA) |
| 6.3 | **My Applications** | Tabs: Applied / Accepted / Rejected. Per application: event, role, status, organizer contact if accepted, escrow amount |
| 6.4 | **Volunteer Profile Builder** | Skills multi-select, scene expertise, availability calendar, portfolio links, preferred payout method (UPI/bank), past events worked, rating display |
| 6.5 | **Volunteer Earnings & Withdrawal** | Earnings breakdown, escrow status per event, Withdraw button → UPI transfer, withdrawal history |

---

# GROUP 7 — VENDOR DASHBOARD (4 screens)

**Stitch Prompt:**
```
Design Passwale vendor dashboard. Vendors offer services (photography, catering, decor, AV).
Neo-Brutalism. Clean service-business feel within the bold design system.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 7.1 | **Vendor Home** | Booking requests inbox, confirmed upcoming bookings calendar, earnings summary |
| 7.2 | **Vendor Profile** | Services offered (repeatable cards with name, price range, description), portfolio gallery, availability calendar, documents & compliance upload |
| 7.3 | **Booking Management** | Requests (Accept/Reject with reason), Confirmed bookings (event details, organizer contact, payment status), Completed (with review prompt) |
| 7.4 | **Vendor Earnings** | Revenue by month chart, commission deduction breakdown, payout history, request payout |

---

# GROUP 8 — SPONSOR DASHBOARD (4 screens)

**Stitch Prompt:**
```
Design Passwale sponsor dashboard. Brands sponsor events and scenes.
ROI-focused analytics. Neo-Brutalism. Corporate-within-youth-culture feel.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 8.1 | **Sponsor Home** | Active campaigns overview, total impressions / clicks / leads / ROI cards, scene sponsorship opportunities |
| 8.2 | **Campaign Manager** | Create campaign form (creative upload, budget, event associations), active campaigns with performance bars, pause/edit controls |
| 8.3 | **Sponsor Analytics** | Impressions timeline, click-through rate, lead count, cost-per-impression, event-level breakdown table, ROI summary card |
| 8.4 | **Scene Sponsorship** | Available scenes to sponsor, sponsorship tier cards (Gold/Silver/Bronze pricing), application form, status tracker |

---

# GROUP 9 — SALES PARTNER DASHBOARD (3 screens)

**Stitch Prompt:**
```
Design Passwale sales partner dashboard. Campus reps, DJs, influencers earn commissions selling tickets via affiliate links.
Neo-Brutalism. Leaderboard-first design to drive competition.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 9.1 | **Sales Partner Home** | My affiliate links list (per event), tickets sold this month, commission earned, leaderboard rank badge |
| 9.2 | **Leaderboard** | Top sellers this month (rank, name, scene, tickets sold, commission), animated rank change indicators, user's own rank highlighted |
| 9.3 | **Earnings & Payouts** | Commission breakdown by event/link, pending vs cleared, payout request, referral history |

---

# GROUP 10 — ADMIN PANEL (12 screens)

**Stitch Prompt:**
```
Design Passwale super-admin control panel. Full platform control.
Data-dense, power-user UI. Neo-Brutalism but information-first.
Left sidebar with all admin sections. Tables, audit logs, override controls.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 10.1 | **Admin Dashboard** | GMV, Revenue, Active Users, Events This Month cards. Revenue by stream chart (commissions vs subscriptions vs fees). Recent high-value transactions. System health indicators. |
| 10.2 | **User Management** | Searchable user table (role/status/tier filters), User detail drawer (full profile, role management, PassCoins manual adjust, block/unblock, transaction history, impersonate button) |
| 10.3 | **Event Management** | All events table, Pending approval queue, Approve/Reject with reason modal, Feature/unfeature toggle, Cancel event → triggers refunds |
| 10.4 | **Organizer Management** | Organizer table (verification status, tier, GMV), Verification queue (review documents), Per-organizer commission override modal (current rate, set custom %, reason field, reset to default) |
| 10.5 | **Pricing Control** | Platform fee input (3.69% default, live example calc), Commission tiers table (5 tiers inline edit), Volunteer fee, Vendor commission, Passwale Card pricing (Plus/Pro monthly+annual), Card subsidy split slider (platform % + organizer % must = 100%), Resale fees, PassCoins earning rates |
| 10.6 | **Scene Management** | Scene table (edit name, color, description, cover), Feature/deactivate, Assign ambassador, Scene treasury balance |
| 10.7 | **Financial Overview** | Revenue by stream, GMV trend, Pending payouts table (Organizer / Volunteer / Vendor tabs with Approve buttons), Payout history, Refund requests queue (approve → Cashfree refund) |
| 10.8 | **PassCoins Control** | Total coins issued / redeemed / outstanding liability. Manual coin add/deduct for any user with reason. Bulk expire controls. Earning rate overrides. |
| 10.9 | **Passwale Card Control** | MRR, churn, tier distribution chart. Manual tier assignment (upgrade to Black/invite-only). Subscription analytics. |
| 10.10 | **Audit Log** | Full log table: admin name, action, target entity, before/after values, timestamp, IP. Filters by admin, action type, date range. CSV export. |
| 10.11 | **Support & Disputes** | User-submitted issues list, Flagged events queue, Dispute resolution (buyer vs organizer), Announcement composer (send to all/by role/by scene) |
| 10.12 | **Platform Settings** | Event approval toggle, Auto-approve verified organizers toggle, Max ticket price, Feature flags (scenes, squad passes, volunteer marketplace, etc.), Cashfree sandbox↔production toggle, Email template editor |

---

# GROUP 11 — COMMUNITY & ENGAGEMENT SCREENS (5 screens)

**Stitch Prompt:**
```
Design Passwale event community and engagement screens.
Live chat, polls, Q&A, gamification. Feels like Discord meets a festival app.
Neo-Brutalism design system.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 11.1 | **Event Community Chat** | WhatsApp-style bubbles, organizer announcements pinned at top, online count, message input with emoji, moderator delete/mute options |
| 11.2 | **Live Polls** | Active poll cards with real-time vote bars, vote button, results percentage, organizer creates new poll CTA |
| 11.3 | **Q&A Board** | Questions sorted by upvotes, upvote button, organizer "answered" badge, submit question input |
| 11.4 | **Scene Leaderboard** | Month's top attendees, streak fire icons, badge icons, city filter, user's own rank card at bottom |
| 11.5 | **Scene Challenges** | Active challenges list (attend 3 Campus events this month → 500 coins), progress bar, participants count, leaderboard tab, completed challenges with reward received |

---

# GROUP 12 — RESALE & WAITLIST (3 screens)

**Stitch Prompt:**
```
Design Passwale fair resale and waitlist screens.
Tickets resold at original price only. Waitlist with priority tiers.
Neo-Brutalism. Trust and fairness is the visual message.
```

| # | Screen Name | Key Elements |
|---|-------------|--------------|
| 12.1 | **Resale Pool** (on event page) | "X tickets available at original price" section, resale ticket cards (category, original price, available from), Buy from Resale CTA, "List My Ticket for Resale" option |
| 12.2 | **Waitlist Join** | Sold out banner, 3 waitlist tiers (Free spot / Priority ₹99 / Guaranteed ₹299) as cards, your position in queue once joined, notification preference for alert |
| 12.3 | **Waitlist Status** | Queue position ("You are #23"), estimated wait, upgrade tier button, leave queue option, event info reminder |

---

## STITCH SESSION GUIDE

Feed groups in this order for best output:

1. Start with **Group 1 (Public Pages)** — sets the visual language
2. Then **Group 2 (Onboarding)** — establishes the interaction pattern
3. Then **Group 4 (Purchase Flow)** — the money flow, most critical
4. Then **Group 3 (Attendee Dashboard)** — largest user base
5. Then **Group 5 (Organizer Dashboard)** — most complex, most screens
6. Then Groups 6, 7, 8, 9 in any order (secondary roles)
7. Then **Group 10 (Admin)** — last, references all other screens
8. Then Groups 11, 12 (community + resale)

---

## PER-SESSION STITCH PROMPT TEMPLATE

```
[PASTE SYSTEM PROMPT FROM TOP OF THIS FILE]

Now design the following screens for Passwale:

[PASTE GROUP HEADING + TABLE]

Additional constraints for this group:
- [Add any group-specific notes from the Key Elements column]
- Mobile breakpoint: 390px
- Export each screen as a separate frame
- Name frames exactly as shown in the Screen Name column
```

---

## COMPONENT LIBRARY (Build these first in Stitch)

Before generating screens, build these reusable components:

| Component | Description |
|-----------|-------------|
| **Event Card** | Cover image, scene color strip, name, date, venue, organizer, price, "Only X left" indicator, Card member badge |
| **Scene Pill/Tag** | Pill shape, scene color bg, white text, scene icon |
| **Ticket Card** | Event cover bg (blurred), event name, date, ticket type, status badge |
| **QR Pass** | Large QR, ticket number, holder name, slot time, action buttons |
| **Pricing Breakdown** | Receipt-style itemized list, green discount row, bold total, PassCoins earned |
| **Squad Widget** | Avatar circles row (filled + empty), countdown timer, discount meter, share button |
| **PassCoin Chip** | Yellow bg, coin icon, balance, Navy border |
| **Scene Streak Card** | Scene color, fire icon, streak count, next badge progress ring |
| **Passwale Card (Free)** | White card, basic info, upgrade CTA |
| **Passwale Card (Plus)** | Blue gradient card, benefits list |
| **Passwale Card (Pro)** | Dark Navy premium card, premium benefits |
| **Stat Card (Dashboard)** | Label (muted, uppercase), large number, trend indicator |
| **Nav Sidebar (Desktop)** | PASSWALE wordmark, nav items with icons, active = Yellow bg |
| **Bottom Nav (Mobile)** | 5 icons, active = Yellow underline |
| **Primary Button** | Yellow bg, Navy border, hard Navy shadow, press-down state |
| **Secondary Button** | White bg, Navy border, hover state |
| **Hard Shadow Card** | White bg, 2px Navy border, 4px offset Navy shadow |
| **Yellow Highlight Card** | Yellow bg, Navy border, Navy text |
| **Scanner UI** | Dark bg, camera viewfinder, green/red flash states |
| **Organizer Verify Badge** | Navy bg, white checkmark, "VERIFIED" uppercase label |

---

## TOTAL SCREEN COUNT: 87 screens across 12 groups + 20 components
