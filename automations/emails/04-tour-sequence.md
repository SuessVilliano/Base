# Tour Lifecycle — Emails 04 to 07

All emails for the tour cycle, in one file. Copy each section into its own GHL template.

---

## 04 — Tour Booked Confirmation

**Trigger:** Tag `tour-booked` (from GHL when tour calendar appointment is created).
**Delay:** Send immediately.

**Subject:** Your BASE tour is confirmed for {{appointment.start_date_time}}

**Body:**

Hi {{contact.first_name}},

You're locked in for a tour of BASE.

- **When:** {{appointment.start_date_time}}
- **Where:** 920 N Church Street, Wilmington, DE — pull into our lot off Church St, the gates are open
- **How long:** ~30 minutes
- **Who to ask for:** Chris

Bring rough event details — date window, head count, vibe — so Chris can spec rooms in real time. Curious what's bookable? Live availability map: https://basewilmington.com/map

Need to reschedule? Reply here or text (302) 740-0819.

See you soon,
— The BASE Team

---

## 05 — Tour Reminder (1 day before)

**Trigger:** 24 hours before tour appointment.

**Subject:** Tomorrow at {{appointment.start_time}} — your BASE tour

**Body:**

Hi {{contact.first_name}},

Just a friendly reminder — your BASE tour is tomorrow at {{appointment.start_time}}.

- 📍 920 N Church Street, Wilmington, DE
- 🅿️ Free parking in the BASE lot off Church St
- ⏱ Plan for 30 minutes; bring questions

If something came up, reply here or text (302) 740-0819 and we'll reschedule.

— The BASE Team

---

## 06 — Tour Reminder (2 hours before)

**Trigger:** 2 hours before tour.
**Channel:** Email + SMS — keep this one short.

**Subject:** See you at 2 — final directions

**Body:**

Hi {{contact.first_name}},

We're ready for you in a couple hours.

📍 920 N Church Street, Wilmington, DE
🅿️ Pull right into the lot off Church St
🚪 Walk through the courtyard and Chris will meet you at the doors

Map: https://maps.google.com/?q=920+N+Church+St+Wilmington+DE

Running late? Text (302) 740-0819.

— The BASE Team

---

## 07 — Post-Tour Follow-up

**Trigger:** 2 hours after tour appointment ends.

**Subject:** Great meeting you, {{contact.first_name}} — next step

**Body:**

Hi {{contact.first_name}},

Thanks for walking BASE today. Hope you got a feel for the space.

When you're ready to lock in your date for {{contact.custom.event_type}}, here are the next steps:

1. **Pick your date** — live availability is here: https://basewilmington.com/map
2. **Submit your booking** — direct link for your room is in the spaces you saw
3. **Chris confirms** — final pricing, AV, contract, deposit within one business day

Questions on pricing, AV add-ons, or vendor coordination? Just reply.

— Chris, BASE
(302) 740-0819 · cfullman.base@gmail.com
