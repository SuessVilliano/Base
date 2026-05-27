// =============================================================================
// GALLERY DATA
// Organized by area. Replace placeholder paths with real images
// under /public/gallery/<area>/.
// =============================================================================

export type GalleryItem = {
  src: string;
  alt: string;
  area: GalleryArea;
};

export type GalleryArea =
  | "Exterior / Parking Lot"
  | "Courtyard"
  | "Main Hall"
  | "Stage"
  | "Upper Level"
  | "Podcast Room"
  | "Boardroom"
  | "Studios"
  | "Offices"
  | "Events";

// TODO: Replace each src with real photo paths once available.
export const galleryItems: GalleryItem[] = [
  { src: "/placeholders/exterior-1.jpg", alt: "BASE exterior on Church Street", area: "Exterior / Parking Lot" },
  { src: "/placeholders/exterior-2.jpg", alt: "Outdoor event lot setup", area: "Exterior / Parking Lot" },
  { src: "/placeholders/courtyard-1.jpg", alt: "Courtyard mixer setup", area: "Courtyard" },
  { src: "/placeholders/courtyard-2.jpg", alt: "Courtyard string lighting", area: "Courtyard" },
  { src: "/placeholders/main-hall-1.jpg", alt: "Main Event Hall set for a panel", area: "Main Hall" },
  { src: "/placeholders/main-hall-2.jpg", alt: "Main Event Hall set for a concert", area: "Main Hall" },
  { src: "/placeholders/stage-1.jpg", alt: "Stage with theatrical lighting", area: "Stage" },
  { src: "/placeholders/upper-1.jpg", alt: "Upper-level lounge overlook", area: "Upper Level" },
  { src: "/placeholders/podcast-1.jpg", alt: "Podcast room setup", area: "Podcast Room" },
  { src: "/placeholders/boardroom-1.jpg", alt: "Boardroom meeting", area: "Boardroom" },
  { src: "/placeholders/studio-1.jpg", alt: "Recording studio live room", area: "Studios" },
  { src: "/placeholders/creative-1.jpg", alt: "Creative studio production setup", area: "Studios" },
  { src: "/placeholders/offices-1.jpg", alt: "Flex office room", area: "Offices" },
  { src: "/placeholders/event-1.jpg", alt: "Community event at BASE", area: "Events" },
  { src: "/placeholders/event-2.jpg", alt: "Artist showcase night", area: "Events" },
];

export const galleryAreas: GalleryArea[] = [
  "Exterior / Parking Lot",
  "Courtyard",
  "Main Hall",
  "Stage",
  "Upper Level",
  "Podcast Room",
  "Boardroom",
  "Studios",
  "Offices",
  "Events",
];
