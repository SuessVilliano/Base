// =============================================================================
// SPACES DATA
// Each space here drives the Spaces page, Interactive Map modals,
// 3D Walkthrough panels, and Booking dropdowns.
// =============================================================================

export type Space = {
  id: string;
  name: string;
  shortName: string;
  category: "outdoor" | "event" | "creative" | "business";
  positioning: string;
  bestUses: string[];
  capacity: string;
  amenities: string[];
  // Map zone coordinates (percent based, on a 100x100 viewBox)
  map: { x: number; y: number; w: number; h: number; shape?: "rect" | "round" };
  // TODO: Replace gallery placeholder paths with real images in /public/spaces/<id>/
  gallery: string[];
  emoji?: string;
};

export const spaces: Space[] = [
  {
    id: "parking-lot",
    name: "Parking Lot / Outdoor Event Lot",
    shortName: "Outdoor Lot",
    category: "outdoor",
    positioning:
      "Perfect for food trucks, vendor markets, community events, outdoor pop-ups, car meets, small festivals, outdoor fitness, brand activations, and family events.",
    bestUses: [
      "Food trucks",
      "Vendor markets",
      "Outdoor pop-ups",
      "Car meets",
      "Small festivals",
      "Outdoor fitness",
      "Brand activations",
      "Family events",
    ],
    capacity: "Up to 200+ guests (configuration dependent)",
    amenities: [
      "Open paved lot",
      "Vehicle and vendor access",
      "Power access (request in advance)",
      "Direct gate entry from Church Street",
      "Adjacent to courtyard for indoor/outdoor flow",
    ],
    map: { x: 4, y: 60, w: 38, h: 34 },
    gallery: ["/placeholders/parking-1.jpg", "/placeholders/parking-2.jpg"],
    emoji: "🅿️",
  },
  {
    id: "courtyard",
    name: "Courtyard",
    shortName: "Courtyard",
    category: "outdoor",
    positioning:
      "Perfect for networking mixers, cocktail hours, intimate outdoor gatherings, vendor setups, photo moments, pre-event check-ins, meet-and-greets, and cultural activations.",
    bestUses: [
      "Networking mixers",
      "Cocktail hours",
      "Intimate outdoor gatherings",
      "Vendor setups",
      "Photo moments",
      "Pre-event check-ins",
      "Meet-and-greets",
      "Cultural activations",
    ],
    capacity: "Up to 75 guests",
    amenities: [
      "Open-air courtyard",
      "String lighting",
      "Cocktail seating options",
      "Direct double-door entry into Main Hall",
      "Photo-friendly backdrop",
    ],
    map: { x: 44, y: 58, w: 16, h: 22 },
    gallery: ["/placeholders/courtyard-1.jpg"],
    emoji: "🌿",
  },
  {
    id: "main-hall",
    name: "Main Event Hall",
    shortName: "Main Hall",
    category: "event",
    positioning:
      "Perfect for concerts, live podcasts, speaking events, panels, workshops, private parties, showcases, banquets, pop-up markets, film screenings, community forums, and launch events.",
    bestUses: [
      "Concerts",
      "Live podcasts",
      "Speaking events",
      "Panels",
      "Workshops",
      "Private parties",
      "Showcases",
      "Banquets",
      "Pop-up markets",
      "Film screenings",
      "Community forums",
      "Launch events",
    ],
    capacity: "Up to 200 guests",
    amenities: [
      "Open floor plan",
      "Sound system ready",
      "Stage adjacency",
      "Theatrical lighting",
      "Bar/serving area",
      "Wheelchair accessible",
    ],
    map: { x: 44, y: 22, w: 32, h: 32 },
    gallery: ["/placeholders/main-hall-1.jpg"],
    emoji: "🎤",
  },
  {
    id: "stage",
    name: "Stage Area",
    shortName: "Stage",
    category: "event",
    positioning:
      "Perfect for performances, speakers, panels, live interviews, artist showcases, comedy nights, training sessions, and content capture.",
    bestUses: [
      "Performances",
      "Speakers",
      "Panels",
      "Live interviews",
      "Artist showcases",
      "Comedy nights",
      "Training sessions",
      "Content capture",
    ],
    capacity: "Stage fits 5–10 performers",
    amenities: [
      "Raised platform",
      "Stage lighting",
      "Mic and PA inputs",
      "Sightlines from Main Hall and Upper Lounge",
    ],
    map: { x: 60, y: 14, w: 18, h: 10 },
    gallery: ["/placeholders/stage-1.jpg"],
    emoji: "🎙️",
  },
  {
    id: "upper-lounge",
    name: "Upper-Level Lounge / DJ Area",
    shortName: "Upper Lounge",
    category: "event",
    positioning:
      "Perfect for VIP seating, DJ setup, media control, viewing area, networking lounge, private guest section, and elevated event experience.",
    bestUses: [
      "VIP seating",
      "DJ setup",
      "Media control",
      "Viewing area",
      "Networking lounge",
      "Private guest section",
      "Elevated event experience",
    ],
    capacity: "Up to 30 guests",
    amenities: [
      "Overlook of Main Hall",
      "DJ booth area",
      "Lounge seating",
      "Private guest list option",
    ],
    map: { x: 76, y: 14, w: 20, h: 18 },
    gallery: ["/placeholders/lounge-1.jpg"],
    emoji: "🎧",
  },
  {
    id: "podcast-room",
    name: "Podcast Room",
    shortName: "Podcast",
    category: "creative",
    positioning:
      "Perfect for podcast recording, interviews, YouTube content, livestreams, creator sessions, brand storytelling, business content, and panel-style conversations.",
    bestUses: [
      "Podcast recording",
      "Interviews",
      "YouTube content",
      "Livestreams",
      "Creator sessions",
      "Brand storytelling",
      "Business content",
      "Panel-style conversations",
    ],
    capacity: "Up to 4 hosts/guests",
    amenities: [
      "Acoustic treatment",
      "Multi-cam ready",
      "Branded backdrop options",
      "Livestream-capable internet",
    ],
    map: { x: 80, y: 36, w: 16, h: 14 },
    gallery: ["/placeholders/podcast-1.jpg"],
    emoji: "🎬",
  },
  {
    id: "boardroom",
    name: "Boardroom",
    shortName: "Boardroom",
    category: "business",
    positioning:
      "Perfect for business meetings, nonprofit meetings, strategy sessions, team trainings, private consultations, workshops, investor meetings, and planning sessions.",
    bestUses: [
      "Business meetings",
      "Nonprofit meetings",
      "Strategy sessions",
      "Team trainings",
      "Private consultations",
      "Workshops",
      "Investor meetings",
      "Planning sessions",
    ],
    capacity: "Up to 12 seated",
    amenities: [
      "Conference table",
      "Wall-mounted display",
      "Video-conference ready",
      "Whiteboard",
      "Private door",
    ],
    map: { x: 80, y: 52, w: 16, h: 14 },
    gallery: ["/placeholders/boardroom-1.jpg"],
    emoji: "💼",
  },
  {
    id: "recording-studio",
    name: "Recording Studio",
    shortName: "Studio",
    category: "creative",
    positioning:
      "Perfect for artists, voiceover, music production, audio books, podcast audio, content creators, and production sessions.",
    bestUses: [
      "Artists",
      "Voiceover",
      "Music production",
      "Audio books",
      "Podcast audio",
      "Content creators",
      "Production sessions",
    ],
    capacity: "Up to 6 in the live room",
    amenities: [
      "Treated live room",
      "Control room",
      "Pro audio interface",
      "Mic locker",
      "Engineer available on request",
    ],
    map: { x: 4, y: 22, w: 16, h: 16 },
    gallery: ["/placeholders/studio-1.jpg"],
    emoji: "🎚️",
  },
  {
    id: "creative-studio",
    name: "Creative Studio / Production Room",
    shortName: "Creative Studio",
    category: "creative",
    positioning:
      "Perfect for photography, videography, content creation, product shoots, interviews, promo shoots, workshops, and editing sessions.",
    bestUses: [
      "Photography",
      "Videography",
      "Content creation",
      "Product shoots",
      "Interviews",
      "Promo shoots",
      "Workshops",
      "Editing sessions",
    ],
    capacity: "Up to 10 crew",
    amenities: [
      "Cyc wall / backdrop options",
      "Continuous lighting",
      "Power for grip gear",
      "Editing bay",
    ],
    map: { x: 4, y: 40, w: 16, h: 16 },
    gallery: ["/placeholders/creative-1.jpg"],
    emoji: "📸",
  },
  {
    id: "offices",
    name: "Offices / Flex Rooms",
    shortName: "Offices",
    category: "business",
    positioning:
      "Perfect for entrepreneurs, coaches, consultants, nonprofits, tutoring, private calls, admin days, remote work, and small team sessions.",
    bestUses: [
      "Entrepreneurs",
      "Coaches",
      "Consultants",
      "Nonprofits",
      "Tutoring",
      "Private calls",
      "Admin days",
      "Remote work",
      "Small team sessions",
    ],
    capacity: "1–6 per room",
    amenities: [
      "Lockable doors",
      "Wi-Fi",
      "Desks and seating",
      "Day-pass or monthly options",
    ],
    map: { x: 22, y: 22, w: 18, h: 18 },
    gallery: ["/placeholders/offices-1.jpg"],
    emoji: "🏢",
  },
  {
    id: "back-studio",
    name: "Back Studio / Smaller Studio",
    shortName: "Back Studio",
    category: "creative",
    positioning:
      "A more intimate creative room for solo sessions, smaller content shoots, and focused work.",
    bestUses: [
      "Solo recording",
      "Small interviews",
      "Tutorials",
      "Voice work",
      "Coaching content",
    ],
    capacity: "Up to 3",
    amenities: [
      "Acoustic treatment",
      "Compact production setup",
      "Tucked-away privacy",
    ],
    map: { x: 22, y: 42, w: 18, h: 14 },
    gallery: ["/placeholders/back-studio-1.jpg"],
    emoji: "🎛️",
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    shortName: "Bathrooms",
    category: "event",
    positioning: "Guest restrooms located on the main level.",
    bestUses: [],
    capacity: "Multi-stall",
    amenities: ["ADA accessible", "Conveniently located off Main Hall"],
    map: { x: 22, y: 58, w: 18, h: 8 },
    gallery: [],
    emoji: "🚻",
  },
];

export const getSpaceById = (id: string) => spaces.find((s) => s.id === id);
