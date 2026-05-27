import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { GHLCalendar } from "@/components/booking/GHLCalendar";
import { InquiryForm } from "@/components/booking/InquiryForm";
import { TourForm } from "@/components/booking/TourForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/config";

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
            Pick a date. <span className="text-base-blue">Pick a space.</span> Lock it in.
          </>
        }
        description="Use the calendar to grab a time, or fill out the inquiry form below. A BASE team member will follow up to confirm pricing and details."
      />

      <section className="bg-base-black py-16 sm:py-20">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="h-display text-2xl text-white sm:text-3xl">
                Book a space
              </h2>
              <p className="mt-2 text-sm text-base-fog">
                Live GoHighLevel calendar for direct booking.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6">
                <GHLCalendar src={siteConfig.booking.bookSpace} title="Book a space" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <Suspense fallback={null}>
                <TourForm />
              </Suspense>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-base-blue">
                  Prefer to talk to a human?
                </p>
                <p className="mt-2 text-sm text-base-paper">
                  Call <a href={siteConfig.contact.phoneHref} className="underline decoration-base-blue/60 underline-offset-2">{siteConfig.contact.phone}</a> or email{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="underline decoration-base-blue/60 underline-offset-2">{siteConfig.contact.email}</a>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-base-ink py-16 sm:py-20">
        <div className="container-base">
          <Reveal>
            <h2 className="h-display text-3xl text-white sm:text-4xl">
              Event inquiry
            </h2>
            <p className="mt-2 max-w-xl text-sm text-base-fog">
              Got a bigger or custom event? Share the details and we'll build a quote.
            </p>
          </Reveal>
          <div className="mt-8">
            <Suspense fallback={null}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
