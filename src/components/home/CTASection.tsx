import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/config";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-base-ink py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(30,91,255,0.25),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(30,91,255,0.15),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-base">
        <Reveal>
          <p className="eyebrow">Come build with us</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-display mt-4 max-w-3xl text-balance text-5xl text-white sm:text-7xl">
            Come host your event here.{" "}
            <span className="text-base-blue">Come build community here.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base-fog">
            BASE is open to creators, organizers, businesses, nonprofits, and
            neighbors. Tell us what you're planning and we'll help you make it
            real.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/book" className="btn-primary">
              Book a Space
            </Link>
            <Link href="/book#tour" className="btn-secondary">
              Schedule a Tour
            </Link>
            <Link href="/partner" className="btn-ghost">
              Partner With BASE →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-base-stone">
            {siteConfig.address.full}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
