import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { GHLCalendar } from "@/components/booking/GHLCalendar";
import { InquiryForm } from "@/components/booking/InquiryForm";
import { TourForm } from "@/components/booking/TourForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/config";
import { spaces } from "@/data/spaces";
import { SpaceCalendarSwitcher } from "@/components/booking/SpaceCalendarSwitcher";

export const metadata: Metadata = {
  title: "Book a Space — Wilmington event venue & studios",
  description:
    "Book the BASE event hall, studios, podcast room, boardroom, courtyard, and outdoor lot in Wilmington, Delaware.",
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book"
        title={
          <>
            Pick a date.{" "}
            <span className="text-base-blue">Pick a space.</span> Lock it in.
          </>
        }
        description="Choose the room you want and grab a time on its calendar. Need something custom? The inquiry form below loops in our team."
      />

      <section className="bg-base-black py-16 sm:py-20">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="h-display text-2xl text-base-paper sm:text-3xl">
                Book a space
              </h2>
              <p className="mt-2 text-sm text-base-fog">
                Pick the room — each one has its own GoHighLevel calendar so
                you can grab a real time slot.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Suspense fallback={null}>
                <SpaceCalendarSwitcher />
              </Suspense>
            </Reveal>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Reveal>
              <Suspense fallback={null}>
                <TourForm />
              </Suspense>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-base-blue">
                  Prefer to talk to a human?
                </p>
                <p className="mt-2 text-sm text-base-paper">
                  Call{" "}
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="underline decoration-base-blue/60 underline-offset-2"
                  >
                    {siteConfig.contact.phone}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="underline decoration-base-blue/60 underline-offset-2"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-base-blue/30 bg-base-blue/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-base-blue">
                  Save on every booking
                </p>
                <p className="mt-2 text-sm text-base-paper">
                  Members get 10–30% off and priority booking on every room.
                </p>
                <Link
                  href="/membership"
                  className="mt-3 inline-flex text-[12px] font-semibold text-base-blue hover:text-base-blue-400"
                >
                  See membership plans →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-base-ink py-16 sm:py-20">
        <div className="container-base">
          <Reveal>
            <h2 className="h-display text-3xl text-base-paper sm:text-4xl">
              Event inquiry
            </h2>
            <p className="mt-2 max-w-xl text-sm text-base-fog">
              Big event, multi-room takeover, or anything custom? Share the
              details and we'll build a quote.
            </p>
          </Reveal>
          <div className="mt-8">
            <Suspense fallback={null}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* SEO helper: spaces index for crawlers */}
      <div className="sr-only" aria-hidden>
        {spaces.map((s) => (
          <span key={s.id}>{s.name}</span>
        ))}
      </div>
    </>
  );
}
