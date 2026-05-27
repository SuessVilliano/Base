import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { ImpactSection } from "@/components/home/ImpactSection";

export const metadata: Metadata = {
  title: "About — Wilmington's BASE",
  description:
    "BASE is a placemaking community development project in Wilmington, Delaware — built to gather creatives, entrepreneurs, and community leaders under one roof.",
};

const pillars = [
  {
    title: "Mission",
    body: "Build communities, change lives, and transform culture by supporting and cultivating leaders in Business, Arts, Sports, and Education.",
  },
  {
    title: "Approach",
    body: "BASE is a placemaking community development solution — created to address challenges facing Wilmington, including crime and poverty.",
  },
  {
    title: "Equity",
    body: "We support equitable, inclusive growth centered on current residents — not displacement, but investment in the neighborhood already here.",
  },
  {
    title: "Network",
    body: "We bring together leaders under one roof and empower them with resources, mentorship, intentional workspace, and a network of partners.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About BASE"
        title={
          <>
            A community development project for{" "}
            <span className="text-base-blue">a better Wilmington</span>.
          </>
        }
        description="BASE is a hub for creatives, community leaders, and entrepreneurs making change through Business, Arts, Sports, and Education."
      />

      <section className="border-b border-white/5 bg-base-black py-16 sm:py-24">
        <div className="container-base grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Placeholder
                label="Founders / leadership"
                caption="Replace with team or building photo"
                aspect="portrait"
                className="ring-1 ring-white/10"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Our story</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-balance text-3xl text-white sm:text-5xl">
                Built on a simple idea: gather the right people under one roof.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base-fog">
                BASE is more than a venue. It's a placemaking project — a deliberate
                effort to address the real challenges facing Wilmington and to build
                a hub where the city's leaders, creatives, and entrepreneurs can do
                their work alongside each other.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-base-fog">
                We're proud to support equitable, inclusive growth that centers the
                neighborhood already here. Every program, every partnership, and
                every event is in service of that.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap gap-2">
                <Link href="/partner" className="btn-primary">
                  Partner with BASE
                </Link>
                <Link href="/impact" className="btn-secondary">
                  See our impact
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-base-ink py-16 sm:py-24">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">What we stand for</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-white sm:text-5xl">
              Mission, approach, equity, network.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-white/10 bg-base-smoke p-6">
                  <h3 className="font-display text-xl text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-fog">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ImpactSection compact />
    </>
  );
}
