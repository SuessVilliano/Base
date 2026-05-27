# BASE — GHL Workflow Blueprints

Step-by-step UI recipes for every BASE workflow. Build these in GHL → Automation → Workflows.

Each workflow lists: **trigger → steps → exit conditions**. Match the tag names exactly so `/api/inquiry` and the Baily/Bot triggers line up.

## Tag taxonomy (use these EXACTLY)

| Tag | Set by | Means |
|---|---|---|
| `base-website` | `/api/inquiry` | Came from the BASE website (always set) |
| `event-inquiry` | `/api/inquiry` | Main event form |
| `tour-request` | `/api/inquiry` | Tour form |
| `partner-inquiry` | `/api/inquiry` | Partner form |
| `space-<id>` | `/api/inquiry` | e.g., `space-main-hall`, `space-podcast-room` |
| `tour-booked` | GHL appointment trigger | Tour calendar appointment created |
| `booking-confirmed` | Manual (Chris) | Contract + deposit received |
| `member-new` | Membership purchase trigger | Just paid for membership |
| `referral-credit-earned` | Referral workflow | Credit added to account |
| `sms-opt-in` | Form opt-in checkbox | OK to text |
| `availability-alerts` | Member portal | Wants peak-weekend opening alerts |
| `do-not-contact` | Manual + STOP reply | Stop all comms |

---

## W01 — Instant Inquiry Confirmation

**Trigger:** Contact tag added → `event-inquiry`

**Steps:**
1. **Wait** — 60 seconds (lets `/api/inquiry` finish creating the contact + custom fields)
2. **Send Email** — template `01-inquiry-instant`
3. **If/Else** — Has tag `sms-opt-in`?
   - **Yes** → **Send SMS** — template `S01`
   - **No** → skip
4. **Internal Notification** — to Chris's GHL inbox: "New BASE inquiry — {first_name} {last_name} — {event_type} — {desired_date}"
5. **Wait** — 24 hours
6. **If/Else** — Has tag `tour-booked` OR `booking-confirmed` OR `staff-replied`?
   - **Yes** → end workflow
   - **No** → **Send Email** — template `02-inquiry-followup-24h`
7. **Wait** — 2 days (so total = 3d from inquiry)
8. **If/Else** — same condition
   - **Yes** → end
   - **No** → **Send Email** — template `03-inquiry-followup-3d`
9. **Wait** — 27 days (so total = 30d from inquiry)
10. **If/Else** — Has tag `booking-confirmed` OR `do-not-contact`?
    - **No** → **Send Email** — template `14-stale-lead-30d`
    - **Yes** → end

**Exit conditions:** Tag `booking-confirmed` set, or tag `do-not-contact` set.

---

## W02 — Tour Lifecycle

**Trigger:** Appointment created on the "Schedule a Tour" calendar (`iXn95c5zJYEHFLjQ0GJR`)

**Steps:**
1. **Add tag** — `tour-booked`
2. **Send Email** — template `04-tour-booked`
3. **If/Else** — `sms-opt-in`?
   - **Yes** → **Send SMS** — template `S02`
4. **Wait** — until 24h before appointment
5. **Send Email** — template `05-tour-reminder-1d`
6. **If/Else** — `sms-opt-in`? → **Send SMS** — template `S03`
7. **Wait** — until 1h before appointment
8. **If/Else** — `sms-opt-in`? → **Send SMS** — template `S04`
9. **Send Email** — template `06-tour-reminder-2h` (sent 2h before via earlier branch — adjust if you want 1h)
10. **Wait** — until 3h after appointment end
11. **If/Else** — Has tag `booking-confirmed`?
    - **Yes** → end
    - **No** → **Send Email** — template `07-tour-followup` AND **Send SMS** — template `S05`
12. **Wait** — 7 days
13. **If/Else** — Has tag `booking-confirmed`? No → loop into W01 step 9 (stale lead path)

**Exit:** `booking-confirmed`, `do-not-contact`, or appointment cancelled.

---

## W03 — Booking Confirmed → Event Day

**Trigger:** Contact tag added → `booking-confirmed`

**Steps:**
1. **Send Email** — template `08-booking-confirmed`
2. **Send SMS** — template `S06` (if `sms-opt-in`)
3. **Internal Note** — add note to contact: "Booking confirmed: {space}, {event_date}, ${deposit}"
4. **Wait** — until 7 days before event date
5. **Send Email** — template `09-pre-event-7d`
6. **Send SMS** — template `S07`
7. **Wait** — until 24h before event start
8. **Send Email** — template `10-day-before`
9. **Send SMS** — template `S08`
10. **Wait** — until 2h before event start
11. **Send Email** — template `11-event-day`
12. **Send SMS** — template `S09`
13. **Wait** — until 24h after event end
14. **Send Email** — template `12-thankyou`
15. **Send SMS** — template `S10`
16. **Wait** — 3 days
17. **Send Email** — template `13-review-request`
18. **If/Else** — Replied to thank-you with sentiment positive? → **Send SMS** — template `S11`
19. **Add tag** — `past-event-customer`

**Exit:** Booking cancelled (tag `booking-cancelled`).

