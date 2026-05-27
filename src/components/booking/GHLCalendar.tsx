"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

type Props = {
  src: string;
  title?: string;
  height?: number;
};

// =============================================================================
// GHL CALENDAR EMBED
// Pass in a GoHighLevel calendar/widget URL from siteConfig.booking.*
// The placeholder URLs in src/data/config.ts must be swapped for real ones.
// =============================================================================
export function GHLCalendar({ src, title = "Booking calendar", height = 720 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = src.includes("REPLACE_WITH_GHL");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-ink">
      {isPlaceholder && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="rounded-full border border-base-blue/30 bg-base-blue/10 p-3 text-base-blue">
            <Calendar size={20} />
          </span>
          <h3 className="font-display text-xl text-white">
            GoHighLevel calendar will load here
          </h3>
          <p className="max-w-md text-sm text-base-fog">
            This is a placeholder. Paste the real GHL widget URL into{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-base-blue">
              src/data/config.ts
            </code>{" "}
            to enable live booking.
          </p>
        </div>
      )}
      {!isPlaceholder && !loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-ink text-sm text-base-fog">
          Loading calendar…
        </div>
      )}
      <iframe
        src={isPlaceholder ? "about:blank" : src}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="block w-full"
        style={{ height: `${height}px`, border: 0 }}
      />
    </div>
  );
}
