// =============================================================================
// AVAILABILITY (server-only)
//
// For each space in siteConfig.booking.bySpace we ask GHL:
//   1. GET /calendars/{calendarId}/free-slots   → which slots are open
//   2. GET /calendars/events/appointments       → which appointments exist
// We collapse the result into a per-space status:
//   • "available" — slots open, no bookings yet
//   • "pending"   — partial bookings OR appointments awaiting confirmation
//   • "booked"    — no free slots for the requested date
//   • "unknown"   — no calendar configured / no PIT / GHL request failed
//
// Aliased spaces (stage, upper-lounge, back-studio) inherit their target's
// status, so the map always shows a status for every clickable room.
// =============================================================================

import "server-only";
import { siteConfig } from "@/data/config";

export type AvailabilityStatus =
  | "available"
  | "pending"
  | "booked"
  | "unknown";

export type SpaceAvailability = {
  status: AvailabilityStatus;
  freeSlots: number;
  bookedSlots: number;
  pendingSlots: number;
  /** Earliest free slot ISO string for the day, if any */
  nextOpen: string | null;
};

export type AvailabilityReport = {
  date: string; // YYYY-MM-DD in TIMEZONE
  timezone: string;
  generatedAt: string; // ISO
  statuses: Record<string, SpaceAvailability>;
  /** True when the PIT token is missing — caller should hide live colors */
  unconfigured: boolean;
};

const TIMEZONE = "America/New_York";
const API_BASE = siteConfig.ghl.apiBase;
const API_VERSION = "2021-04-15";

// In-memory cache: 60s TTL keyed by date.
type CacheEntry = { value: AvailabilityReport; expires: number };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 60_000;

function startOfDayMs(date: string): number {
  // date is YYYY-MM-DD in TIMEZONE; convert to ms-since-epoch at midnight ET.
  // We use Intl to compute the ET offset on the requested date so DST works.
  const [y, m, d] = date.split("-").map(Number);
  // Build a Date object whose UTC components are noon on that date, then
  // back out the timezone offset for that exact day.
  const noonUtc = Date.UTC(y, m - 1, d, 12, 0, 0);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    timeZoneName: "shortOffset",
  });
  const parts = fmt.formatToParts(new Date(noonUtc));
  const offsetStr = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-5";
  const match = offsetStr.match(/GMT([+-]\d+)(?::?(\d+))?/);
  const offsetHours = match ? parseInt(match[1], 10) : -5;
  const offsetMinutes = match && match[2] ? parseInt(match[2], 10) : 0;
  const totalOffsetMin = offsetHours * 60 + Math.sign(offsetHours) * offsetMinutes;
  // Midnight ET in UTC ms:
  return Date.UTC(y, m - 1, d, 0, 0, 0) - totalOffsetMin * 60_000;
}

function endOfDayMs(date: string): number {
  return startOfDayMs(date) + 24 * 60 * 60 * 1000 - 1;
}

function todayInTimezone(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date()); // en-CA renders YYYY-MM-DD
}

/**
 * Collect the unique calendar IDs we need to query, with a back-map from
 * calendar ID → list of space IDs that use it.
 */
function collectCalendars(): {
  calendarIds: string[];
  bySpace: Map<string, string>;
  calendarToSpaces: Map<string, string[]>;
} {
  const bySpaceMap = siteConfig.booking.bySpace;
  const spaceToCal = new Map<string, string>();
  const calendarToSpaces = new Map<string, string[]>();

  // Resolve aliases (a value matching another key follows it).
  for (const spaceId of Object.keys(bySpaceMap)) {
    let current: string | null = spaceId;
    const seen = new Set<string>();
    for (let i = 0; i < 4 && current; i++) {
      if (seen.has(current)) break;
      seen.add(current);
      const v: string | null | undefined = bySpaceMap[current];
      if (v == null) {
        current = null;
        break;
      }
      if (v in bySpaceMap) {
        current = v;
        continue;
      }
      // Real widget id
      spaceToCal.set(spaceId, v);
      const list = calendarToSpaces.get(v) ?? [];
      list.push(spaceId);
      calendarToSpaces.set(v, list);
      break;
    }
  }

  return {
    calendarIds: Array.from(calendarToSpaces.keys()),
    bySpace: spaceToCal,
    calendarToSpaces,
  };
}

type FreeSlotsResponse = Record<string, { slots?: string[] } | string | undefined>;

async function ghlGet<T>(
  path: string,
  token: string,
  searchParams: Record<string, string | number>,
): Promise<T | null> {
  const url = new URL(path, API_BASE);
  for (const [k, v] of Object.entries(searchParams)) {
    url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Version: API_VERSION,
      Accept: "application/json",
    },
    // Next will memoize identical requests within a render but our caller
    // also caches the assembled report; no-store is safest.
    cache: "no-store",
  });
  if (!res.ok) {
    // Don't blow up the whole page if one calendar is misconfigured.
    return null;
  }
  return (await res.json()) as T;
}

