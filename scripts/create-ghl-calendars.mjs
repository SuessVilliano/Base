// =============================================================================
// GHL CALENDAR PROVISIONER
//
// Creates the per-room BASE booking calendars in GoHighLevel using a PIT.
//
// Usage:
//   GHL_PIT_TOKEN=pit-... node scripts/create-ghl-calendars.mjs
//   GHL_PIT_TOKEN=pit-... node scripts/create-ghl-calendars.mjs --apply
//
// Without --apply we print every payload we'd POST but do not call the API
// for mutations. With --apply, calendars are created (and idempotency is
// best-effort — duplicate slugs are skipped).
//
// Env:
//   GHL_PIT_TOKEN     required — Private Integration Token (pit-...)
//   GHL_LOCATION_ID   optional — defaults to BASE's location
//   GHL_OWNER_EMAIL   optional — calendar owner (default: cfullman.base@gmail.com)
// =============================================================================

import { writeFileSync } from "node:fs";

const TOKEN = process.env.GHL_PIT_TOKEN;
const LOCATION = process.env.GHL_LOCATION_ID || "nxMcQTjRPDUhC92RKGiK";
const OWNER_EMAIL = (process.env.GHL_OWNER_EMAIL || "cfullman.base@gmail.com")
  .toLowerCase();
const API = "https://services.leadconnectorhq.com";
const apply = process.argv.includes("--apply");