---

## W04 — Partner Inquiry

**Trigger:** Tag added → `partner-inquiry`

**Steps:**
1. **Wait** — 60 seconds
2. **Send Email** — template `18-partner-inquiry`
3. **Internal Notification** — to Chris: "Partner inquiry — {first_name} — {organization}"
4. **Wait** — 2 business days
5. **If/Else** — Has tag `partner-meeting-booked` OR staff-replied?
   - **No** → **Send Email** — internal reminder to Chris: "Partner lead pending — {first_name}"

**Exit:** `partner-meeting-booked`, `do-not-contact`.

---

## W05 — Membership Onboarding

**Trigger:** Tag added → `member-new` (set when membership Stripe payment succeeds)

**Steps:**
1. **Send Email** — template `15-membership-welcome`
2. **Send SMS** — template `S13` (if `sms-opt-in`)
3. **Grant BASE Community access** — GHL → Communities → invite the contact's email to the BASE Community group(s) for their tier. Studio tier also gets added to the founder-only channel.
4. **Wait** — 7 days
5. **Send Email** — "Have you used your member credits yet?" (build later, simple nudge)
6. **Wait** — until 7 days before next renewal
7. **Send Email** — template `16-renewal-reminder`
8. **Send SMS** — template `S14` (3d before)
9. **Loop on renewal** — restart wait at step 6

**Exit:** Tag `member-cancelled`, or `do-not-contact`.

---

## W06 — Referral Credit Earned

**Trigger:** Tag added → `referral-credit-earned`

**Steps:**
1. **Send Email** — template `17-referral-credit`
2. **Send SMS** — template `S15` (if `sms-opt-in`)
3. **Add tag** — `referral-active` (so we can target this audience later)

---

## W07 — Calendar Conflict Watcher (Baily fires)

**Trigger:** Daily 06:30 ET cron — runs a script that queries the GHL calendar API for the next 30 days and flags overlapping bookings.

**Steps:**
1. **Cron** — workflow trigger
2. **Webhook step** — call your conflict-detection script (this lives in `scripts/` in the repo; build later)
3. **If/Else** — conflicts returned?
   - **Yes** → Internal SMS to Chris: "⚠️ Calendar conflict on {date}, {space}: {bookingA} vs {bookingB}"

**Note:** Implementation deferred — workflow placeholder until the script lands.

---

## W08 — Baily Morning Brief (Chris-only)

**Trigger:** Daily 07:30 ET cron

**Steps:**
1. **Webhook step** — calls a function that:
   - Queries today's appointments from `/calendars/events`
   - Queries pending inquiries (contacts tagged `event-inquiry` AND not `staff-replied`)
   - Counts open quotes outstanding
2. **Internal Message** — sends to Chris's GHL conversation: morning brief per `automations/bots/baily-system-prompt.md`

**Note:** Webhook target deferred — for now, set as manual reminder to Chris.

---

## W09 — Last-Minute Cancellation → Availability Alert

**Trigger:** Calendar appointment cancelled within 14 days of event date

**Steps:**
1. **Add tag** to original contact: `booking-cancelled`
2. **Internal Notification** to Chris
3. **Find contacts** — tagged `availability-alerts` AND tagged `space-<id>` matching cancelled space
4. **Send SMS** — template `S16` (with the now-open date)

---

## Setup checklist (do these in GHL ONCE)

- [ ] Create the **tag taxonomy** above (just type each tag once to register it)
- [ ] Create the **custom fields**: `event_type`, `desired_date`, `guest_count`, `space_interest`, `budget_range`, `loadin_time`, `event_time`, `strike_time`, `event_date`, `membership_tier`, `monthly_credits`, `member_discount`, `renewal_date`, `renewal_amount`, `referred_name`, `referral_action`, `credit_amount`, `lifetime_credit_hours`, `available_credit`, `next_milestone_text`, `referral_link`, `organization`, `community_join_link`
- [ ] Create the **location-level fields** (GHL → Settings → Company): `google_review_link`, `peerspace_review_link`. These power the review emails/SMS.
- [ ] Paste each **email template** from `../emails/` into GHL → Marketing → Emails → Templates. Name them with the `XX-name` prefix for easy lookup.
- [ ] Paste each **SMS message** directly into the SMS step inside the workflow (GHL doesn't have a separate SMS template library by default).
- [ ] Wire the workflows above using the GHL workflow builder.
- [ ] Paste **`base-knowledge-base.md`** into GHL → Conversation AI → Knowledge Base (as one or several documents).
- [ ] Paste **`base-bot-system-prompt.md`** into GHL → Conversation AI → Bot → System Prompt for the public-facing bot.
- [ ] Paste **`baily-system-prompt.md`** into GHL → Conversation AI → Bot → System Prompt for the internal Baily bot (set audience to staff users only).
- [ ] Confirm `GHL_PIT_TOKEN` is set in **Vercel** for Production/Preview/Development.
- [ ] Confirm the **/api/inquiry** route is tagging contacts correctly (test with a real form submission).
- [ ] Smoke-test each workflow with a test contact tagged manually.
