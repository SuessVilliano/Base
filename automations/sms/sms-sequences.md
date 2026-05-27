# BASE — SMS Sequences

All BASE SMS messages. Paste each into GHL → Workflow Step → Send SMS.

---

## S01 — Inquiry Instant SMS

**Trigger:** Tag `event-inquiry` AND `sms-opt-in` AND not after-hours.

```
Hey {{contact.first_name}}, this is BASE — we got your inquiry about {{contact.custom.event_type}}. Chris will follow up within 1 business day. Live map: basewilmington.com/map. Reply STOP to opt out.
```

---

## S02 — Tour Booked Confirmation

**Trigger:** Tag `tour-booked` AND `sms-opt-in`.

```
You're booked for a BASE tour {{appointment.start_date_time}}. Pull into the lot at 920 N Church St. Need to reschedule? Text us. — BASE
```

---

## S03 — Tour Day-Before Reminder

**Trigger:** 24h before tour appointment.

```
Tomorrow at {{appointment.start_time}} — your BASE tour at 920 N Church St. See you then! Reply if you need to reschedule.
```

---

## S04 — Tour 1-Hour Reminder

**Trigger:** 1h before tour.

```
1 hr until your BASE tour. 920 N Church St — pull right into the lot. Chris will meet you at the doors. Map: maps.google.com/?q=920+N+Church+St+Wilmington+DE
```

---

## S05 — Post-Tour Nudge (3h after)

**Trigger:** 3h after tour ends, IF no `booking-confirmed` yet.

```
Great meeting you today, {{contact.first_name}}. When you're ready to lock in {{contact.custom.event_type}}, here's the live calendar: basewilmington.com/map. — Chris
```

---

## S06 — Booking Confirmed

**Trigger:** Tag `booking-confirmed`.

```
You're on the BASE calendar for {{contact.custom.event_date}}, {{contact.custom.space_interest}}. We'll send a 7-day brief soon. Need anything before then? Reply here. — BASE
```

---

## S07 — Event 7-Day Reminder

**Trigger:** 7 days before event.

```
{{contact.first_name}} — your BASE event is 7 days out. Quick checklist coming via email. Anything change with guest count or vendors? Just text back.
```

---

## S08 — Event Day-Before

**Trigger:** 24h before event start.

```
See you tomorrow at BASE. Load-in {{contact.custom.loadin_time}}, event {{contact.custom.event_time}}. Day-of contact: Chris (302) 740-0819. Text anytime.
```

---

## S09 — Event Day-Of (2h before)

**Trigger:** 2h before event start.

```
Today's the day. We're set up and ready. Chris is on-site — text (302) 740-0819 if you need anything. Have a great event! — BASE
```

---

## S10 — Event Thank-You (next day)

**Trigger:** 24h after event ends.

```
Thanks for hosting at BASE, {{contact.first_name}}. Hope it landed how you wanted. 2-min survey: basewilmington.com/feedback?c={{contact.id}}. Or just reply with feedback.
```

---

## S11 — Review Request (4 days after)

**Trigger:** 4d after event end, IF positive NPS or no negative reply.

```
One favor — if BASE was a fit, a quick review goes a long way. Google: {{google_review_short_link}} · Peerspace: {{peerspace_review_short_link}}. Thanks 🙏 — Chris
```

> Send only ONE link per contact if you're worried about message length. Pick the platform that matters most for that booking type — Peerspace for event hosts who found us via the marketplace, Google for everyone else.

---

## S12 — Stale Lead Recovery (14d)

**Trigger:** 14d after inquiry, IF no booking + no recent reply + `sms-opt-in`.

```
Hey {{contact.first_name}}, Chris at BASE — still planning {{contact.custom.event_type}}? Map of open dates: basewilmington.com/map. Or text me a date and I'll pencil it in.
```

---

## S13 — Membership Welcome

**Trigger:** Tag `member-new`.

```
Welcome to BASE membership, {{contact.first_name}} 🎉 Your portal: {{member_portal_short_link}}. First {{monthly_credits}} hours of credits land today. — Chris
```

---

## S14 — Member Renewal (3 days before)

**Trigger:** 3d before renewal.

```
Heads up — your BASE membership renews in 3 days for ${{renewal_amount}}. All good? If you need to pause or change tier, just reply. — BASE
```

---

## S15 — Referral Credit Earned

**Trigger:** Tag `referral-credit-earned`.

```
🎁 {{contact.custom.referred_name}} just joined BASE — you earned {{contact.custom.credit_amount}}. Available credit: {{contact.custom.available_credit}}. — BASE
```

---

## S16 — Last-Minute Availability Alert (opt-in)

**Trigger:** Manual / cron when a peak weekend cancels (creates new opening).
**Audience:** Contacts tagged `availability-alerts` AND matching interest.

```
Last-minute open at BASE: {{space_name}} on {{date}}. First-come-first-served. Grab it: {{booking_short_link}} — BASE
```

---

## S17 — Internal Alert to Chris (Baily handoff)

**Trigger:** Bot escalation OR high-value lead.
**Send to:** Chris's mobile (use GHL "Send to user" step).

```
🔔 BASE: New lead — {{contact.first_name}} {{contact.last_name}}, {{contact.custom.event_type}}, {{contact.custom.guest_count}} ppl, {{contact.custom.desired_date}}. Phone {{contact.phone}}. Open in GHL: {{ghl_contact_link}}
```
