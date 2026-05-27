# BASE Automation System — Setup Guide

Everything BASE needs to automate visitor → tour → booking → event → post-event, plus the two AI agents (BASE Bot for visitors, Baily for Chris). All artifacts live in this folder.

## What's in here

```
automations/
├── README.md                          ← you are here
├── knowledge-base/
│   └── base-knowledge-base.md         ← single source of truth for both bots
├── bots/
│   ├── base-bot-system-prompt.md      ← visitor-facing concierge prompt
│   └── baily-system-prompt.md         ← internal Chris-assistant prompt
├── emails/
│   ├── README.md
│   ├── 01-inquiry-instant.md          ← email templates by lifecycle
│   ├── 02-inquiry-followup-24h.md
│   ├── 03-inquiry-followup-3d.md
│   ├── 04-tour-sequence.md
│   ├── 05-booking-sequence.md
│   └── 06-recovery-and-lifecycle.md
├── sms/
│   ├── README.md
│   └── sms-sequences.md
└── workflows/
    └── blueprints.md                  ← step-by-step GHL workflow recipes
```

## The flow at a glance

```
 Visitor on basewilmington.com
        │
        ▼
 BASE Bot answers questions (web chat / SMS / DMs)
        │  uses → base-knowledge-base.md
        ▼
 Visitor submits inquiry / books tour / books space
        │
        ▼
 /api/inquiry (Next.js) → GHL creates contact with tags
        │   tags: base-website, event-inquiry, space-<id>, sms-opt-in, etc.
        ▼
 GHL Workflows fire (W01–W09 from blueprints.md)
        │   • Email + SMS sequences run automatically
        │   • Baily alerts Chris with a one-tap draft reply
        ▼
 Chris confirms (tag: booking-confirmed)
        │
        ▼
 Event lifecycle workflow runs (W03)
   reminders → day-of → thank-you → review request
        │
        ▼
 Visitor becomes repeat customer / member / referrer
```

## Setup order (do exactly once)

### 1. Verify the website piece

The website already does its part:

- **Live availability map** (`/map`) — colors rooms by GHL free-slots
- **Per-room booking widgets** — each space points at its dedicated calendar
- **Inquiry API** (`/api/inquiry`) — creates contacts with the exact tags the workflows need

Smoke test: submit the form on `/book?space=main-hall`, then in GHL → Contacts confirm the contact was created with the right tags (`base-website`, `event-inquiry`, `space-main-hall`).

### 2. Set up the tag taxonomy in GHL

Open `automations/workflows/blueprints.md` → "Tag taxonomy" table. Create each tag in GHL → Tags. They're case-sensitive — copy exactly.

### 3. Create custom fields in GHL

In GHL → Settings → Custom Fields, create:
- `event_type` (text)
- `desired_date` (date)
- `guest_count` (number)
- `space_interest` (text)
- `budget_range` (text)
- `event_date` (date)
- `event_time` (text)
- `loadin_time` (text)
- `strike_time` (text)
- `membership_tier` (dropdown: creator, founder, studio)
- `monthly_credits` (number)
- `member_discount` (number)
- `renewal_date` (date)
- `renewal_amount` (currency)
- `credits_used` (number)
- `referred_name` (text)
- `referral_action` (text)
- `credit_amount` (text)
- `lifetime_credit_hours` (number)
- `available_credit` (number)
- `next_milestone_text` (text)
- `referral_link` (URL)
- `organization` (text)
- `appointment.start_date_time`, `appointment.start_time` — GHL provides these natively for calendar workflows

### 4. Paste the knowledge base into GHL Conversation AI

GHL → Conversation AI → Knowledge Bases → New.
- **Title:** "BASE — Master Knowledge Base"
- **Body:** paste contents of `knowledge-base/base-knowledge-base.md`
- Optionally split sections into separate documents (Spaces, Booking, Membership, Policies, FAQ) for better retrieval.

### 5. Configure BASE Bot (public-facing)

