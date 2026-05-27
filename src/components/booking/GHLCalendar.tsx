"use client";

import { useState } from "react";
import Script from "next/script";
import { Calendar } from "lucide-react";

type Props = {
  src: string;
  title?: string;
  height?: number;
};

// =============================================================================
// GHL CALENDAR EMBED
// Renders a GoHighLevel calendar widget. The accompanying form_embed.js loader
// auto-resizes the iframe to fit its contents — without it, the widget shows
// a vertical scrollbar.
// =============================================================================
export function GHLCalendar({ src, title = "Booking calendar", height = 720 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = src.includes("REPLACE_WITH_GHL");

  if (isPlaceholder) {
    return (
      <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-white/10 bg-base-ink p-8 text-center">
        <span className="rounded-full border border-base-blue/30 bg-base-blue/10 p-3 text-base-blue">
          <Calendar size={20} />
        </span>
        <h3 className="font-display text-xl text-white">
          GoHighLevel calendar will load here
        </h3>
        <p className="max-w-md text-sm text-base-fog">
          Paste the real GHL widget URL into{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-base-blue">
            src/data/config.ts
          </code>{" "}
          to enable live booking.
        </p>
      </div>
    );
  }

  // Derive a stable id from the widget URL so GHL's resizer can target it
  const widgetId = src.split("/").pop() ?? "ghl-widget";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-ink">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-ink text-sm text-base-fog">
          Loading calendar…
        </div>
      )}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        id={widgetId}
        onLoad={() => setLoaded(true)}
        scrolling="no"
        className="block w-full"
        style={{ width: "100%", height: `${height}px`, border: 0, overflow: "hidden" }}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
