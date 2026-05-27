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
  // TODO: replace these placeholder URLs with real GoHighLevel calendar embed URLs.
  // Each one is rendered inside an <iframe> via the GHLCalendar component.
  booking: {
    bookSpace:
      "https://api.leadconnectorhq.com/widget/booking/REPLACE_WITH_GHL_BOOKING_ID",
    tour:
      "https://api.leadconnectorhq.com/widget/booking/REPLACE_WITH_GHL_TOUR_ID",
    partnerCall:
      "https://api.leadconnectorhq.com/widget/booking/REPLACE_WITH_GHL_PARTNER_ID",
    eventInquiry:
      "https://api.leadconnectorhq.com/widget/form/REPLACE_WITH_GHL_FORM_ID",
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
    { label: "Explore Spaces", href: "/spaces" },
    { label: "Interactive Map", href: "/map" },
    { label: "Book", href: "/book" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "About", href: "/about" },
    { label: "Impact", href: "/impact" },
    { label: "Partner", href: "/partner" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
