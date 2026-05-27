import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { galleryAreas, galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — Inside BASE Wilmington",
  description:
    "Browse photos of every space at BASE in Wilmington, DE — exterior, courtyard, main hall, stage, podcast room, studios, and offices.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            See BASE, <span className="text-base-blue">room by room</span>.
          </>
        }
        description="Image slots are organized by area so you can drop real photos into the matching folder under /public/gallery/. Browse below."
      />

      <section className="bg-base-black py-12 sm:py-16">
        <div className="container-base sticky top-16 z-20 -mx-5 mb-8 border-b border-white/5 bg-base-black/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryAreas.map((a) => (
              <a
                key={a}
                href={`#${slug(a)}`}
                className="pill whitespace-nowrap hover:border-base-blue/40 hover:text-white"
              >
                {a}
              </a>
            ))}
          </div>
        </div>

        {galleryAreas.map((area) => {
          const items = galleryItems.filter((i) => i.area === area);
          if (items.length === 0) return null;
          return (
            <div
              key={area}
              id={slug(area)}
              className="container-base scroll-mt-32 pb-16"
            >
              <Reveal>
                <div className="flex items-baseline justify-between">
                  <h2 className="h-display text-2xl text-white sm:text-3xl">
                    {area}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.22em] text-base-stone">
                    {items.length} item{items.length === 1 ? "" : "s"}
                  </span>
                </div>
              </Reveal>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((img, i) => (
                  <Reveal key={img.src} delay={i * 0.03}>
                    <Placeholder
                      label={img.alt}
                      caption={`Drop file at ${img.src}`}
                      aspect="video"
                      className="ring-1 ring-white/10"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
