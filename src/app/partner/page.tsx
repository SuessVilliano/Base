import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerForm } from "@/components/booking/PartnerForm";
import { partnerTracks, partnerTypes } from "@/data/partner";

export const metadata: Metadata = {
  title: "Partner — Help us revitalize Wilmington",
  description:
    "Invest, advocate, or partner with BASE in Wilmington, Delaware. Build community, support local leaders, and shape the city's culture.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner / Sponsor"
        title={
          <>
            Help us <span className="text-base-blue">revitalize Wilmington</span>.
          </>
        }
        description="BASE is built by the community for the community — and it grows because of the people who choose to invest in it. Here's how you can step in."
      />

      <section className="bg-base-black py-16 sm:py-24">
        <div className="container-base grid grid-cols-1 gap-3 md:grid-cols-3">
          {partnerTracks.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article
                id={p.id}
                className="group relative h-full scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-base-ink p-7 transition-all hover:-translate-y-1 hover:border-base-blue/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-base-blue">
                  Track 0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-3xl text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-base-fog">
                  {p.description}
                </p>
                <a
                  href="#partner-inquiry"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-base-blue hover:text-base-blue-400"
                >
                  {p.cta} →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-base-ink py-16 sm:py-24">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">Partnership types</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-white sm:text-5xl">
              Where you fit in the BASE network.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {partnerTypes.map((t, i) => (
              <Reveal key={t} delay={i * 0.03}>
                <div className="h-full rounded-2xl border border-white/10 bg-base-smoke p-5 text-sm text-base-paper">
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-inquiry" className="scroll-mt-24 bg-base-black py-16 sm:py-24">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="h-display text-balance text-3xl text-white sm:text-4xl">
                Ready to step in? Let's talk.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-base-fog">
                Tell us about your organization and how you'd like to plug into
                BASE. We'll set up an intro call to map the right partnership.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <PartnerForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
