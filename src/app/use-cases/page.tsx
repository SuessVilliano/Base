import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useCases } from "@/data/useCases";
import { spaces, getSpaceById } from "@/data/spaces";

export const metadata: Metadata = {
  title: "Use Cases — From food trucks to film shoots",
  description:
    "BASE in Wilmington hosts private events, corporate meetings, community forums, podcasts, music showcases, youth programs, vendor markets, and more.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use Cases"
        title={
          <>
            More than a venue.{" "}
            <span className="text-base-blue">A platform.</span>
          </>
        }
        description="Whatever you're planning — BASE was built for it. Pick the use case closest to your idea, see recommended spaces, and start planning."
      />

      <section className="bg-base-black py-16 sm:py-20">
        <div className="container-base">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => {
              const recs = u.recommendedSpaces
                .map((id) => getSpaceById(id))
                .filter(Boolean) as NonNullable<ReturnType<typeof getSpaceById>>[];
              return (
                <Reveal key={u.id} delay={(i % 9) * 0.04}>
                  <article
                    id={u.id}
                    className="group relative h-full scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-base-ink p-6 transition-all hover:-translate-y-1 hover:border-base-blue/40"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-xl text-white">
                        {u.title}
                      </h3>
                      <span className="rounded-full bg-base-blue/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-base-blue">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-base-fog">
                      {u.description}
                    </p>

                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-base-fog">
                        Recommended spaces
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {recs.map((s) => (
                          <li key={s.id}>
                            <Link
                              href={`/spaces#${s.id}`}
                              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-base-paper hover:border-base-blue/40 hover:text-white"
                            >
                              {s.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/book?eventType=${encodeURIComponent(u.title)}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-base-blue hover:text-base-blue-400"
                      >
                        Plan This Event
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-base-ink py-16 sm:py-20">
        <div className="container-base flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="h-display text-3xl text-white sm:text-4xl">
              Not seeing your use case? <span className="text-base-blue">Tell us anyway.</span>
            </h2>
            <p className="mt-3 text-sm text-base-fog">
              BASE is a flexible campus — odds are we can host what you're planning.
              We've welcomed everything from listening parties to startup pitches to graduation cohorts.
            </p>
          </div>
          <Link href="/book#inquire" className="btn-primary">
            Tell us about your event
          </Link>
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
