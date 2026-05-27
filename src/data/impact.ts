// =============================================================================
// IMPACT STATS
// Animated counters on the Home + Impact pages.
// =============================================================================

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
};

export const impactStats: Stat[] = [
  {
    id: "hours",
    value: 9000,
    suffix: "+",
    label: "Free or Low-Cost Hours",
    description:
      "Hours of free or low-cost office and creative space provided to the community.",
  },
  {
    id: "artists",
    value: 1000,
    suffix: "+",
    label: "Artists Supported",
    description: "Local creatives and artists supported through BASE.",
  },
  {
    id: "businesses",
    value: 50,
    suffix: "+",
    label: "Minority & Women-Owned Businesses",
    description:
      "Minority- and women-owned businesses supported through programming and access.",
  },
  {
    id: "leaders",
    value: 1000,
    suffix: "+",
    label: "Entrepreneurs & Community Leaders",
    description:
      "Entrepreneurs and community leaders reached through training and development.",
  },
  {
    id: "footTraffic",
    value: 40,
    suffix: "/wk",
    prefix: "~",
    label: "Weekly Foot Traffic",
    description:
      "Average of 30–40 people moving through BASE every week and growing.",
  },
];
