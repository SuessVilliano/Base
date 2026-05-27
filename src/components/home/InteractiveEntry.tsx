"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  MapPin,
  CarFront,
  Trees,
  DoorOpen,
  Compass,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/data/config";

// =============================================================================
// INTERACTIVE ENTRY
// A cinematic scroll-driven journey:
//   Parking Lot → Gates → Courtyard → Double Doors → Interior choice
// =============================================================================

const stages = [
  {
    id: "parking",
    label: "01 / Pull up",
    title: "The Parking Lot",
    copy: "Pull off Church Street into our open event lot — room for food trucks, vendor markets, and arriving guests.",
    icon: CarFront,
  },
  {
    id: "gates",
    label: "02 / Approach",
    title: "Through the Gates",
    copy: "BASE opens to its grounds. The gates frame the property and invite you onto campus.",
    icon: MapPin,
  },
  {
    id: "courtyard",
    label: "03 / Step in",
    title: "Into the Courtyard",
    copy: "An outdoor heartbeat for mixers, photo moments, and pre-event check-ins.",
    icon: Trees,
  },
  {
    id: "doors",
    label: "04 / Open",
    title: "Open the Double Doors",
    copy: "From here, every space inside BASE is yours to host, create, learn, and connect in.",
    icon: DoorOpen,
  },
];