GHL → Conversation AI → Bots → BASE Bot (or create one if missing).
- **System Prompt:** paste contents of `bots/base-bot-system-prompt.md`
- **Knowledge Source:** select the KB you just created
- **Channels enabled:** Website Chat, SMS, Facebook DMs, Instagram DMs
- **Handoff:** route to Chris's GHL user when "needs human" trigger fires (see prompt's "Handoff" section)

### 6. Configure Baily (Chris-only)

GHL → Conversation AI → Bots → Baily.
- **System Prompt:** paste contents of `bots/baily-system-prompt.md`
- **Audience:** internal staff conversations only (NOT website chat)
- **Triggers:**
  - New contact created with tag `event-inquiry` → Baily drafts reply
  - Daily 07:30 ET cron → morning brief
  - Daily 17:30 ET cron → evening wrap
  - Calendar conflict detected → alert Chris

### 7. Paste email templates into GHL

For each file in `emails/` (excluding README), copy the **Subject** and **Body** sections into GHL → Marketing → Emails → Templates. Name each template with the file's number prefix (e.g., "01 — Inquiry Instant") for easy lookup.

### 8. Build the workflows

Follow `workflows/blueprints.md` for the step-by-step recipe for each of W01–W09. Build them one at a time; smoke-test each with a fake contact before moving on.

### 9. Confirm Vercel env

In Vercel → BASE project → Settings → Environment Variables, confirm `GHL_PIT_TOKEN` is set for Production, Preview, AND Development. Redeploy to make sure functions pick it up.

### 10. End-to-end smoke test

- Submit a test inquiry from the live site
- Confirm contact appears in GHL with correct tags
- Confirm `01-inquiry-instant` email sends within 60 seconds
- Cancel the workflow before the 24h follow-up fires so you don't spam your test contact
- Repeat for tour and partner forms

## Maintenance discipline

When ANY of these change, update the KB and re-sync in GHL:
- **Spaces / capacities / amenities** → `src/data/spaces.ts` AND `knowledge-base/base-knowledge-base.md`
- **Calendar IDs** → `src/data/config.ts` AND KB
- **Pricing** → KB only (the website doesn't quote yet)
- **Policies (cancellation, alcohol, insurance, accessibility)** → KB
- **Membership pricing / perks** → `src/data/membership.ts` AND KB
- **Referral rewards** → `src/data/referral.ts` AND KB

## Open items (Chris's decisions)

1. **Final pricing** — fill in real per-room rates in section 9 of the KB. The bot currently says "Chris will confirm your quote within one business day."
2. **Sender reputation** — warm up the sending domain in GHL before the email volume increases. Send 5–10 manual emails per day from the BASE domain for the first 2 weeks.
3. **BASE Community (GHL Communities)** — create the community group(s) in GHL → Communities. Suggested structure:
   - **#general** — open to all members
   - **#bookings-and-credits** — Q&A about scheduling
   - **#founder-channel** — Founder + Studio tier only (gated)
   - **#partners-and-collabs** — open marketplace for member-to-member collab
   Capture the join link and store it as the GHL custom field `community_join_link` on each new member contact (used by the `15-membership-welcome` email).
4. **Google review link** — replace `{{location.google_review_link}}` placeholder once you've got the live link from Google Business Profile. ✏️ *Chris is handling this.*
5. **Peerspace review link** — replace `{{location.peerspace_review_link}}` placeholder once the BASE Peerspace listing is live. Store the short link version in `peerspace_review_short_link` for SMS.
6. **Newsletter cadence** — confirm 1st-of-month vs another rhythm.

## Where to extend next

When you outgrow the basics:
- **Move Baily's morning brief to a real cron** in `src/app/api/baily/morning-brief/route.ts` (calls GHL API, posts to Chris)
- **Add a calendar-conflict watcher** — script in `scripts/check-conflicts.mjs` that runs daily
- **Stripe-driven membership tags** — replace the manual `member-new` tag with a Stripe webhook
- **Vercel Workflow** — for very long sequences (e.g., 90-day onboarding programs) we'd graduate from GHL workflows to durable Vercel Workflow code
