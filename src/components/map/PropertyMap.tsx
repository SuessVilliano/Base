"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CircleAlert,
  CircleCheck,
  CircleX,
  MapPin,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { spaces, type Space } from "@/data/spaces";
import { Placeholder } from "@/components/ui/Placeholder";
import { useAvailability } from "./useAvailability";
import type { AvailabilityStatus, SpaceAvailability } from "@/lib/availability";

// =============================================================================
// 2D INTERACTIVE PROPERTY MAP
// Click any zone (parking, gates, courtyard, rooms) to open a modal with
// details + CTAs. Room fills are tinted by today's GHL availability:
//   green   → available
//   yellow  → partially booked or pending appointments
//   red     → fully booked
//   gray    → no live data yet
// =============================================================================

type StatusKey = AvailabilityStatus;

const STATUS_FILL: Record<StatusKey, string> = {
  available: "rgba(34,197,94,0.22)",
  pending: "rgba(234,179,8,0.28)",
  booked: "rgba(239,68,68,0.32)",
  unknown: "rgba(255,255,255,0.08)",
};
const STATUS_STROKE: Record<StatusKey, string> = {
  available: "rgba(34,197,94,0.85)",
  pending: "rgba(234,179,8,0.9)",
  booked: "rgba(239,68,68,0.9)",
  unknown: "rgba(255,255,255,0.25)",
};
const STATUS_LABEL: Record<StatusKey, string> = {
  available: "Available",
  pending: "Pending",
  booked: "Booked",
  unknown: "—",
};
const STATUS_DOT: Record<StatusKey, string> = {
  available: "bg-emerald-500",
  pending: "bg-amber-400",
  booked: "bg-red-500",
  unknown: "bg-white/30",
};

const LEGEND: Array<{ key: StatusKey; label: string; description: string }> = [
  { key: "available", label: "Available", description: "Slots open today" },
  { key: "pending", label: "Pending", description: "Partial / unconfirmed" },
  { key: "booked", label: "Booked", description: "Fully reserved" },
  { key: "unknown", label: "Not booked online", description: "Inquire to confirm" },
];

