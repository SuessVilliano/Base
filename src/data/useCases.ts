// =============================================================================
// USE CASES DATA
// Drives /use-cases page. Each use case recommends one or more spaces.
// =============================================================================

export type UseCase = {
  id: string;
  title: string;
  description: string;
  recommendedSpaces: string[]; // matches Space.id
  icon: string; // lucide icon name
};

export const useCases: UseCase[] = [
  {
    id: "private-events",
    title: "Private Events",
    description:
      "Birthdays, anniversaries, weddings, and milestone celebrations with an upscale, customizable feel.",
    recommendedSpaces: ["main-hall", "courtyard", "upper-lounge"],
    icon: "PartyPopper",
  },
  {
    id: "corporate-meetings",
    title: "Corporate Meetings",
    description:
      "Off-site days, executive sessions, training, and board meetings in a polished, distraction-free setting.",
    recommendedSpaces: ["boardroom", "offices", "main-hall"],
    icon: "Briefcase",
  },
  {
    id: "community-forums",
    title: "Community Forums",
    description:
      "Town halls, listening sessions, and resident-led conversations that move Wilmington forward.",
    recommendedSpaces: ["main-hall", "stage", "courtyard"],
    icon: "Users",
  },
  {
    id: "nonprofit-events",
    title: "Nonprofit Events",
    description:
      "Galas, donor receptions, mission events, and impact storytelling for nonprofits.",
    recommendedSpaces: ["main-hall", "boardroom", "courtyard"],
    icon: "HeartHandshake",
  },
  {
    id: "workshops-trainings",
    title: "Workshops & Trainings",
    description:
      "Hands-on workshops, cohort programs, certifications, and learning intensives.",
    recommendedSpaces: ["main-hall", "boardroom", "creative-studio"],
    icon: "GraduationCap",
  },
  {
    id: "podcasts-media",
    title: "Podcasts & Media Production",
    description:
      "Long-form interviews, livestreams, branded video, and recurring show productions.",
    recommendedSpaces: ["podcast-room", "creative-studio", "back-studio"],
    icon: "Mic",
  },
  {
    id: "music-showcases",
    title: "Music & Artist Showcases",
    description:
      "Live performances, listening parties, EP releases, and curated showcases.",
    recommendedSpaces: ["main-hall", "stage", "upper-lounge", "recording-studio"],
    icon: "Music",
  },
  {
    id: "youth-programs",
    title: "Youth Programs",
    description:
      "Mentorship cohorts, after-school programs, summer programs, and student showcases.",
    recommendedSpaces: ["main-hall", "creative-studio", "boardroom"],
    icon: "Sparkles",
  },
  {
    id: "sports-wellness",
    title: "Sports & Wellness Activations",
    description:
      "Outdoor fitness, wellness pop-ups, athlete meet-and-greets, and recovery sessions.",
    recommendedSpaces: ["parking-lot", "courtyard"],
    icon: "Dumbbell",
  },
  {
    id: "vendor-markets",
    title: "Vendor Markets",
    description:
      "Curated marketplaces highlighting local makers, artists, and small businesses.",
    recommendedSpaces: ["parking-lot", "courtyard", "main-hall"],
    icon: "Store",
  },
  {
    id: "food-truck-events",
    title: "Food Truck Events",
    description:
      "Multi-truck rallies, themed nights, and food-forward community gatherings.",
    recommendedSpaces: ["parking-lot", "courtyard"],
    icon: "Truck",
  },
  {
    id: "art-shows",
    title: "Art Shows",
    description:
      "Solo and group exhibitions, gallery nights, and artist receptions.",
    recommendedSpaces: ["main-hall", "courtyard", "upper-lounge"],
    icon: "Palette",
  },
  {
    id: "networking-mixers",
    title: "Networking Mixers",
    description:
      "Industry meetups, professional happy hours, and curated networking events.",
    recommendedSpaces: ["courtyard", "upper-lounge", "main-hall"],
    icon: "Network",
  },
  {
    id: "business-launches",
    title: "Business Launches",
    description:
      "Grand openings, product reveals, and ribbon-cutting moments.",
    recommendedSpaces: ["main-hall", "courtyard", "stage"],
    icon: "Rocket",
  },
  {
    id: "brand-activations",
    title: "Brand Activations",
    description:
      "Immersive brand experiences, sampling events, and influencer activations.",
    recommendedSpaces: ["main-hall", "courtyard", "parking-lot", "creative-studio"],
    icon: "Megaphone",
  },
  {
    id: "educational-programs",
    title: "Educational Programs",
    description:
      "Curriculum-driven programs, lectures, panels, and ongoing learning series.",
    recommendedSpaces: ["main-hall", "boardroom", "offices"],
    icon: "BookOpen",
  },
  {
    id: "graduations-celebrations",
    title: "Graduation / Celebration Events",
    description:
      "Cohort graduations, recognition ceremonies, and milestone celebrations.",
    recommendedSpaces: ["main-hall", "stage", "courtyard"],
    icon: "Trophy",
  },
  {
    id: "livestream-events",
    title: "Livestream Events",
    description:
      "Multi-camera livestreams, hybrid events, and broadcast-quality productions.",
    recommendedSpaces: ["main-hall", "stage", "podcast-room"],
    icon: "Radio",
  },
  {
    id: "panel-discussions",
    title: "Panel Discussions",
    description:
      "Moderated panels, fireside chats, and thought-leader conversations.",
    recommendedSpaces: ["main-hall", "stage", "podcast-room"],
    icon: "MessagesSquare",
  },
  {
    id: "content-days",
    title: "Content Days",
    description:
      "Batch shoots for creators, brands, and teams — multiple sets, one day, one location.",
    recommendedSpaces: ["creative-studio", "podcast-room", "back-studio"],
    icon: "Camera",
  },
];