async function fetchCalendarStatus(
  calendarId: string,
  date: string,
  token: string,
): Promise<SpaceAvailability> {
  const startMs = startOfDayMs(date);
  const endOfDay = endOfDayMs(date);
  // Look ahead two weeks so we can still surface "next open" in the modal
  // even when the selected day has no online slots (lead-time effect).
  const endMs = startMs + 14 * 24 * 60 * 60 * 1000 - 1;

  // 1) Free slots for the window.
  const free = await ghlGet<FreeSlotsResponse>(
    `/calendars/${calendarId}/free-slots`,
    token,
    { startDate: startMs, endDate: endMs, timezone: TIMEZONE },
  );

  const dayEntry = free?.[date];
  const slotsToday: string[] =
    dayEntry && typeof dayEntry === "object" && Array.isArray(dayEntry.slots)
      ? dayEntry.slots
      : [];

  // Find the earliest slot anywhere in the 14-day window.
  let nextOpen: string | null = null;
  if (free && typeof free === "object") {
    const candidates: string[] = [];
    for (const v of Object.values(free)) {
      if (v && typeof v === "object" && Array.isArray(v.slots) && v.slots.length) {
        candidates.push(v.slots[0]);
      }
    }
    candidates.sort();
    nextOpen = candidates[0] ?? null;
  }

  const freeCount = slotsToday.length;
  void endOfDay;

  // 2) Appointments for the day. GHL counts confirmed + pending here.
  type Appt = { appointmentStatus?: string; status?: string };
  const appts = await ghlGet<{ events?: Appt[]; appointments?: Appt[] }>(
    `/calendars/events`,
    token,
    {
      locationId: siteConfig.ghl.locationId,
      calendarId,
      startTime: startMs,
      endTime: endMs,
    },
  );

  const apptList = appts?.events ?? appts?.appointments ?? [];
  let bookedSlots = 0;
  let pendingSlots = 0;
  for (const a of apptList) {
    const s = (a.appointmentStatus ?? a.status ?? "").toLowerCase();
    if (s === "cancelled" || s === "noshow" || s === "invalid") continue;
    if (s === "new" || s === "pending" || s === "unconfirmed") {
      pendingSlots += 1;
    } else {
      bookedSlots += 1;
    }
  }

  // Status truth table for the selected date:
  //   slots>0 + no appts          → available (open & nothing taken yet)
  //   slots>0 + appts             → pending   (partially booked)
  //   slots==0 + appts            → booked    (no online room left)
  //   slots==0 + no appts         → unknown   (no online window today —
  //                                            could be lead-time, not booked)
  let status: AvailabilityStatus;
  const apptsTotal = bookedSlots + pendingSlots;
  if (freeCount === 0 && apptsTotal === 0) {
    status = "unknown";
  } else if (freeCount === 0) {
    status = "booked";
  } else if (apptsTotal > 0) {
    status = "pending";
  } else {
    status = "available";
  }

  return { status, freeSlots: freeCount, bookedSlots, pendingSlots, nextOpen };
}

/**
 * Build an availability report for a date (defaults to today in ET).
 * Cached in-memory for 60s per date.
 */
export async function getAvailability(
  dateInput?: string,
): Promise<AvailabilityReport> {
  const date = dateInput && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ? dateInput
    : todayInTimezone();

  const hit = cache.get(date);
  if (hit && hit.expires > Date.now()) return hit.value;

  const token = process.env.GHL_PIT_TOKEN;
  const { calendarIds, bySpace, calendarToSpaces } = collectCalendars();
  const allSpaces = Object.keys(siteConfig.booking.bySpace);

  if (!token) {
    const statuses: Record<string, SpaceAvailability> = {};
    for (const id of allSpaces) {
      statuses[id] = {
        status: "unknown",
        freeSlots: 0,
        bookedSlots: 0,
        pendingSlots: 0,
        nextOpen: null,
      };
    }
    return {
      date,
      timezone: TIMEZONE,
      generatedAt: new Date().toISOString(),
      statuses,
      unconfigured: true,
    };
  }

  const perCalendar = await Promise.all(
    calendarIds.map(async (cid) => [cid, await fetchCalendarStatus(cid, date, token)] as const),
  );
  const calStatus = new Map(perCalendar);

  const statuses: Record<string, SpaceAvailability> = {};
  for (const spaceId of allSpaces) {
    const cid = bySpace.get(spaceId);
    if (!cid) {
      statuses[spaceId] = {
        status: "unknown",
        freeSlots: 0,
        bookedSlots: 0,
        pendingSlots: 0,
        nextOpen: null,
      };
      continue;
    }
    const s = calStatus.get(cid);
    statuses[spaceId] = s ?? {
      status: "unknown",
      freeSlots: 0,
      bookedSlots: 0,
      pendingSlots: 0,
      nextOpen: null,
    };
  }

  const report: AvailabilityReport = {
    date,
    timezone: TIMEZONE,
    generatedAt: new Date().toISOString(),
    statuses,
    unconfigured: false,
  };

  cache.set(date, { value: report, expires: Date.now() + TTL_MS });
  // Avoid unbounded cache growth.
  if (cache.size > 32) {
    const oldest = Array.from(cache.entries()).sort((a, b) => a[1].expires - b[1].expires)[0];
    if (oldest) cache.delete(oldest[0]);
  }
  // Reference so eslint/tsc don't complain about unused destructure.
  void calendarToSpaces;
  return report;
}
