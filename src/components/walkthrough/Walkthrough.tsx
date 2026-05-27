"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";

// =============================================================================
// 3D WALKTHROUGH CONCEPT
// Stacked full-screen panels guide the visitor through BASE.
// Replace each <Placeholder/> with real photo or 3D embed when ready.
// =============================================================================

const steps = [
  {
    id: "parking-lot",
    chapter: "01",
    title: "Parking Lot",
    copy: "Arrive off Church Street into our open event lot — gate access, vendor space, easy load-in.",
  },
  {
    id: "gates",
    chapter: "02",
    title: "Through the Gates",
    copy: "BASE opens onto the property. Gate-controlled entry keeps your event secure and curated.",
  },
  {
    id: "courtyard",
    chapter: "03",
    title: "Courtyard",
    copy: "Outdoor mixer space — cocktail-friendly, photo-ready, and right outside the double doors.",
  },
  {
    id: "doors",
    chapter: "04",
    title: "The Double Doors",
    copy: "Cross the threshold. Inside, the campus opens up into every space you might need.",
  },
  {
    id: "main-hall",
    chapter: "05",
    title: "Main Event Hall",
    copy: "Concerts, panels, weddings, screenings, launches. A flexible room with a serious presence.",
  },
  {
    id: "stage",
    chapter: "06",
    title: "Stage",
    copy: "Raised platform, lighting, PA inputs. Built for performers, speakers, and shows.",
  },
  {
    id: "upper-lounge",
    chapter: "07",
    title: "Upper-Level Lounge",
    copy: "Overlook the main floor. DJ-ready, VIP-ready, and the best view in the building.",
  },
  {
    id: "podcast-room",
    chapter: "08",
    title: "Podcast Room",
    copy: "Acoustically treated, multi-cam ready, designed to look as good as it sounds.",
  },
  {
    id: "boardroom",
    chapter: "09",
    title: "Boardroom",
    copy: "A serious room for serious work — strategy, planning, training, and investor meetings.",
  },
  {
    id: "recording-studio",
    chapter: "10",
    title: "Recording Studio",
    copy: "Treated live room and control room — for artists, voice work, and audio production.",
  },
  {
    id: "creative-studio",
    chapter: "11",
    title: "Creative Studio",
    copy: "Photo, video, content days. Light, space, and gear-ready power for crews of all sizes.",
  },
  {
    id: "offices",
    chapter: "12",
    title: "Offices & Flex Rooms",
    copy: "Day-pass or monthly. Entrepreneurs, coaches, and small teams call this home.",
  },
];

export function Walkthrough() {
  return (
    <section className="relative bg-base-black">
      <header className="container-base py-20 sm:py-28">
        <p className="eyebrow">03 / Walkthrough</p>
        <h1 className="h-display mt-4 text-balance text-4xl text-white sm:text-6xl">
          Walk through BASE,{" "}
          <span className="text-base-blue">scene by scene</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-base-fog">
          Scroll to move through the property. From the parking lot to the
          back studios — this is what a tour of BASE feels like, in your
          browser.
        </p>
      </header>

      <div className="relative">
        {steps.map((step, i) => (
          <WalkStep
            key={step.id}
            step={step}
            index={i}
            total={steps.length}
            last={i === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function WalkStep({
  step,
  index,
  total,
  last,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  last: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.0, 1, 1, 0.0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.97]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen border-t border-white/5 py-16 sm:py-24"
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      <div className="container-base grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-5"
          style={reduce ? undefined : { opacity }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-base-blue">
            Chapter {step.chapter} · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </p>
          <h2 className="h-display mt-5 text-4xl text-white sm:text-5xl">
            {step.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-base-fog">
            {step.copy}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href={`/spaces#${step.id}`}
              className="btn-secondary text-[13px]"
            >
              View details
            </Link>
            <Link
              href={`/book?space=${step.id}`}
              className="btn-primary text-[13px]"
            >
              Book this <ArrowRight size={14} />
            </Link>
          </div>

          {last && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-base-paper">
                You've walked the whole property. Ready to book or schedule a
                live tour?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/book" className="btn-primary text-[13px]">
                  Book a Space
                </Link>
                <Link href="/book#tour" className="btn-secondary text-[13px]">
                  Schedule a Tour
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          style={reduce ? undefined : { y, scale }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,rgba(30,91,255,0.18),transparent_60%)] blur-2xl"
            />
            <Placeholder
              label={`${step.title} — photo / 3D scene`}
              caption="Swap in real BASE imagery or a 3D embed (e.g. Matterport)"
              aspect="video"
              className="ring-1 ring-white/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
