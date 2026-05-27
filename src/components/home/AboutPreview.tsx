import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";

export function AboutPreview() {
  return (
    <section className="bg-base-black py-20 sm:py-28">
      <div className="container-base grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Placeholder
              label="BASE community moment"
              caption="Replace with real photo of community / event"
              aspect="portrait"
              className="ring-1 ring-white/10"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <p className="eyebrow">About BASE</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 text-balance text-4xl text-white sm:text-5xl">
              A placemaking project for{" "}
              <span className="text-base-blue">a better Wilmington</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base-fog">
              BASE is a community development solution built to address the
              challenges facing Wilmington — including crime and poverty —
              by gathering creatives, community leaders, and entrepreneurs
              under one roof.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-base-fog">
              We empower leaders with resources, mentorship, intentional
              workspace, and a network of partners — fueling equitable,
              inclusive growth that centers the residents already here.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link href="/about" className="btn-primary">
                Our story
              </Link>
              <Link href="/partner" className="btn-secondary">
                Help us revitalize Wilmington
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
