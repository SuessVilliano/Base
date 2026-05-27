// =============================================================================
// BASE SITE CONFIG
// Edit this file to update business info, booking links, and contact details
// across the entire website.
// =============================================================================

export const siteConfig = {
  name: "BASE",
  tagline: "Business. Arts. Sports. Education.",
  shortDescription:
    "A Wilmington event and creative campus built for culture, community, and opportunity.",
  longDescription:
    "BASE is a flexible Wilmington event and creative space offering indoor and outdoor areas for private events, community gatherings, podcast production, recording sessions, business meetings, workshops, showcases, vendor markets, food truck events, and cultural programming.",

  // --- LOCATION -------------------------------------------------------------
  // TODO: Confirm exact address spelling with G. Christopher Fullman.
  address: {
    line1: "920 North Church Street",
    city: "Wilmington",
    state: "Delaware",
    stateAbbr: "DE",
    zip: "", // TODO: add ZIP
    full: "920 North Church Street, Wilmington, Delaware",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=920+North+Church+Street+Wilmington+DE",
  },

  // --- CONTACT --------------------------------------------------------------
  contact: {
    name: "G. Christopher Fullman",
    email: "cfullman.base@gmail.com",
    phone: "302-740-0819",
    phoneHref: "tel:+13027400819",
  },

  // --- SOCIAL ---------------------------------------------------------------
  // TODO: replace with real handles when ready
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },

  // --- BOOKING / GHL EMBEDS -------------------------------------------------
  // Every value below is just a GHL widget ID (the last segment of the
  // widget URL — e.g. "t30YhxbLwudG91PG6qip"). The full embed URL is built
  // automatically by src/lib/booking.ts.
  //
  // Per-space calendars: each value is one of —
  //   • a GHL widget ID  → that calendar is used for this space
  //   • another space id → alias; uses that space's calendar (resolved
  //     recursively). Use this when one calendar covers multiple rooms,
  //     e.g. Main Hall + Stage + Upper Lounge are physically one resource.
  //   • null             → no dedicated calendar yet; falls back to `default`
  booking: {
    default: "t30YhxbLwudG91PG6qip", // BASE master calendar ("Book At Base")
    tour: "iXn95c5zJYEHFLjQ0GJR",
    partner: "ell275ECc7R1dIgRyddQ",

    bySpace: {
      "parking-lot": "XYeZFoqrtohm0G5DjMn9",
      courtyard: "DVqvDCqvevosfHwVxdNf",
      "main-hall": "dNAUGkgXf3eJcXrIlnsB",
      stage: "main-hall", // shares Main Hall — bundled rental
      "upper-lounge": "main-hall", // shares Main Hall — bundled rental
      "podcast-room": "jOCnfIkTjHCTc0miNkFD",
      boardroom: "wqJjSWMPQDs9C9GfCE06",
      "recording-studio": "UWknLRoOCiIVub8ceswv",
      "creative-studio": "ENl2V1p2u0tUtKIHBOTf",
      "back-studio": "recording-studio", // alias to recording studio for now
      offices: "Kre2q7a2GtVDw8hcx07Y",
      bathrooms: null,
    } as Record<string, string | null>,
  },

  // --- GHL INTEGRATION ------------------------------------------------------
  // locationId and chatWidgetId are public (they ship inside widget URLs and
  // <script> tags). The PIT token is sensitive and lives in the server-only
  // env var GHL_PIT_TOKEN — never put it in this file.
  ghl: {
    locationId: "nxMcQTjRPDUhC92RKGiK",
    chatWidgetId: "6a16dc861ce15bb9e949a77a",
    apiBase: "https://services.leadconnectorhq.com",
    apiVersion: "2021-07-28",
  },

  bookingDisclaimer:
    "Submitting this form does not confirm your booking. A BASE team member will contact you to confirm availability, pricing, and event requirements.",

  // --- SEO ------------------------------------------------------------------
  seoKeywords: [
    "Wilmington event space",
    "Wilmington Delaware venue",
    "event venue in Wilmington DE",
    "podcast studio Wilmington",
    "recording studio Wilmington",
    "creative space Wilmington",
    "community event space Wilmington",
    "private event space Wilmington",
    "workshop venue Wilmington",
    "food truck event space Wilmington",
    "corporate meeting space Wilmington",
    "artist showcase venue Wilmington",
  ],

  // --- BRAND ----------------------------------------------------------------
  brand: {
    primary: "#1E5BFF", // BASE blue accent
    black: "#0A0A0B",
    white: "#FFFFFF",
  },

  // --- NAV ------------------------------------------------------------------
  nav: [
    { label: "Home", href: "/" },
    { label: "Spaces", href: "/spaces" },
    { label: "Map", href: "/map" },
    { label: "Book", href: "/book" },
    { label: "Membership", href: "/membership" },
    { label: "Refer & Earn", href: "/referral" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "About", href: "/about" },
    { label: "Partner", href: "/partner" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
