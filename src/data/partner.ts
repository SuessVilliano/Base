// =============================================================================
// PARTNER / SPONSOR DATA
// =============================================================================

export type PartnerTrack = {
  id: string;
  title: string;
  description: string;
  cta: string;
};

export const partnerTracks: PartnerTrack[] = [
  {
    id: "invest",
    title: "Invest",
    description:
      "Fund the next chapter of BASE — capital improvements, programming, and the people behind them. Investments fuel jobs, opportunity, and cultural infrastructure in Wilmington.",
    cta: "Become an investor",
  },
  {
    id: "advocate",
    title: "Advocate",
    description:
      "Champion BASE in your networks, your boardrooms, and your city. Advocacy opens doors, unlocks resources, and brings the right partners to the table.",
    cta: "Advocate with us",
  },
  {
    id: "partner",
    title: "Partner",
    description:
      "Co-create programs, host signature events, sponsor youth and creative initiatives, and align your brand with measurable community impact.",
    cta: "Explore partnership",
  },
];

export const partnerTypes: string[] = [
  "Corporate sponsors",
  "Community partners",
  "Education partners",
  "Arts partners",
  "Sports/wellness partners",
  "Small business partners",
  "Youth program partners",
  "City and nonprofit partners",
];
