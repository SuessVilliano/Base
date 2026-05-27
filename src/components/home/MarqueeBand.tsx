const items = [
  "Event Venue",
  "Recording Studio",
  "Podcast Studio",
  "Coworking",
  "Vendor Markets",
  "Food Truck Events",
  "Community Forums",
  "Workshops",
  "Showcases",
  "Brand Activations",
  "Youth Programs",
  "Networking",
  "Corporate Off-sites",
];

export function MarqueeBand() {
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-base-black py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {list.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="mx-8 inline-flex items-center gap-4 font-display text-lg font-medium text-base-paper sm:text-2xl"
          >
            {label}
            <span aria-hidden className="text-base-blue">●</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base-black to-transparent" />
    </div>
  );
}