function todayIso(): string {
  // YYYY-MM-DD in the user's local zone is fine for the picker; the server
  // re-normalizes to ET when computing free slots.
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function PropertyMap() {
  const [active, setActive] = useState<Space | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(todayIso());

  const { report, loading, lastUpdated } = useAvailability({
    date: selectedDate,
    refreshMs: 60_000,
  });

  const statuses = report?.statuses ?? {};

  const counts = useMemo(() => {
    const c: Record<StatusKey, number> = {
      available: 0,
      pending: 0,
      booked: 0,
      unknown: 0,
    };
    for (const s of spaces) {
      const st = statuses[s.id]?.status ?? "unknown";
      c[st] += 1;
    }
    return c;
  }, [statuses]);

  return (
    <section className="relative isolate overflow-hidden bg-base-black py-20 sm:py-28">
      <div className="container-base">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">02 / Property Map</p>
            <h2 className="h-display mt-4 text-balance text-4xl text-white sm:text-5xl">
              Every room, one view.
            </h2>
            <p className="mt-4 text-base-fog">
              Rooms are color-coded by live availability. Pick a date to see
              what&apos;s open, partially booked, or reserved — then click any
              zone to book it.
            </p>
          </div>

          <DateLegendBar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            loading={loading}
            lastUpdated={lastUpdated}
            counts={counts}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* MAP */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-ink p-3 sm:p-6">
            <div className="relative aspect-[5/4] w-full">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Top-down interactive map of BASE"
              >
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="2"
                  fill="#0F0F14"
                  stroke="rgba(255,255,255,0.12)"
                />

                <g transform="translate(92 6)">
                  <circle r="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.25" />
                  <text textAnchor="middle" dy="-3.5" fill="#A4A4AE" fontSize="2.4" fontFamily="Inter">
                    N
                  </text>
                  <path d="M0,-2 L0.8,1 L0,0.3 L-0.8,1 Z" fill="#1E5BFF" />
                </g>
                <text x="50" y="99.2" textAnchor="middle" fontSize="2" fill="#5C5C66" fontFamily="Inter">
                  N CHURCH ST →
                </text>

                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 10}
                    y1={2}
                    x2={i * 10}
                    y2={98}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="0.1"
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1={2}
                    y1={i * 10}
                    x2={98}
                    y2={i * 10}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="0.1"
                  />
                ))}

                {spaces.map((s) => {
                  const isHover = hovered === s.id;
                  const info = statuses[s.id];
                  const status: StatusKey = info?.status ?? "unknown";
                  const subline =
                    status === "unknown" && info?.nextOpen
                      ? `Next ${formatShortDate(info.nextOpen)}`
                      : STATUS_LABEL[status];
                  return (
                    <g
                      key={s.id}
                      onClick={() => setActive(s)}
                      onMouseEnter={() => setHovered(s.id)}
                      onMouseLeave={() => setHovered((h) => (h === s.id ? null : h))}
                      onFocus={() => setHovered(s.id)}
                      onBlur={() => setHovered((h) => (h === s.id ? null : h))}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open ${s.name} — ${STATUS_LABEL[status]}`}
                      className="cursor-pointer outline-none"
                    >
                      <rect
                        x={s.map.x}
                        y={s.map.y}
                        width={s.map.w}
                        height={s.map.h}
                        rx={1}
                        fill={STATUS_FILL[status]}
                        stroke={STATUS_STROKE[status]}
                        strokeWidth={isHover ? 0.6 : 0.3}
                        style={{
                          transition: "all 0.25s",
                          filter: isHover ? "brightness(1.35)" : "none",
                        }}
                      />
                      {status === "booked" && (
                        <g pointerEvents="none" opacity={0.55}>
                          <defs>
                            <pattern
                              id={`stripes-${s.id}`}
                              patternUnits="userSpaceOnUse"
                              width="2"
                              height="2"
                              patternTransform="rotate(45)"
                            >
                              <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="2"
                                stroke="rgba(239,68,68,0.55)"
                                strokeWidth="0.6"
                              />
                            </pattern>
                          </defs>
                          <rect
                            x={s.map.x}
                            y={s.map.y}
                            width={s.map.w}
                            height={s.map.h}
                            rx={1}
                            fill={`url(#stripes-${s.id})`}
                          />
                        </g>
                      )}
                      <circle
                        cx={s.map.x + s.map.w - 1.8}
                        cy={s.map.y + 1.8}
                        r={0.8}
                        fill={STATUS_STROKE[status]}
                        stroke="#0F0F14"
                        strokeWidth={0.2}
                        pointerEvents="none"
                      />
                      <text
                        x={s.map.x + s.map.w / 2}
                        y={s.map.y + s.map.h / 2 - 0.4}
                        textAnchor="middle"
                        fontSize="2"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        fill="#fff"
                        style={{ pointerEvents: "none" }}
                      >
                        {s.shortName}
                      </text>
                      <text
                        x={s.map.x + s.map.w / 2}
                        y={s.map.y + s.map.h / 2 + 2.2}
                        textAnchor="middle"
                        fontSize="1.5"
                        fontFamily="Inter, sans-serif"
                        fill="rgba(255,255,255,0.75)"
                        style={{ pointerEvents: "none" }}
                      >
                        {subline}
                      </text>
                    </g>
                  );
                })}

                {/* Entry gate marker between parking and courtyard */}
                <g transform="translate(42 70)">
                  <line x1="0" y1="-6" x2="0" y2="6" stroke="#1E5BFF" strokeWidth="0.6" />
                  <circle r="0.9" fill="#1E5BFF" />
                  <text x="0.6" y="-7" fontSize="1.6" fill="#A4A4AE" fontFamily="Inter">
                    Gates
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* SIDE LIST */}
          <aside className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-base-ink p-3">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="eyebrow">All zones</span>
              <span className="text-[11px] text-base-stone">{spaces.length}</span>
            </div>
            <ul className="max-h-[520px] space-y-1 overflow-y-auto pr-1">
              {spaces.map((s) => {
                const status: StatusKey = statuses[s.id]?.status ?? "unknown";
                const info = statuses[s.id];
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActive(s)}
                      onMouseEnter={() => setHovered(s.id)}
                      onMouseLeave={() => setHovered((h) => (h === s.id ? null : h))}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-transparent bg-white/0 px-3 py-2.5 text-left text-sm transition-all hover:border-white/10 hover:bg-white/5"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          aria-hidden
                          className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`}
                        />
                        <span className="truncate text-base-paper">{s.shortName}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusBadgeClass(status)}`}
                          title={
                            info
                              ? `${info.freeSlots} open · ${info.bookedSlots} booked${info.pendingSlots ? ` · ${info.pendingSlots} pending` : ""}`
                              : undefined
                          }
                        >
                          {status === "unknown" && info?.nextOpen
                            ? `Next ${formatShortDate(info.nextOpen)}`
                            : STATUS_LABEL[status]}
                        </span>
                        <span className="hidden text-[11px] uppercase tracking-wider text-base-stone group-hover:text-base-blue sm:inline">
                          Open →
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <SpaceModal
            space={active}
            availability={statuses[active.id]}
            date={selectedDate}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function statusBadgeClass(status: StatusKey): string {
  if (status === "available") return "bg-emerald-500/15 text-emerald-300";
  if (status === "pending") return "bg-amber-400/15 text-amber-200";
  if (status === "booked") return "bg-red-500/15 text-red-300";
  return "bg-white/5 text-base-stone";
}

function DateLegendBar({
  selectedDate,
  onDateChange,
  loading,
  lastUpdated,
  counts,
}: {
  selectedDate: string;
  onDateChange: (d: string) => void;
  loading: boolean;
  lastUpdated: number | null;
  counts: Record<StatusKey, number>;
}) {
  const isToday = selectedDate === todayIso();
  return (
    <div className="flex flex-col items-stretch gap-3 sm:items-end">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-base-paper">
          <Calendar size={14} className="text-base-blue" aria-hidden />
          <span className="sr-only">Pick a date</span>
          <input
            type="date"
            value={selectedDate}
            min={todayIso()}
            onChange={(e) => onDateChange(e.target.value || todayIso())}
            className="bg-transparent text-sm outline-none [color-scheme:dark]"
          />
        </label>
        {!isToday && (
          <button
            type="button"
            onClick={() => onDateChange(todayIso())}
            className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-wider text-base-stone hover:text-white"
          >
            Today
          </button>
        )}
        <LivePill loading={loading} lastUpdated={lastUpdated} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {LEGEND.map((l) => (
          <span
            key={l.key}
            className="pill"
            title={l.description}
          >
            <span className={`h-2 w-2 rounded-full ${STATUS_DOT[l.key]}`} aria-hidden />
            {l.label}
            <span className="ml-1 text-base-stone">{counts[l.key]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function LivePill({
  loading,
  lastUpdated,
}: {
  loading: boolean;
  lastUpdated: number | null;
}) {
  const [, force] = useState(0);
  // Re-render the "x sec ago" label every 15s so it stays current.
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 15_000);
    return () => clearInterval(id);
  }, []);

  if (loading && !lastUpdated) {
    return (
      <span className="pill text-base-stone">
        <RefreshCw size={12} className="animate-spin" />
        Loading
      </span>
    );
  }
  if (!lastUpdated) return null;

  const ageMs = Date.now() - lastUpdated;
  const label =
    ageMs < 15_000
      ? "Live"
      : ageMs < 60_000
        ? `${Math.round(ageMs / 1000)}s ago`
        : `${Math.round(ageMs / 60_000)}m ago`;

  return (
    <span className="pill text-base-paper">
      <span
        className={`h-1.5 w-1.5 rounded-full ${loading ? "bg-amber-400" : "bg-emerald-500"}`}
        aria-hidden
      />
      Updated {label}
    </span>
  );
}

function SpaceModal({
  space,
  availability,
  date,
  onClose,
}: {
  space: Space;
  availability: SpaceAvailability | undefined;
  date: string;
  onClose: () => void;
}) {
  const status: StatusKey = availability?.status ?? "unknown";
  const StatusIcon =
    status === "available" ? CircleCheck : status === "booked" ? CircleX : CircleAlert;
  const nextOpenLabel =
    availability?.nextOpen && status !== "available"
      ? formatTime(availability.nextOpen)
      : null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      aria-label={space.name}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur" />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 32 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-base-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white hover:bg-black/60"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[16/8]">
          <Placeholder
            label={`${space.name} hero`}
            caption="Drop your real space photo here"
            aspect="auto"
            className="h-full"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-base-blue">
              <Building2 size={12} />
              {space.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wider ${statusBadgeClass(status)}`}
            >
              <StatusIcon size={12} />
              {STATUS_LABEL[status]}
              {availability && status !== "unknown" && (
                <span className="opacity-70">
                  · {availability.freeSlots} open / {availability.bookedSlots + availability.pendingSlots} taken
                </span>
              )}
            </span>
            <span className="text-[11px] text-base-stone">{date}</span>
          </div>

          <h3 className="mt-3 font-display text-3xl text-white">{space.name}</h3>
          <p className="mt-3 text-base-fog">{space.positioning}</p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-base-fog">
                <Users size={12} /> Capacity
              </div>
              <p className="mt-2 font-display text-lg text-white">{space.capacity}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-base-fog">
                <Sparkles size={12} /> Best uses
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {space.bestUses.slice(0, 6).map((b) => (
                  <li
                    key={b}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-base-paper"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {nextOpenLabel && (
            <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-200">
              Next open slot: <span className="font-semibold">{nextOpenLabel}</span>
            </div>
          )}

          {space.amenities.length > 0 && (
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-base-fog">
                Amenities
              </div>
              <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {space.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-base-paper"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-base-blue" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Link
              href={`/book?space=${space.id}&date=${date}`}
              className="btn-primary"
            >
              <Calendar size={14} />
              {status === "booked" ? "Pick another day" : "Book This Space"}
            </Link>
            <Link
              href={`/book?space=${space.id}#inquire`}
              className="btn-secondary"
            >
              <MessageSquare size={14} />
              Ask About This Space
            </Link>
            <Link
              href={`/spaces#${space.id}`}
              className="btn-ghost"
            >
              <MapPin size={14} />
              View full details →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatShortDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
