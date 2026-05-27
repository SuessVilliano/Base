import type { Metadata } from "next";
import Link from "next/link";
import { spaces } from "@/data/spaces";
import { SpaceCard } from "@/components/spaces/SpaceCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Spaces — Indoor & outdoor venues in Wilmington, DE",
  description: `Every rentable space at ${siteConfig.name}: outdoor lots, courtyards, event halls, podcast and recording studios, boardrooms, and flex offices in Wilmington, Delaware.`,
};

const categories: Array<{
  id: "outdoor" | "event" | "creative" | "business";
  label: string;
}> = [
  { id: "outdoor", label: "Outdoor" },
  { id: "event", label: "Event" },
  { id: "creative", label: "Creative" },
  { id: "business", label: "Business" },
];

export default function SpacesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Spaces"
        title={
          <>
            Indoor, outdoor, and{" "}
            <span className="text-base-blue">everything in between</span>.
          </>
        }
        description="Browse every space at BASE. Each one is rentable on its own or as part of a full-property buyout."
      >
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#category-${c.id}`}
              className="pill hover:border-base-blue/40 hover:text-white"
            >
              {c.label}
            </a>
          ))}
          <Link href="/map" className="pill hover:border-base-blue/40 hover:text-white">
            See on map →
          </Link>
        </div>
      </PageHeader>

      {categories.map((cat) => {
        const items = spaces.filter((s) => s.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section
            key={cat.id}
            id={`category-${cat.id}`}
            className="border-b border-white/5 bg-base-black py-16 sm:py-24"
          >
            <div className="container-base">
              <Reveal>
                <div className="flex items-end justify-between">
                  <h2 className="h-display text-3xl text-white sm:text-4xl">
                    {cat.label} spaces
                  </h2>
                  <span className="text-xs uppercase tracking-[0.22em] text-base-stone">
                    {items.length} option{items.length === 1 ? "" : "s"}
                  </span>
                </div>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((s) => (
                  <Reveal key={s.id}>
                    <SpaceCard space={s} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