export function InteractiveEntry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage progress (0 → 1 across the section)
  const stageProgress = scrollYProgress;

  // Background zoom + parallax
  const skyY = useTransform(stageProgress, [0, 1], ["0%", "-30%"]);
  const groundY = useTransform(stageProgress, [0, 1], ["0%", "20%"]);
  const buildingScale = useTransform(stageProgress, [0, 0.85], [0.9, 1.4]);
  const buildingY = useTransform(stageProgress, [0, 1], ["8%", "-6%"]);

  // Gate animation (open between 0.2 and 0.5)
  const leftGateX = useTransform(stageProgress, [0.18, 0.45], ["0%", "-100%"]);
  const rightGateX = useTransform(stageProgress, [0.18, 0.45], ["0%", "100%"]);
  const gateOpacity = useTransform(stageProgress, [0.45, 0.55], [1, 0]);

  // Door animation (open between 0.65 and 0.9)
  const leftDoor = useTransform(stageProgress, [0.65, 0.9], ["0deg", "-92deg"]);
  const rightDoor = useTransform(stageProgress, [0.65, 0.9], ["0deg", "92deg"]);
  const doorOpacity = useTransform(stageProgress, [0.55, 0.66], [0, 1]);
  const interiorGlow = useTransform(stageProgress, [0.75, 1], [0, 1]);

  // Stage label opacity ranges
  const stageOpacities = [
    useTransform(stageProgress, [0.0, 0.05, 0.18, 0.24], [1, 1, 1, 0]),
    useTransform(stageProgress, [0.18, 0.24, 0.4, 0.46], [0, 1, 1, 0]),
    useTransform(stageProgress, [0.4, 0.46, 0.6, 0.66], [0, 1, 1, 0]),
    useTransform(stageProgress, [0.6, 0.66, 0.86, 0.92], [0, 1, 1, 0]),
  ];

  // Final reveal
  const revealOpacity = useTransform(stageProgress, [0.88, 1], [0, 1]);
  const revealY = useTransform(stageProgress, [0.88, 1], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[420vh] bg-base-black"
      aria-label="Interactive entry to BASE"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Sky / atmosphere layer */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={reduce ? undefined : { y: skyY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#0e1a3d_0%,#080816_55%,#04040a_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(30,91,255,0.18),transparent_55%)]" />
          {/* faint star field */}
          <div className="absolute inset-0 opacity-50 mix-blend-screen">
            <Stars />
          </div>
        </motion.div>

        {/* Ground / parking lot perspective */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[60%]"
          style={reduce ? undefined : { y: groundY }}
        >
          <Ground />
        </motion.div>

        {/* Building silhouette / facade */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-[6%] mx-auto flex justify-center"
          style={
            reduce
              ? undefined
              : { scale: buildingScale, y: buildingY }
          }
        >
          <Building />
        </motion.div>

        {/* Gates */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-end justify-center pb-[6vh]"
          style={reduce ? undefined : { opacity: gateOpacity }}
        >
          <div className="relative flex h-[58vh] w-[min(720px,80vw)] items-end justify-center">
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 origin-left"
              style={reduce ? undefined : { x: leftGateX }}
            >
              <GatePanel side="left" />
            </motion.div>
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 origin-right"
              style={reduce ? undefined : { x: rightGateX }}
            >
              <GatePanel side="right" />
            </motion.div>
          </div>
        </motion.div>

        {/* Doors */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-[14vh] flex justify-center"
          style={reduce ? undefined : { opacity: doorOpacity }}
        >
          <div className="relative flex h-[44vh] w-[min(420px,62vw)]">
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 origin-left rounded-l-md border border-white/20 bg-gradient-to-b from-[#1a1a22] to-[#0c0c12] shadow-[inset_-12px_0_24px_rgba(0,0,0,0.6)]"
              style={
                reduce
                  ? undefined
                  : { rotateY: leftDoor, transformPerspective: 900 }
              }
            >
              <DoorDetail side="left" />
            </motion.div>
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 origin-right rounded-r-md border border-white/20 bg-gradient-to-b from-[#1a1a22] to-[#0c0c12] shadow-[inset_12px_0_24px_rgba(0,0,0,0.6)]"
              style={
                reduce
                  ? undefined
                  : { rotateY: rightDoor, transformPerspective: 900 }
              }
            >
              <DoorDetail side="right" />
            </motion.div>

            {/* Interior glow behind doors */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-md bg-[radial-gradient(circle_at_50%_55%,#1E5BFF_0%,#0a1230_60%,transparent_100%)] blur-2xl"
              style={reduce ? undefined : { opacity: interiorGlow }}
            />
          </div>
        </motion.div>

        {/* Stage labels (top-left HUD) */}
        <div className="pointer-events-none absolute left-5 top-24 z-20 sm:left-10 sm:top-28">
          {stages.map((s, i) => (
            <motion.div
              key={s.id}
              style={reduce ? undefined : { opacity: stageOpacities[i] }}
              className="absolute left-0 top-0 max-w-sm"
            >
              <StageLabel stage={s} />
            </motion.div>
          ))}
        </div>

        {/* Progress rail (right side) */}
        <ProgressRail progress={stageProgress} />

        {/* Final reveal - interior choices */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 flex h-full items-center justify-center px-5"
          style={reduce ? undefined : { opacity: revealOpacity, y: revealY }}
        >
          <InteriorReveal />
        </motion.div>

        {/* Hero overlay (visible at start) */}
        <HeroOverlay progress={stageProgress} />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

function HeroOverlay({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [0, 0.06, 0.14], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.14], [0, -32]);
  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-30 flex h-screen flex-col items-center justify-center px-5 text-center"
      style={reduce ? undefined : { opacity, y }}
    >
      <p className="eyebrow text-base-fog">
        {siteConfig.address.city}, {siteConfig.address.state}
      </p>
      <h1 className="h-display mt-5 text-5xl text-white sm:text-7xl md:text-8xl">
        Enter <span className="text-base-blue">BASE</span>
      </h1>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.32em] text-base-fog">
        {siteConfig.tagline}
      </p>
      <p className="mx-auto mt-7 max-w-xl text-balance text-base text-base-fog md:text-lg">
        {siteConfig.shortDescription}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link href="/spaces" className="btn-primary">
          Explore the Space
        </Link>
        <Link href="/book#tour" className="btn-secondary">
          Book a Tour
        </Link>
        <Link href="/book" className="btn-ghost">
          Host an Event →
        </Link>
      </div>
      <motion.div
        aria-hidden
        className="mt-12 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-base-stone"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Scroll to walk in</span>
        <span className="block h-10 w-px bg-gradient-to-b from-base-blue to-transparent" />
      </motion.div>
    </motion.div>
  );
}

function StageLabel({
  stage,
}: {
  stage: (typeof stages)[number];
}) {
  const Icon = stage.icon;
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-base-blue">
        <Icon size={12} />
        {stage.label}
      </div>
      <h3 className="mt-3 font-display text-2xl text-white">{stage.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-base-fog">
        {stage.copy}
      </p>
    </div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const height = useTransform(progress, [0, 1], ["4%", "100%"]);
  return (
    <div className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 sm:right-8 md:block">
      <div className="relative h-[44vh] w-px bg-white/10">
        <motion.div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-base-blue to-base-blue/30"
          style={reduce ? undefined : { height }}
        />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <span
            key={i}
            className="absolute -left-1 h-2 w-2 -translate-x-1/2 rounded-full bg-white/30"
            style={{ top: `${t * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Stars() {
  // Simple deterministic star field
  const stars = Array.from({ length: 70 }, (_, i) => i);
  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s) => {
        const x = ((s * 73) % 100) + ((s * 13) % 7) / 10;
        const y = ((s * 41) % 100) + ((s * 7) % 5) / 10;
        const r = (s % 3) * 0.06 + 0.08;
        return <circle key={s} cx={x} cy={y} r={r} fill="white" opacity={0.6} />;
      })}
    </svg>
  );
}

function Ground() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a14" />
          <stop offset="100%" stopColor="#020205" />
        </linearGradient>
        <linearGradient id="laneFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E5BFF" stopOpacity="0" />
          <stop offset="60%" stopColor="#1E5BFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1E5BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#ground)" />
      {/* Perspective parking lane lines */}
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => {
        const startX = 600 + i * 30;
        const endX = 600 + i * 320;
        return (
          <line
            key={i}
            x1={startX}
            y1={120}
            x2={endX}
            y2={600}
            stroke="url(#laneFade)"
            strokeWidth={2}
            strokeDasharray="14 18"
          />
        );
      })}
      {/* horizon glow */}
      <ellipse cx="600" cy="120" rx="520" ry="60" fill="#1E5BFF" opacity="0.1" />
    </svg>
  );
}

function Building() {
  return (
    <svg
      width="640"
      height="320"
      viewBox="0 0 640 320"
      className="max-w-[88vw]"
      aria-hidden
    >
      <defs>
        <linearGradient id="facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101018" />
          <stop offset="100%" stopColor="#06060a" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E5BFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E5BFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* main mass */}
      <rect x="60" y="60" width="520" height="240" fill="url(#facade)" stroke="#1E5BFF" strokeOpacity="0.18" />
      {/* taller wing */}
      <rect x="60" y="20" width="180" height="280" fill="url(#facade)" stroke="#1E5BFF" strokeOpacity="0.18" />
      {/* windows */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((__, col) => {
          const x = 80 + col * 40;
          const y = 50 + row * 50;
          const lit = (row + col) % 3 === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="22"
              height="28"
              fill={lit ? "url(#windowGlow)" : "#0c0c14"}
              stroke="#1E5BFF"
              strokeOpacity={lit ? 0.5 : 0.1}
            />
          );
        })
      )}
      {/* sign */}
      <rect x="280" y="270" width="80" height="22" rx="2" fill="#0A0A0B" stroke="#1E5BFF" />
      <text x="320" y="286" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2">
        BASE
      </text>
    </svg>
  );
}

function GatePanel({ side }: { side: "left" | "right" }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-base-blue via-white/40 to-base-blue" style={{ display: side === "left" ? "block" : "none" }} />
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-base-blue via-white/40 to-base-blue" style={{ display: side === "right" ? "block" : "none" }} />
      <svg viewBox="0 0 200 600" preserveAspectRatio="none" className="h-full w-full">
        {/* gate bars */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={20 + i * 26}
            y1={20}
            x2={20 + i * 26}
            y2={580}
            stroke="#aeb6c4"
            strokeOpacity="0.45"
            strokeWidth={3}
          />
        ))}
        {/* crossbar */}
        <line x1={0} y1={80} x2={200} y2={80} stroke="#aeb6c4" strokeOpacity="0.5" strokeWidth={4} />
        <line x1={0} y1={560} x2={200} y2={560} stroke="#aeb6c4" strokeOpacity="0.5" strokeWidth={4} />
        {/* B emblem on one panel */}
        {side === "left" && (
          <g transform="translate(70 280)">
            <circle r="30" fill="#0A0A0B" stroke="#1E5BFF" strokeWidth="2" />
            <text textAnchor="middle" dy="6" fill="#fff" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800">
              B
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function DoorDetail({ side }: { side: "left" | "right" }) {
  return (
    <svg viewBox="0 0 200 600" preserveAspectRatio="none" className="h-full w-full">
      <rect x="20" y="20" width="160" height="560" fill="none" stroke="#2a2a32" strokeWidth="2" />
      <rect x="40" y="40" width="120" height="220" fill="none" stroke="#2a2a32" strokeWidth="1.5" />
      <rect x="40" y="280" width="120" height="280" fill="none" stroke="#2a2a32" strokeWidth="1.5" />
      <circle
        cx={side === "left" ? 160 : 40}
        cy={310}
        r={6}
        fill="#1E5BFF"
      />
    </svg>
  );
}

function InteriorReveal() {
  const choices = [
    {
      title: "2D Interactive Map",
      copy: "See every space from above. Click any zone to explore.",
      href: "/map",
      icon: MapPin,
    },
    {
      title: "3D Walkthrough",
      copy: "Move through BASE room by room, scene by scene.",
      href: "/walkthrough",
      icon: Compass,
    },
    {
      title: "Book a Space",
      copy: "Pick a date, pick a room, lock it in.",
      href: "/book",
      icon: DoorOpen,
    },
    {
      title: "Explore Use Cases",
      copy: "From food trucks to film shoots — see what BASE hosts.",
      href: "/use-cases",
      icon: ArrowRight,
    },
    {
      title: "Partner / Sponsor",
      copy: "Build community with us. Invest, advocate, partner.",
      href: "/partner",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="container-base flex h-full flex-col items-center justify-center">
      <p className="eyebrow text-base-fog">You're in</p>
      <h2 className="h-display mt-4 text-balance text-center text-4xl text-white sm:text-5xl md:text-6xl">
        Welcome inside <span className="text-base-blue">BASE</span>
      </h2>
      <p className="mt-4 max-w-xl text-center text-sm text-base-fog md:text-base">
        Choose how you want to explore — every door is open from here.
      </p>
      <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {choices.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-base-blue/40 hover:bg-white/[0.06]"
            >
              <Icon size={18} className="text-base-blue" />
              <div className="mt-6">
                <h3 className="font-display text-base font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-base-fog">
                  {c.copy}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-base-blue">
                Enter
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
