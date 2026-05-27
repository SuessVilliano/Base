"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Info } from "lucide-react";
import clsx from "clsx";
import { GHLCalendar } from "./GHLCalendar";
import { spaces } from "@/data/spaces";
import { calendarUrlForSpace } from "@/lib/booking";

// =============================================================================
// SPACE CALENDAR SWITCHER
// Reads ?space=<id> from the URL, renders a chip selector for every
// bookable room, and embeds the matching GHL calendar.
//
// When a space doesn't yet have its own widget ID, calendarUrlForSpace()
// falls back to the default calendar and we surface that to the visitor
// with a small notice so they know we'll route their booking manually.
// =============================================================================

// Spaces that aren't bookable directly via calendar (or are part of a
// bundled rental) are excluded from the selector grid.
const HIDDEN_FROM_PICKER = new Set([
  "bathrooms",
  "stage", // bundled with main-hall
  "upper-lounge", // bundled with main-hall
  "back-studio", // bundled with recording-studio
]);

export function SpaceCalendarSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSpace = searchParams.get("space");

  // Local state for the active selection, seeded from the URL on mount
  const [active, setActive] = useState<string | null>(urlSpace);

  // Keep state in sync if the URL changes via back/forward navigation
  useEffect(() => {
    setActive(urlSpace);
  }, [urlSpace]);

  const pickerSpaces = useMemo(
    () => spaces.filter((s) => !HIDDEN_FROM_PICKER.has(s.id)),
    [],
  );

  const resolved = useMemo(() => calendarUrlForSpace(active), [active]);

  function select(id: string | null) {
    setActive(id);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (id) params.set("space", id);
    else params.delete("space");
    const qs = params.toString();
    router.replace(qs ? `/book?${qs}` : "/book", { scroll: false });
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => select(null)}
          className={chipClass(active === null)}
        >
          All spaces
        </button>
        {pickerSpaces.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => select(s.id)}
            className={chipClass(active === s.id)}
            aria-pressed={active === s.id}
          >
            <span aria-hidden className="mr-1.5">
              {s.emoji}
            </span>
            {s.shortName}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {resolved.spaceName && (
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl text-base-paper">
              {resolved.spaceName}
            </h3>
            {resolved.isDedicated ? (
              <span className="rounded-full bg-base-blue/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-base-blue">
                Dedicated calendar
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-base-fog">
                <Info size={11} />
                Shared booking · we'll confirm the room
              </span>
            )}
          </div>
        )}

        <GHLCalendar
          src={resolved.url}
          title={
            resolved.spaceName
              ? `Book ${resolved.spaceName}`
              : "Book a space at BASE"
          }
        />

        {!resolved.isDedicated && resolved.spaceName && (
          <p className="mt-3 text-[12px] leading-relaxed text-base-stone">
            A dedicated calendar for{" "}
            <span className="text-base-paper">{resolved.spaceName}</span> is
            coming soon. Book a time here and a BASE team member will confirm
            the room within one business day.
          </p>
        )}
      </div>
    </div>
  );
}

function chipClass(active: boolean) {
  return clsx(
    "inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
    active
      ? "border-base-blue bg-base-blue text-white"
      : "border-white/10 bg-white/[0.03] text-base-paper hover:border-white/30 hover:bg-white/10",
  );
}
