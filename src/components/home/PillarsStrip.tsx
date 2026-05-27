import { Briefcase, Palette, Trophy, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    letter: "B",
    name: "Business",
    desc: "Workspace, mentorship, and rooms built for entrepreneurs, nonprofits, and teams.",
    icon: Briefcase,
  },
  {
    letter: "A",
    name: "Arts",
    desc: "Studios, stages, and showcases for the creatives shaping Wilmington's culture.",
    icon: Palette,
  },
  {
    letter: "S",
    name: "Sports",
    desc: "Wellness pop-ups, athlete moments, and active programming for the community.",
    icon: Trophy,
  },
  {
    letter: "E",
    name: "Education",
    desc: "Workshops, training, youth programs, and learning that opens real opportunity.",
    icon: GraduationCap,
  },
];

export function PillarsStrip() {
  return (
    <section className="relative border-y border-white/5 bg-base-ink py-20 sm:py-24">
      <div className="container-base">
        <Reveal>
          <p className="eyebrow">What BASE stands for</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-white sm:text-5xl">
            One acronym. Four pillars.{" "}
            <span className="text-base-blue">One community.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={i * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-base-smoke p-6 transition-all hover:-translate-y-1 hover:border-base-blue/40">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-[64px] leading-none text-white/90">
                      {p.letter}
                    </span>
                    <Icon size={20} className="text-base-blue" />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-fog">
                    {p.desc}
                  </p>
                  <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-base-blue/20 blur-3xl" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
