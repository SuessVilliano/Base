import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCases } from "@/data/useCases";
import { Reveal } from "@/components/ui/Reveal";

export function UseCasesPreview() {
  const featured = useCases.slice(0, 9);
  return (
    <section className="bg-base-black py-20 sm:py-28">
      <div className="container-base">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Use cases</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-balance text-4xl text-white sm:text-5xl">
                More than a venue. <span className="text-base-blue">A platform.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base-fog">
                BASE is built for the full range of what Wilmington does —
                from food trucks to film shoots, board meetings to block parties.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link href="/use-cases" className="btn-secondary">
              All use cases <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((u, i) => (
            <Reveal key={u.id} delay={i * 0.04}>
              <Link
                href={`/use-cases#${u.id}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-base-ink p-6 transition-all hover:-translate-y-1 hover:border-base-blue/40"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl text-white">{u.title}</h3>
                  <ArrowRight
                    size={16}
                    className="text-base-fog transition-transform group-hover:translate-x-0.5 group-hover:text-base-blue"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-base-fog">
                  {u.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
