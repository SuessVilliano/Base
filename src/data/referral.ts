// =============================================================================
// REFERRAL PROGRAM DATA
// Drives /referral page. Edit reward tiers, FAQs, and program rules here.
// =============================================================================

export type ReferralReward = {
  threshold: number;
  reward: string;
  description: string;
};

export const referralProgram = {
  headline: "Share BASE. Earn free hours.",
  subhead:
    "Every friend who becomes a BASE member, books a space, or signs up as a partner sends rewards your way. Members earn faster.",

  // High-level signup-to-reward flow
  steps: [
    {
      n: "01",
      title: "Get your referral link",
      copy: "Drop your email and we'll generate your personal BASE referral link instantly.",
    },
    {
      n: "02",
      title: "Share it everywhere",
      copy: "Send to friends, post in your group chat, drop it in your link-in-bio. We track every signup.",
    },
    {
      n: "03",
      title: "Earn free hours + credits",
      copy: "When your referrals book or join, you get credits in your BASE account — automatically.",
    },
  ],

  // Reward ladder
  rewards: [
    {
      threshold: 1,
      reward: "+2 free hours",
      description: "First referral books any space or joins as a member.",
    },
    {
      threshold: 3,
      reward: "+8 free hours",
      description: "Three referrals — enough for a full content day or two boardroom sessions.",
    },
    {
      threshold: 5,
      reward: "1 free Main Hall event (up to 3 hrs)",
      description:
        "Host your launch, listening party, or community night on BASE.",
    },
    {
      threshold: 10,
      reward: "Free month of Creator membership",
      description:
        "Or apply the value to upgrade an existing membership tier.",
    },
    {
      threshold: 25,
      reward: "Founding Partner status + custom perks",
      description:
        "Permanent BASE recognition, custom partner benefits, and an annual stipend of credits.",
    },
  ] satisfies ReferralReward[],

  // Members earn faster
  memberMultiplier: {
    headline: "Members earn 2× faster",
    copy: "Every BASE membership tier doubles your referral credits. Stack your member discount with your referral rewards and bookings effectively pay for themselves.",
  },

  faqs: [
    {
      q: "Who can join the referral program?",
      a: "Anyone. You don't need to be a member — but members earn rewards at 2× the rate.",
    },
    {
      q: "When do credits hit my account?",
      a: "Booking referrals credit within 48 hours of the referred booking. Membership referrals credit on the first paid month.",
    },
    {
      q: "Do referral credits expire?",
      a: "Credits roll for 12 months from the date earned, so use them when it makes sense for your schedule.",
    },
    {
      q: "Can referrals stack with other promos?",
      a: "Yes — referral credits stack with member pricing and seasonal offers. They cannot be combined with the founding-member lifetime rate at signup.",
    },
    {
      q: "Can businesses or nonprofits refer?",
      a: "Absolutely. Organizations have their own track — reach out and we'll set up a co-marketing referral with custom rewards.",
    },
  ],
};
