import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { spaces } from "@/data/spaces";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";

const featuredIds = [
  "main-hall",
  "courtyard",
  "podcast-room",
  "boardroom",
  "recording-studio",
  "parking-lot",
];

export function SpacesPreview() {
  const featured = spaces.filter((s) => featuredIds.includes(s.id));

  return (
    <section className="border-y border-white/5 bg-base-ink py-20 sm:py-28">
      <div className="container-base">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">The Spaces</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-balance text-4xl text-white sm:text-5xl">
                Indoor, outdoor, and everything in between.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/spaces" className="btn-secondary">
              All spaces <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                href={`/spaces#${s.id}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-base-black transition-all hover:-translate-y-1 hover:border-base-blue/40"
              >
                <div className="relative aspect-[16/10]">
                  <Placeholder
                    label={s.shortName}
                    aspect="auto"
                    className="h-full rounded-none"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {s.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-white">
                      {s.name}
                    </h3>
                    <ArrowRight
                      size={16}
                      className="text-base-fog transition-transform group-hover:translate-x-0.5 group-hover:text-base-blue"
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-base-fog">
                    {s.positioning}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
