import Link from "next/link";
import { impactStats } from "@/data/impact";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  compact?: boolean;
};

export function ImpactSection({ compact = false }: Props) {
  return (
    <section className="relative overflow-hidden bg-base-black py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: "var(--tw-bg-grid-light)" }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-base-blue/10 blur-[120px]"
      />
      <div className="container-base">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Impact</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-balance text-4xl text-white sm:text-5xl">
                Real numbers. Real people. <span className="text-base-blue">Real Wilmington.</span>
              </h2>
            </Reveal>
            {!compact && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-base-fog">
                  BASE was built to address the real challenges in Wilmington —
                  crime, poverty, and underinvestment — by gathering creatives,
                  community leaders, and entrepreneurs under one roof.
                </p>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <Link href="/impact" className="mt-7 inline-flex btn-secondary">
                See the full story →
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {impactStats.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-base-smoke to-base-ink p-6 transition-all hover:border-base-blue/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-base-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <Counter
                        to={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        className="font-display text-5xl font-semibold text-white sm:text-6xl"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-lg text-white">
                      {s.label}
                    </h3>
                    <p className="mt-2 text-sm text-base-fog">
                      {s.description}
                    </p>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-blue/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
