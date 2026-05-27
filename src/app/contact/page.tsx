import type { Metadata } from "next";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Contact — Wilmington event & creative campus",
  description: `Contact ${siteConfig.contact.name} at ${siteConfig.contact.email} or ${siteConfig.contact.phone}. ${siteConfig.address.full}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let's talk. <span className="text-base-blue">Come build with us.</span>
          </>
        }
        description="Reach out about events, tours, partnerships, programming, or anything else."
      />

      <section className="bg-base-black py-16 sm:py-24">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-base-ink p-7">
                <h3 className="font-display text-2xl text-white">Direct contact</h3>
                <p className="mt-1 text-sm text-base-fog">{siteConfig.contact.name}</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="rounded-full bg-base-blue/10 p-2 text-base-blue">
                      <Phone size={14} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-base-fog">
                        Phone
                      </p>
                      <a
                        href={siteConfig.contact.phoneHref}
                        className="mt-1 inline-block font-display text-lg text-white hover:text-base-blue"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="rounded-full bg-base-blue/10 p-2 text-base-blue">
                      <Mail size={14} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-base-fog">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="mt-1 inline-block font-display text-lg text-white hover:text-base-blue"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="rounded-full bg-base-blue/10 p-2 text-base-blue">
                      <MapPin size={14} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-base-fog">
                        Address
                      </p>
                      <a
                        href={siteConfig.address.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 font-display text-lg text-white hover:text-base-blue"
                      >
                        {siteConfig.address.line1}
                        <ArrowUpRight size={14} />
                      </a>
                      <p className="text-sm text-base-fog">
                        {siteConfig.address.city}, {siteConfig.address.state}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-base-ink">
                <iframe
                  title="BASE on the map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    siteConfig.address.full
                  )}&output=embed`}
                  loading="lazy"
                  className="h-[420px] w-full"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-5">
                <Placeholder
                  label="Exterior on Church Street"
                  caption="Replace with real exterior photo"
                  aspect="wide"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
