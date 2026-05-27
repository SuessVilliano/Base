# Booking + Event Lifecycle — Emails 08 to 13

---

## 08 — Booking Confirmed

**Trigger:** Tag `booking-confirmed` (added manually by Chris once contract + deposit are received).

**Subject:** ✅ You're booked at BASE — {{contact.custom.event_date}}

**Body:**

{{contact.first_name}}, you're officially on the BASE calendar.

**Booking summary**
- **Event:** {{contact.custom.event_type}}
- **Date / time:** {{contact.custom.event_date}}, {{contact.custom.event_time}}
- **Space:** {{contact.custom.space_interest}}
- **Guest count:** {{contact.custom.guest_count}}

**What happens between now and event day**

- 7 days out — we'll send a logistics checklist (load-in, AV, vendor coordination)
- 24 hours out — a day-before brief with arrival details
- Day of — Chris is on-site to greet you and your team

**Your contact:** Chris — (302) 740-0819 — cfullman.base@gmail.com

**Want to add anything?** Catering coordination, decor, extra AV — just reply.

We're glad you picked BASE. Let's make this great.

— The BASE Team

---

## 09 — Pre-Event Brief (7 days before)

**Trigger:** 7 days before event date.

**Subject:** Your BASE event is 7 days out — quick checklist

**Body:**

Hi {{contact.first_name}},

One week until {{contact.custom.event_type}} at BASE. Quick checklist to keep things smooth:

**☑ Confirm**
- Final guest count: {{contact.custom.guest_count}} — still accurate?
- Vendor list (caterer, DJ, decorator) — please send names + phone numbers
- AV needs — any changes from what we discussed?

**☑ Reminders**
- Load-in starts {{contact.custom.loadin_time}}
- Event runs {{contact.custom.event_time}}
- Strike & cleanup wraps {{contact.custom.strike_time}}

**☑ Insurance**
- If you're hosting more than 50 guests OR serving alcohol — please send your Certificate of Insurance listing BASE as additionally insured (if not already on file).

**☑ Questions?**
Reply here or text (302) 740-0819.

— Chris, BASE

---

## 10 — Day-Before Brief (24 hours before)

**Trigger:** 24 hours before event start.

**Subject:** Tomorrow at BASE — arrival & access info

**Body:**

Hi {{contact.first_name}},

You're up tomorrow. Quick brief:

- **Arrive:** {{contact.custom.loadin_time}} for setup
- **Event time:** {{contact.custom.event_time}}
- **Address:** 920 N Church Street, Wilmington, DE
- **Parking:** BASE lot off Church St
- **Contact on-site:** Chris — (302) 740-0819 (text works best day-of)

**Guest count:** {{contact.custom.guest_count}}
**Space:** {{contact.custom.space_interest}}

If anything changes overnight — guest count, vendor times, weather call for outdoor pieces — text Chris.

Have a great event.

— The BASE Team

---

## 11 — Event Day

**Trigger:** 2 hours before event start.
**Channel:** Email + SMS.

**Subject:** Today's the day — see you at BASE

**Body:**

{{contact.first_name}},

We're set up and ready for you.

📍 920 N Church Street, Wilmington, DE
🚪 Chris will be at the front to greet you when you arrive
📱 Text (302) 740-0819 if you need anything

Wishing you a great event.

— The BASE Team

---

## 12 — Thank You (24 hours after event)

**Trigger:** 24 hours after event end.

**Subject:** Thanks for hosting at BASE, {{contact.first_name}}

**Body:**

Hi {{contact.first_name}},

Hope your event landed exactly how you wanted. Hosting you was a privilege — and our team noticed how well your guests showed up.

Quick favors:

1. **Two-minute survey** (helps us get better): https://basewilmington.com/feedback?contact={{contact.id}}
2. **Photos** — if your photographer captured the space, we'd love a few for our gallery (with credit). Reply with a Drive/Dropbox link.
3. **Refer a friend** — every BASE referral earns you free hours: https://basewilmington.com/referral

If anything came up that we should fix for the next renter, tell us straight.

Looking forward to the next one.

— Chris, BASE

---

## 13 — Review Request (4 days after event)

**Trigger:** 4 days after event end, IF NPS survey completed positively OR no negative reply.

**Subject:** One favor — share your BASE experience

**Body:**

{{contact.first_name}},

Quick favor: BASE is a young venue, and public reviews are everything.

If your event went well, would you drop a 1-minute review on one (or both) of these?

- **Google:** {{location.google_review_link}}
- **Peerspace:** {{location.peerspace_review_link}}

Mention the room you used and what you'd tell a friend who's thinking about booking BASE. That's it.

Peerspace reviews are especially helpful — they're how other event hosts find us when they're searching for spaces in Wilmington.

If it didn't go well, please reply directly — Chris reads every message and wants to make it right.

Thank you,
— The BASE Team
