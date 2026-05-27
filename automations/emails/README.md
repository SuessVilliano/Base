# BASE — Email Templates

All BASE email templates, organized by lifecycle stage. Paste each one into GHL → Marketing → Emails → Templates, or attach them as steps in the matching workflow (see `../workflows/`).

## Merge fields used

The bracketed placeholders below assume GHL's standard merge syntax. Wire them to these fields:

| Placeholder | GHL field |
|---|---|
| `{{contact.first_name}}` | contact first name |
| `{{contact.email}}` | contact email |
| `{{contact.phone}}` | contact phone |
| `{{contact.custom.event_type}}` | custom field `event_type` |
| `{{contact.custom.desired_date}}` | custom field `desired_date` |
| `{{contact.custom.guest_count}}` | custom field `guest_count` |
| `{{contact.custom.space_interest}}` | custom field `space_interest` |
| `{{contact.custom.budget_range}}` | custom field `budget_range` |
| `{{contact.custom.booking_link}}` | dynamic — chosen room widget URL |
| `{{user.first_name}}` | sender (Chris) |
| `{{location.full_address}}` | "920 N Church St, Wilmington, DE" |
| `{{location.google_review_link}}` | Google Business Profile review URL |
| `{{location.peerspace_review_link}}` | Peerspace listing review URL |
| `{{contact.custom.community_join_link}}` | BASE Community (GHL) join URL |

## Sequences

| File | Trigger | Description |
|---|---|---|
| `01-inquiry-instant.md` | Tag `event-inquiry` added | Within 60s of website form submission |
| `02-inquiry-followup-24h.md` | 24h after `event-inquiry` if no reply | Soft check-in |
| `03-inquiry-followup-3d.md` | 3 days after if still no reply | Last touch with a clear offer |
| `04-tour-booked.md` | Tag `tour-booked` | Confirmation of scheduled tour |
| `05-tour-reminder-1d.md` | 24h before tour appointment | Day-before reminder |
| `06-tour-reminder-2h.md` | 2h before tour | Final nudge with directions |
| `07-tour-followup.md` | 2h after tour ends | Thank-you + booking link |
| `08-booking-confirmed.md` | Tag `booking-confirmed` | After Chris confirms contract |
| `09-booking-reminder-7d.md` | 7 days before event | Logistics checklist |
| `10-booking-reminder-1d.md` | 24h before event | Day-before brief |
| `11-event-day-of.md` | 2h before event start | Day-of access info |
| `12-event-thankyou.md` | 24h after event ends | Thank-you + review request |
| `13-event-review-request.md` | 4 days after event | Public review nudge |
| `14-stale-lead-30d.md` | 30 days post-inquiry with no booking | Re-engagement |
| `15-membership-welcome.md` | Tag `member-new` | Onboarding for new members |
| `16-membership-renewal.md` | 7 days before renewal date | Renewal nudge |
| `17-referral-credit-earned.md` | Tag `referral-credit-earned` | Confirm credit added |
| `18-partner-inquiry.md` | Tag `partner-inquiry` | Initial partner response |
| `19-newsletter-monthly.md` | Manual broadcast | Monthly newsletter template |

## Style rules

- **Subject line:** under 50 characters, no clickbait, no emoji unless context-perfect.
- **Body:** 80–180 words. Be specific. Always include ONE clear next step.
- **Signature:** Chris signs personal emails ("— Chris, BASE"). Sequence emails sign "— The BASE Team".
- **Plain-text fallback:** every HTML email must have a clean text version (GHL handles this).
