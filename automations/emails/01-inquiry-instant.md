# 01 — Instant Inquiry Confirmation

**Trigger:** Tag `event-inquiry` added (from `/api/inquiry` after a website form submission).
**Delay:** Send immediately (within 60 seconds).
**Channel:** Email.

---

**Subject:** We got your BASE inquiry, {{contact.first_name}} — what's next

**Body:**

Hi {{contact.first_name}},

Thanks for reaching out about {{contact.custom.event_type}} at BASE. Your inquiry just landed in our queue.

Here's what happens next:

1. Chris (the BASE owner) is reviewing your dates and event details.
2. You'll hear back within one business day with availability, working pricing, and a tour link if you want to walk the space first.
3. Nothing is locked in until you and Chris align on dates, contract, and deposit.

While you wait — want to peek inside?

- **Walk the property:** https://basewilmington.com/walkthrough
- **Live room availability map:** https://basewilmington.com/map
- **Membership perks (if you'd use BASE more than once):** https://basewilmington.com/membership

If anything urgent comes up, text or call (302) 740-0819.

— The BASE Team
920 N Church St, Wilmington, DE
