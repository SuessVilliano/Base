// =============================================================================
// MEMBERSHIP DATA
// Drives /membership page. Edit prices, perks, and the founding offer here.
// =============================================================================

export type MemberPerk = {
  label: string;
  description: string;
};

export type MembershipTier = {
  id: string;
  name: string;
  positioning: string;
  price: number;
  cadence: "/mo" | "/yr";
  // The headline discount this tier gives on space bookings
  discountPct: number;
  // The headline free-hours/credits this tier grants per month
  monthlyCredits: number;
  perks: MemberPerk[];
  cta: string;
  // CTA target — replace with a real GHL form / Stripe link when ready.
  ctaHref: string;
  featured?: boolean;
};

// Universal perks (shown above the tier cards)
export const baseMemberPerks: MemberPerk[] = [
  {
    label: "Priority booking",
    description:
      "Lock in dates before the general public — members get a 7-day head start on new openings.",
  },
  {
    label: "Member pricing",
    description:
      "Discount applied automatically on every space, every booking, every visit.",
  },
  {
    label: "Monthly credits",
    description:
      "Free hours in our flex spaces — work, record, meet, or shoot at no extra charge.",
  },
  {
    label: "Member-only events",
    description:
      "Quarterly mixers, demo nights, and partner intros to keep your network growing.",
  },
  {
    label: "Guest passes",
    description:
      "Bring collaborators in for the day — every member gets monthly guest passes.",
  },
  {
    label: "Community Slack",
    description:
      "Real-time access to the BASE network — entrepreneurs, creatives, and operators.",
  },
];

export const membershipTiers: MembershipTier[] = [
  {
    id: "creator",
    name: "Creator",
    positioning:
      "For solo artists, podcasters, freelancers, and creators who want a home base.",
    price: 49,
    cadence: "/mo",
    discountPct: 10,
    monthlyCredits: 4,
    perks: [
      { label: "10% off all bookings", description: "" },
      { label: "4 free hours / month", description: "Flex space, podcast room, or office" },
      { label: "Priority booking (7-day head start)", description: "" },
      { label: "2 guest passes / month", description: "" },
      { label: "Community Slack", description: "" },
      { label: "Member-only events", description: "" },
    ],
    cta: "Start Creator",
    ctaHref: "/membership/join?tier=creator",
  },
  {
    id: "founder",
    name: "Founder",
    positioning:
      "For entrepreneurs, small teams, and consultants who use BASE every week.",
    price: 149,
    cadence: "/mo",
    discountPct: 20,
    monthlyCredits: 12,
    perks: [
      { label: "20% off all bookings", description: "" },
      { label: "12 free hours / month", description: "Flex space, podcast room, boardroom" },
      { label: "Priority booking (14-day head start)", description: "" },
      { label: "6 guest passes / month", description: "" },
      { label: "1 boardroom day-pass / month", description: "" },
      { label: "Mailing address & package handling", description: "" },
      { label: "Community Slack + founder-only channel", description: "" },
    ],
    cta: "Join as Founder",
    ctaHref: "/membership/join?tier=founder",
    featured: true,
  },
  {
    id: "studio",
    name: "Studio",
    positioning:
      "For teams, agencies, and production crews running multiple events or shoots a month.",
    price: 399,
    cadence: "/mo",
    discountPct: 30,
    monthlyCredits: 32,
    perks: [
      { label: "30% off all bookings", description: "" },
      { label: "32 free hours / month", description: "Any space, transferable across team" },
      { label: "First-look booking (30-day head start)", description: "" },
      { label: "Unlimited guest passes (fair-use)", description: "" },
      { label: "Up to 5 named team members", description: "" },
      { label: "Branded room signage during your bookings", description: "" },
      { label: "Dedicated BASE concierge contact", description: "" },
      { label: "Quarterly partner intros", description: "" },
    ],
    cta: "Talk to BASE",
    ctaHref: "/membership/join?tier=studio",
  },
];

// =============================================================================
// FOUNDING MEMBERS OFFER (limited-time)
// =============================================================================
export const foundingOffer = {
  badge: "Founding Members",
  headline: "Founding member rates. Locked in forever.",
  subhead:
    "Join during our launch window and lock in your rate for as long as you stay a member — plus an extra month of credits on the house.",
  // Hard cap so it feels real
  spotsTotal: 50,
  spotsClaimed: 17, // TODO: update manually or wire to a counter
  // Extra perks layered on top of the tier
  perks: [
    "Locked-in lifetime price — never raised while you're a member",
    "Double credits in your first 90 days",
    "Founding Member badge in our community Slack + listings",
    "Annual founder dinner with the BASE team and partners",
    "Early access to new rooms, programs, and partner offers",
  ],
  cta: "Claim Founding Spot",
  // TODO: replace with real GHL form / Stripe checkout URL
  ctaHref:
    "https://api.leadconnectorhq.com/widget/booking/t30YhxbLwudG91PG6qip",
};
