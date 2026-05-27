// =============================================================================
// BOOKING URL RESOLVER
// Maps a space id (or "tour" / "partner" / nothing) to a GHL widget URL.
// Handles aliasing — e.g. stage → main-hall — and falls back to the default
// calendar when a per-room widget hasn't been configured yet.
// =============================================================================

import { siteConfig } from "@/data/config";
import { getSpaceById } from "@/data/spaces";

const WIDGET_BASE = "https://api.leadconnectorhq.com/widget/booking/";

export type ResolvedCalendar = {
  /** Full iframe URL ready for the GHLCalendar component. */
  url: string;
  /** True when this URL is the per-room calendar (not the default fallback). */
  isDedicated: boolean;
  /** Final space id this resolved to (after any aliasing). */
  spaceId: string | null;
  /** Human-readable display name for the space, if any. */
  spaceName: string | null;
  /** The widget ID that was actually used. */
  widgetId: string;
};

function widgetUrl(idOrUrl: string): string {
  if (/^https?:\/\//i.test(idOrUrl)) return idOrUrl;
  return WIDGET_BASE + idOrUrl;
}

/**
 * Resolve a calendar for a given space id (or undefined for the default).
 * Aliases (a value in bySpace that matches another key) are followed up to
 * a small depth so we don't loop forever on a misconfiguration.
 */
export function calendarUrlForSpace(spaceId?: string | null): ResolvedCalendar {
  const def = siteConfig.booking.default;

  if (!spaceId) {
    return {
      url: widgetUrl(def),
      isDedicated: false,
      spaceId: null,
      spaceName: null,
      widgetId: def,
    };
  }

  const map: Record<string, string | null> = siteConfig.booking.bySpace;
  const seen = new Set<string>();
  let current: string | null = spaceId;
  // Walk aliases up to 4 hops, plenty for any sane config
  for (let i = 0; i < 4 && current; i++) {
    if (seen.has(current)) break;
    seen.add(current);
    const entry: string | null | undefined = map[current];
    if (entry == null) {
      return {
        url: widgetUrl(def),
        isDedicated: false,
        spaceId: current,
        spaceName: getSpaceById(current)?.name ?? null,
        widgetId: def,
      };
    }
    // Alias if the value matches another space key
    if (entry in map) {
      current = entry;
      continue;
    }
    // Otherwise it's a real widget id (or full URL)
    return {
      url: widgetUrl(entry),
      isDedicated: true,
      spaceId: current,
      spaceName: getSpaceById(current)?.name ?? null,
      widgetId: entry,
    };
  }

  return {
    url: widgetUrl(def),
    isDedicated: false,
    spaceId,
    spaceName: getSpaceById(spaceId)?.name ?? null,
    widgetId: def,
  };
}

export function tourCalendar(): ResolvedCalendar {
  const id = siteConfig.booking.tour ?? siteConfig.booking.default;
  return {
    url: widgetUrl(id),
    isDedicated: id !== siteConfig.booking.default,
    spaceId: null,
    spaceName: "Tour",
    widgetId: id,
  };
}

export function partnerCalendar(): ResolvedCalendar {
  const id = siteConfig.booking.partner ?? siteConfig.booking.default;
  return {
    url: widgetUrl(id),
    isDedicated: id !== siteConfig.booking.default,
    spaceId: null,
    spaceName: "Partner intro",
    widgetId: id,
  };
}