if (!TOKEN) {
  console.error("ERROR: GHL_PIT_TOKEN env var is required.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Calendar specs — one entry per intended calendar.
// `spaceId` matches the keys in siteConfig.booking.bySpace.
// minBookingMinutes is enforced via slotDuration × N; we use slotDuration
// for the discrete slot and rely on GHL UI to optionally enforce minimum.
// ---------------------------------------------------------------------------
// GHL wants one openHours entry per day, with daysOfTheWeek=[<day>].
// Day numbering is Sunday=0 ... Saturday=6 (JS Date convention).
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
const hoursForAllDays = (openHour, openMinute, closeHour, closeMinute) =>
  ALL_DAYS.map((d) => ({
    daysOfTheWeek: [d],
    hours: [{ openHour, openMinute, closeHour, closeMinute }],
  }));
const STANDARD_HOURS = hoursForAllDays(9, 0, 22, 0);
const EXTENDED_HOURS = hoursForAllDays(8, 0, 23, 0);

const calendars = [
  {
    spaceId: "main-hall",
    name: "BASE — Main Event Hall",
    slug: "base-main-hall",
    description:
      "Book BASE Main Event Hall (includes Stage + Upper Lounge). 4-hour minimum on weekends.",
    color: "#1E5BFF",
    slot: 60,
    buffer: 120,
    leadHours: 24 * 7, // 7 days
    bookForDays: 365,
    eventTitle: "Main Hall Booking — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "courtyard",
    name: "BASE — Courtyard",
    slug: "base-courtyard",
    description:
      "Book the BASE outdoor courtyard for mixers, photo moments, or pre-event check-ins.",
    color: "#4C7BFF",
    slot: 60,
    buffer: 30,
    leadHours: 24 * 3,
    bookForDays: 180,
    eventTitle: "Courtyard Booking — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "parking-lot",
    name: "BASE — Outdoor Event Lot",
    slug: "base-outdoor-lot",
    description:
      "Reserve the BASE outdoor lot for food trucks, vendor markets, car meets, and pop-ups.",
    color: "#4C7BFF",
    slot: 60,
    buffer: 30,
    leadHours: 24 * 3,
    bookForDays: 180,
    eventTitle: "Outdoor Lot Booking — {{contact.name}}",
    openHours: EXTENDED_HOURS,
  },
  {
    spaceId: "podcast-room",
    name: "BASE — Podcast Room",
    slug: "base-podcast-room",
    description:
      "Book the BASE Podcast Room for interviews, livestreams, creator sessions, and panel-style recordings.",
    color: "#1E5BFF",
    slot: 60,
    buffer: 30,
    leadHours: 24,
    bookForDays: 90,
    eventTitle: "Podcast Room — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "recording-studio",
    name: "BASE — Recording Studio",
    slug: "base-recording-studio",
    description:
      "Book the BASE Recording Studio for music production, voiceover, podcast audio, and content sessions.",
    color: "#1E5BFF",
    slot: 60,
    buffer: 30,
    leadHours: 24,
    bookForDays: 90,
    eventTitle: "Recording Studio — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "creative-studio",
    name: "BASE — Creative Studio",
    slug: "base-creative-studio",
    description:
      "Book the BASE Creative Studio for photography, videography, content days, and product shoots.",
    color: "#1E5BFF",
    slot: 60,
    buffer: 30,
    leadHours: 24,
    bookForDays: 90,
    eventTitle: "Creative Studio — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "boardroom",
    name: "BASE — Boardroom",
    slug: "base-boardroom",
    description:
      "Book the BASE Boardroom for business meetings, planning sessions, strategy, and investor calls.",
    color: "#789BFF",
    slot: 30,
    buffer: 15,
    leadHours: 24,
    bookForDays: 60,
    eventTitle: "Boardroom — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "offices",
    name: "BASE — Offices / Flex Rooms",
    slug: "base-offices",
    description:
      "Book a BASE flex room or office for day-passes, private calls, tutoring, and small team sessions.",
    color: "#A4BCFF",
    slot: 30,
    buffer: 15,
    leadHours: 12,
    bookForDays: 60,
    eventTitle: "Office / Flex — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  // Utility calendars
  {
    spaceId: "__tour__",
    name: "BASE — Schedule a Tour",
    slug: "base-schedule-a-tour",
    description:
      "Tour the BASE campus in Wilmington. See every space and meet the team.",
    color: "#1E5BFF",
    slot: 30,
    buffer: 0,
    leadHours: 12,
    bookForDays: 60,
    eventTitle: "BASE Tour — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
  {
    spaceId: "__partner__",
    name: "BASE — Partner Intro Call",
    slug: "base-partner-intro",
    description:
      "Intro call to explore partnership, sponsorship, or programming opportunities with BASE.",
    color: "#1E5BFF",
    slot: 30,
    buffer: 0,
    leadHours: 12,
    bookForDays: 60,
    eventTitle: "Partner Intro — {{contact.name}}",
    openHours: STANDARD_HOURS,
  },
];

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------
async function ghl(path, { method = "GET", body, version = "2021-07-28" } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Version: version,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let parsed;
  try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }
  return { ok: res.ok, status: res.status, body: parsed };
}

async function listUsers() {
  // Try the documented endpoint first; fall back if not allowed
  const r = await ghl(`/users/?locationId=${LOCATION}`);
  if (r.ok) return r.body?.users ?? [];
  console.error("listUsers failed:", r.status, r.body);
  return [];
}

async function listCalendars() {
  const r = await ghl(`/calendars/?locationId=${LOCATION}`, {
    version: "2021-04-15",
  });
  if (r.ok) return r.body?.calendars ?? [];
  console.error("listCalendars failed:", r.status, r.body);
  return [];
}

function buildPayload(spec, userId) {
  return {
    locationId: LOCATION,
    teamMembers: userId ? [{ userId, priority: 1, isPrimary: true }] : [],
    eventType: "RoundRobin_OptimizeForAvailability",
    calendarType: "round_robin",
    name: spec.name,
    description: spec.description,
    slug: spec.slug,
    widgetSlug: spec.slug,
    widgetType: "default",
    eventTitle: spec.eventTitle,
    eventColor: spec.color,
    slotDuration: spec.slot,
    slotDurationUnit: "mins",
    slotInterval: spec.slot,
    slotIntervalUnit: "mins",
    slotBuffer: spec.buffer,
    slotBufferUnit: "mins",
    preBuffer: 0,
    preBufferUnit: "mins",
    appoinmentPerSlot: 1,
    appoinmentPerDay: 12,
    allowBookingAfter: spec.leadHours,
    allowBookingAfterUnit: "hours",
    allowBookingFor: spec.bookForDays,
    allowBookingForUnit: "days",
    openHours: spec.openHours,
    enableRecurring: false,
    stickyContact: true,
    isLivePaymentMode: false,
    autoConfirm: true,
    shouldSendAlertEmailsToAssignedMember: true,
    googleInvitationEmails: true,
    allowReschedule: true,
    allowCancellation: true,
    shouldAssignContactToTeamMember: true,
    notes: "",
    availabilityType: 0,
  };
}

async function createCalendar(payload) {
  return ghl("/calendars/", {
    method: "POST",
    version: "2021-04-15",
    body: payload,
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  console.log(`\n=== BASE GHL Calendar Provisioner ===`);
  console.log(`Location:  ${LOCATION}`);
  console.log(`Owner:     ${OWNER_EMAIL}`);
  console.log(`Mode:      ${apply ? "APPLY (mutations enabled)" : "DRY RUN"}`);

  // 1. Find owner userId
  const users = await listUsers();
  console.log(`\nUsers in location: ${users.length}`);
  const owner = users.find(
    (u) => (u.email || "").toLowerCase() === OWNER_EMAIL,
  );
  if (!owner) {
    console.warn(
      `\n  ! Could not find user ${OWNER_EMAIL}. Calendars will be created without an assigned team member.`,
    );
    console.warn(`    Known emails:`, users.map((u) => u.email).join(", "));
  } else {
    console.log(`Found owner: ${owner.firstName} ${owner.lastName} (${owner.id})`);
  }
  const ownerId = owner?.id;

  // 2. Existing calendars (skip dupes by slug)
  const existing = await listCalendars();
  const existingBySlug = new Map(existing.map((c) => [c.slug || c.widgetSlug, c]));
  console.log(`\nExisting calendars: ${existing.length}`);
  if (existing.length) {
    existing.forEach((c) =>
      console.log(`  • ${c.name} (id=${c.id}, slug=${c.slug || c.widgetSlug})`),
    );
  }

  // 3. Create each
  const results = [];
  for (const spec of calendars) {
    const dupe = existingBySlug.get(spec.slug);
    if (dupe) {
      console.log(
        `\n  ↺ ${spec.name} — already exists (id=${dupe.id}), reusing.`,
      );
      results.push({ spec, id: dupe.id, status: "exists" });
      continue;
    }
    const payload = buildPayload(spec, ownerId);
    console.log(`\n  → ${spec.name}`);
    console.log(
      `    slot ${spec.slot}min · buffer ${spec.buffer}min · lead ${spec.leadHours}h`,
    );
    if (!apply) {
      results.push({ spec, status: "dry-run" });
      continue;
    }
    const r = await createCalendar(payload);
    if (r.ok) {
      const id = r.body?.calendar?.id ?? r.body?.id ?? null;
      console.log(`    ✓ created (id=${id})`);
      results.push({ spec, id, status: "created" });
    } else {
      console.error(`    ✗ failed (${r.status}):`, r.body);
      results.push({ spec, status: "error", error: r.body });
    }
  }

  // 4. Emit a config snippet
  const idLines = results
    .filter((r) => r.id)
    .map((r) =>
      r.spec.spaceId.startsWith("__")
        ? `${r.spec.spaceId.replace(/__/g, "")}: "${r.id}",`
        : `"${r.spec.spaceId}": "${r.id}",`,
    );

  console.log(`\n\n=== Config snippet for src/data/config.ts ===`);
  console.log(`booking: {`);
  console.log(`  default: "<your master cal id>",`);
  for (const line of idLines) console.log(`  ${line}`);
  console.log(`}`);

  writeFileSync(
    "scripts/ghl-results.json",
    JSON.stringify({ results, ownerId, apply, ts: Date.now() }, null, 2),
  );
  console.log(`\nWrote scripts/ghl-results.json`);
})();
