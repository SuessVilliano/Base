"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, X, Users, Sparkles, Calendar, MessageSquare } from "lucide-react";
import { spaces, type Space } from "@/data/spaces";
import { Placeholder } from "@/components/ui/Placeholder";

// =============================================================================
// 2D INTERACTIVE PROPERTY MAP
// Click any zone (parking, gates, courtyard, rooms) to open a modal with
// the space's details and CTAs.
// =============================================================================

const categoryColors: Record<Space["category"], string> = {
  outdoor: "rgba(30,91,255,0.18)",
  event: "rgba(30,91,255,0.32)",
  creative: "rgba(120,140,255,0.28)",
  business: "rgba(180,200,255,0.18)",
};

const categoryStroke: Record<Space["category"], string> = {
  outdoor: "rgba(30,91,255,0.45)",
  event: "rgba(30,91,255,0.7)",
  creative: "rgba(120,140,255,0.7)",
  business: "rgba(180,200,255,0.55)",
};

export function PropertyMap() {
  const [active, setActive] = useState<Space | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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
              Hover or tap any zone to see what it does best. Click to open
              capacity, amenities, gallery, and booking options.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(["outdoor", "event", "creative", "business"] as const).map((c) => (
              <span key={c} className="pill">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: categoryStroke[c],
                  }}
                />
                {c}
              </span>
            ))}
          </div>
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
                {/* Property boundary */}
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="2"
                  fill="#0F0F14"
                  stroke="rgba(255,255,255,0.12)"
                />
                {/* Compass + north marker */}
                <g transform="translate(92 6)">
                  <circle r="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.25" />
                  <text textAnchor="middle" dy="-3.5" fill="#A4A4AE" fontSize="2.4" fontFamily="Inter">
                    N
                  </text>
                  <path d="M0,-2 L0.8,1 L0,0.3 L-0.8,1 Z" fill="#1E5BFF" />
                </g>
                {/* Church Street label */}
                <text x="50" y="99.2" textAnchor="middle" fontSize="2" fill="#5C5C66" fontFamily="Inter">
                  N CHURCH ST →
                </text>

                {/* Subtle grid */}
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

                {/* Spaces */}
                {spaces.map((s) => {
                  const isHover = hovered === s.id;
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
                      aria-label={`Open ${s.name}`}
                      className="cursor-pointer outline-none"
                    >
                      <rect
                        x={s.map.x}
                        y={s.map.y}
                        width={s.map.w}
                        height={s.map.h}
                        rx={1}
                        fill={categoryColors[s.category]}
                        stroke={categoryStroke[s.category]}
                        strokeWidth={isHover ? 0.5 : 0.25}
                        style={{
                          transition: "all 0.25s",
                          filter: isHover ? "brightness(1.4)" : "none",
                        }}
                      />
                      <text
                        x={s.map.x + s.map.w / 2}
                        y={s.map.y + s.map.h / 2 - 0.5}
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
                        y={s.map.y + s.map.h / 2 + 2}
                        textAnchor="middle"
                        fontSize="1.4"
                        fontFamily="Inter, sans-serif"
                        fill="#A4A4AE"
                        style={{ pointerEvents: "none" }}
                      >
                        Tap to open
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
              {spaces.map((s) => (
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
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: categoryStroke[s.category] }}
                      />
                      <span className="truncate text-base-paper">{s.shortName}</span>
                    </span>
                    <span className="shrink-0 text-[11px] uppercase tracking-wider text-base-stone group-hover:text-base-blue">
                      Open →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && <SpaceModal space={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function SpaceModal({ space, onClose }: { space: Space; onClose: () => void }) {
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
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-base-blue">
            <Building2 size={12} />
            {space.category}
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
              href={`/book?space=${space.id}`}
              className="btn-primary"
            >
              <Calendar size={14} />
              Book This Space
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
