import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Flame,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  baseMemberPerks,
  foundingOffer,
  membershipTiers,
} from "@/data/membership";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Membership — Priority access to BASE Wilmington",
  description:
    "Become a BASE member for priority booking, member pricing on every space, monthly free hours, member-only events, and access to the BASE creator/founder community.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={
          <>
            Make BASE your home base.{" "}
            <span className="text-base-blue">
              Get priority on every booking.
            </span>
          </>
        }
        description="Three tiers, monthly free hours, and member-only pricing on every space. Designed for creators, founders, and small teams who use BASE more than once."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link href="#tiers" className="btn-primary">
            See plans
          </Link>
          <Link href="#founding" className="btn-secondary">
            Founding member offer →
          </Link>
        </div>
      </PageHeader>

      {/* Universal perks strip */}
      <section className="border-b border-white/5 bg-base-ink py-16 sm:py-20">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">What every member gets</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-base-paper sm:text-5xl">
              One key. Every door.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {baseMemberPerks.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-white/10 bg-base-smoke p-5">
                  <div className="flex items-start gap-2.5">
                    <span className="rounded-full bg-base-blue/15 p-1.5 text-base-blue">
                      <CheckCircle2 size={14} />
                    </span>
                    <h3 className="font-display text-base text-base-paper">
                      {p.label}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-base-fog">
                    {p.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="tiers" className="scroll-mt-24 bg-base-black py-20 sm:py-28">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">Membership plans</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-base-paper sm:text-5xl">
              Pick the tier that fits how often you use BASE.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {membershipTiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1 ${
                    t.featured
                      ? "border-base-blue/60 bg-gradient-to-b from-base-smoke to-base-ink ring-blue-glow"
                      : "border-white/10 bg-base-ink hover:border-base-blue/40"
                  }`}
                >
                  {t.featured && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-base-blue px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      <Sparkles size={11} />
                      Most popular
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    {t.featured ? (
                      <Crown size={16} className="text-base-blue" />
                    ) : t.id === "studio" ? (
                      <Flame size={16} className="text-base-blue" />
                    ) : (
                      <Sparkles size={16} className="text-base-blue" />
                    )}
                    <h3 className="font-display text-xl text-base-paper">
                      {t.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-base-fog">
                    {t.positioning}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-5xl text-base-paper">
                      ${t.price}
                    </span>
                    <span className="text-sm text-base-fog">{t.cadence}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-base-fog">
                    <span className="rounded-full bg-base-blue/10 px-2 py-0.5 text-base-blue">
                      {t.discountPct}% off bookings
                    </span>
                    <span className="rounded-full bg-base-blue/10 px-2 py-0.5 text-base-blue">
                      {t.monthlyCredits} free hrs/mo
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.perks.map((p) => (
                      <li
                        key={p.label}
                        className="flex items-start gap-2 text-sm text-base-paper"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-base-blue"
                        />
                        <span>
                          {p.label}
                          {p.description && (
                            <span className="block text-[12px] text-base-fog">
                              {p.description}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={t.ctaHref}
                    className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      t.featured
                        ? "bg-base-blue text-white hover:bg-base-blue-600"
                        : "border border-white/15 bg-white/5 text-base-paper hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {t.cta}
                    <ArrowRight size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-8 text-center text-xs text-base-stone">
              Memberships renew monthly. Cancel anytime. {siteConfig.bookingDisclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founding members section */}
      <section
        id="founding"
        className="scroll-mt-24 relative overflow-hidden border-y border-base-blue/20 bg-base-ink py-20 sm:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(30,91,255,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(30,91,255,0.18),transparent_60%)]"
        />
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-base-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                <Crown size={12} />
                {foundingOffer.badge}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-5 text-balance text-4xl text-base-paper sm:text-6xl">
                {foundingOffer.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base-fog">
                {foundingOffer.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-7 space-y-2.5">
                {foundingOffer.perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-base-paper"
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-base-blue"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={foundingOffer.ctaHref}
                  className="btn-primary"
                  target={foundingOffer.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={foundingOffer.ctaHref.startsWith("http") ? "noreferrer" : undefined}
                >
                  {foundingOffer.cta}
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Talk to a human
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative rounded-3xl border border-white/10 bg-base-smoke p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-base-fog">
                  Founding spots
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-6xl text-base-paper">
                    {foundingOffer.spotsTotal - foundingOffer.spotsClaimed}
                  </span>
                  <span className="text-sm text-base-fog">
                    of {foundingOffer.spotsTotal} remaining
                  </span>
                </div>
                <div
                  className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/5"
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full bg-base-blue"
                    style={{
                      width: `${
                        (foundingOffer.spotsClaimed / foundingOffer.spotsTotal) * 100
                      }%`,
                    }}
                  />
                </div>
                <p className="mt-4 text-xs text-base-stone">
                  When these spots are gone, the founding rate goes with them.
                </p>

                <div className="mt-7 rounded-2xl bg-base-blue/10 p-4 text-sm text-base-paper">
                  <p className="font-display text-base">Already a member?</p>
                  <p className="mt-1 text-base-fog">
                    Refer 3 friends and your next month is on us.{" "}
                    <Link
                      href="/referral"
                      className="text-base-blue underline decoration-base-blue/40 underline-offset-2 hover:decoration-base-blue"
                    >
                      See referrals →
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ-ish strip */}
      <section className="bg-base-black py-16 sm:py-20">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="h-display text-balance text-3xl text-base-paper sm:text-4xl">
                Common questions about membership.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="space-y-5">
                {faqs.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-2xl border border-white/10 bg-base-ink p-5"
                  >
                    <dt className="font-display text-base text-base-paper">
                      {f.q}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-base-fog">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

const faqs = [
  {
    q: "Do unused hours roll over?",
    a: "Up to one month's worth of credits rolls forward. After that, they're swept so the perk stays predictable for everyone.",
  },
  {
    q: "Can I share my membership with my team?",
    a: "The Studio tier includes up to 5 named team members who share the discount and credits. Creator/Founder are individual.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — monthly memberships cancel before the next billing cycle and you keep your credits for that month. Founding rates are forfeited if you cancel and rejoin later.",
  },
  {
    q: "Do you have a one-time / annual option?",
    a: "Annual prepay saves an extra month. Reach out via the Contact page and we'll set it up.",
  },
];
