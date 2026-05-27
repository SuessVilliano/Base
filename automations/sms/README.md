# BASE — SMS Templates

SMS is the **fast lane**. Use it for:
- Confirmations (booking, tour, day-of)
- Time-sensitive reminders (1h, 2h, day-of)
- Re-engagement for high-intent stale leads

**DO NOT use SMS for** broad newsletters, generic marketing, or anything that doesn't earn its place in someone's text thread.

## Compliance

- Every contact MUST have explicit consent (GHL form opt-in or a verbal yes recorded as a note).
- Every first SMS includes a one-line opt-out: `Reply STOP to opt out.`
- After STOP, BASE never SMSes that contact again.
- After-hours messages (10 PM – 7 AM ET): delay sending until 8 AM the next day.

## Length

Stay under 160 characters where possible (one SMS segment). Long messages cost more and feel pushy.

## Merge fields

Same as emails — see `../emails/README.md`.

## Sequence inventory

All SMS messages live in `sms-sequences.md` in this folder. They mirror the email sequences but trimmed for the channel.
