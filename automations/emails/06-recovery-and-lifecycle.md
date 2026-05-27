# Recovery + Lifecycle — Emails 14 to 19

---

## 14 — Stale Lead Re-engagement (30 days)

**Trigger:** 30 days after `event-inquiry` tag, IF no `booking-confirmed` and no `do-not-contact`.

**Subject:** Still thinking about BASE for {{contact.custom.event_type}}?

**Body:**

Hi {{contact.first_name}},

Saw your inquiry from a few weeks back and wanted to circle back one more time.

If your event got pushed, canceled, or moved — no problem, we host things on every kind of timeline.

If you're still in the market:

- Browse open dates here: https://basewilmington.com/map
- Or grab a 30-min tour: https://basewilmington.com/book?type=tour

And if BASE isn't the right fit, no hard feelings. Just reply "remove" and we'll stop nudging.

— The BASE Team

---

## 15 — New Member Welcome

**Trigger:** Tag `member-new` (added when membership is paid).

**Subject:** Welcome to BASE membership, {{contact.first_name}} 🎉

**Body:**

{{contact.first_name}},

Welcome to BASE — you're officially a member.

**Your tier:** {{contact.custom.membership_tier}}
**Monthly credits:** {{contact.custom.monthly_credits}} hours
**Member discount:** {{contact.custom.member_discount}}% off all bookings

**What you get right now**

- 🔑 Priority booking — pick dates before the public sees them
- 💸 Member pricing applied automatically at checkout
- 🕒 Credits hit your account on the 1st of each month
- 👋 BASE Community access — join here: https://base.app.clientclub.net/communities
- 🎟 Guest passes — bring collaborators in

**Your member portal:** https://base.app.clientclub.net/ — log in with Google or the email you joined with.

**Use your first credit:** book a podcast session, a content day, or just a quiet office afternoon. Browse rooms: https://basewilmington.com/spaces

Welcome aboard.

— Chris, BASE

---

## 16 — Membership Renewal Reminder

**Trigger:** 7 days before membership renewal date.

**Subject:** Heads up — your BASE membership renews {{contact.custom.renewal_date}}

**Body:**

Hi {{contact.first_name}},

Quick heads-up: your **{{contact.custom.membership_tier}}** membership renews on {{contact.custom.renewal_date}} for ${{contact.custom.renewal_amount}}.

If everything's good — nothing to do, your card on file will run automatically.

**Want to change something?**
- Upgrade to a higher tier (more credits, lower booking rates): {{upgrade_link}}
- Pause for a month: reply with "pause"
- Cancel: reply with "cancel" (no questions asked)

**Used your credits this month?** {{contact.custom.credits_used}} / {{contact.custom.monthly_credits}} hours so far.

— The BASE Team

---

## 17 — Referral Credit Earned

**Trigger:** Tag `referral-credit-earned` (added by referral workflow when a referred contact books).

**Subject:** 🎁 You just earned BASE credit, {{contact.first_name}}

**Body:**

Hey {{contact.first_name}},

{{contact.custom.referred_name}} just {{contact.custom.referral_action}} at BASE — and you earned **{{contact.custom.credit_amount}}**.

**Your running total:** {{contact.custom.lifetime_credit_hours}} hours earned, {{contact.custom.available_credit}} available now.

**Next milestone:** {{contact.custom.next_milestone_text}}

Want to keep earning? Your referral link: {{contact.custom.referral_link}}

— The BASE Team

---

## 18 — Partner Inquiry Response

**Trigger:** Tag `partner-inquiry` from `/api/inquiry`.

**Subject:** Let's talk partnership — BASE × {{contact.custom.organization}}

**Body:**

Hi {{contact.first_name}},

Thanks for reaching out about partnering with BASE. Whether it's investment, advocacy, or co-created programming, we're all-in on partners who care about Wilmington the way we do.

Quick context to help me come prepared:

1. What's the most important outcome of this partnership for {{contact.custom.organization}}?
2. Any specific programs, events, or audiences you're focused on?
3. A timeline that matters (launch by a date, fiscal-year window, etc.)?

**Easy next step:** book a 30-minute partner intro here: https://basewilmington.com/book?type=partner

Or just reply with answers to the three above and I'll prep a tailored proposal.

— Chris, BASE
cfullman.base@gmail.com · (302) 740-0819

---

## 19 — Monthly Newsletter Template

**Trigger:** Manual broadcast (1st of each month, ~10:00 AM ET).
**Audience:** All contacts NOT tagged `unsubscribed`.

**Subject:** This month at BASE — {{event.featured_name}}, openings, and what's new

**Body:**

Hey {{contact.first_name}},

Quick monthly note from BASE.

**🎤 What's happening this month**
- {{event_1_name}} — {{event_1_date}}, {{event_1_room}}
- {{event_2_name}} — {{event_2_date}}, {{event_2_room}}
- {{event_3_name}} — {{event_3_date}}, {{event_3_room}}

**📅 Best open dates if you're planning**
- {{open_date_1}} — Main Hall open
- {{open_date_2}} — Recording + Creative both open (content day combo)
- {{open_date_3}} — Outdoor lot open (food truck rally weather permitting)

**🔥 Member spotlight**
{{member_spotlight_blurb}}

**🆕 What's new at BASE**
{{whats_new_blurb}}

Book any space at https://basewilmington.com/book
Map of live availability: https://basewilmington.com/map
Refer a friend, earn credits: https://basewilmington.com/referral

See you on campus.

— Chris, BASE
