import Link from "next/link";
import { ArrowRight, Crown, Gift } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { foundingOffer } from "@/data/membership";

export function MembershipPitch() {
  const remaining = foundingOffer.spotsTotal - foundingOffer.spotsClaimed;
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-base-ink py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(30,91,255,0.20),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(30,91,255,0.14),transparent_55%)]"
      />
      <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-base-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              <Crown size={12} />
              Founding Members · {remaining} spots left
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-5 text-balance text-4xl text-base-paper sm:text-6xl">
              Make BASE your home base.{" "}
              <span className="text-base-blue">Lock in founding rates.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base-fog">
              Become a member for priority booking, monthly free hours, and up
              to 30% off every space. Founding members keep their rate for
              life and double credits in their first 90 days.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <Link href="/membership" className="btn-primary">
                See membership plans
              </Link>
              <Link href="/referral" className="btn-secondary">
                <Gift size={14} />
                Refer friends, earn hours
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: "10–30%", v: "Off bookings, every time" },
                { k: "Priority", v: "Up to 30 days early on new dates" },
                { k: "Credits", v: "Monthly free hours included" },
                { k: "Network", v: "BASE Community + member-only events" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-2xl border border-white/10 bg-base-smoke p-5"
                >
                  <p className="font-display text-2xl text-base-paper">
                    {b.k}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-base-fog">
                    {b.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
