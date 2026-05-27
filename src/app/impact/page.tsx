import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImpactSection } from "@/components/home/ImpactSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Impact — Real numbers, real Wilmington",
  description:
    "BASE has provided thousands of hours of free or low-cost space and supported hundreds of artists and entrepreneurs in Wilmington, Delaware.",
};

const stories = [
  {
    title: "9,000+ hours of access",
    copy: "Free or low-cost office and creative space delivered to local artists, entrepreneurs, and community leaders.",
  },
  {
    title: "Hundreds of livelihoods",
    copy: "50+ minority- and women-owned businesses supported, plus 1,000+ artists provided with space and platform.",
  },
  {
    title: "A network that grows",
    copy: "1,000+ entrepreneurs and community leaders reached through programs, partners, and intentional gatherings.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title={
          <>
            What happens when you gather <span className="text-base-blue">the right people</span> under one roof.
          </>
        }
        description="BASE measures success in the people who walk through our doors — artists with new platforms, businesses with new doors, and leaders with new networks."
      />
      <ImpactSection />

      <section className="border-y border-white/5 bg-base-ink py-16 sm:py-24">
        <div className="container-base">
          <Reveal>
            <h2 className="h-display max-w-3xl text-balance text-3xl text-white sm:text-5xl">
              Three stories the numbers tell.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-white/10 bg-base-smoke p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-base-blue">
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                  <h3 className="mt-3 font-display text-xl text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-fog">
                    {s.copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/partner" className="btn-primary">
                Partner with BASE
              </Link>
              <Link href="/about" className="btn-secondary">
                Read about us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
