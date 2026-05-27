import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/config";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-base-ink text-base-paper">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-base-blue/40 to-transparent" />
      <div className="container-base grid grid-cols-1 gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-base-fog">
            {siteConfig.longDescription}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-base-stone">
            Business. Arts. Sports. Education.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-base-stone">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.nav.slice(1, 7).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-base-fog hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-base-stone">
            Visit / Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5 text-base-fog">
              <MapPin size={16} className="mt-0.5 text-base-blue" />
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {siteConfig.address.line1}, {siteConfig.address.city},{" "}
                {siteConfig.address.state}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-base-fog">
              <Phone size={16} className="mt-0.5 text-base-blue" />
              <a
                href={siteConfig.contact.phoneHref}
                className="hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-base-fog">
              <Mail size={16} className="mt-0.5 text-base-blue" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>

          <p className="mt-6 text-xs text-base-stone">
            {siteConfig.contact.name} · Director
          </p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-base flex flex-col items-start justify-between gap-3 py-6 text-xs text-base-stone md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} BASE Wilmington. All rights reserved.
          </p>
          <p>Built to host culture, community, and opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
