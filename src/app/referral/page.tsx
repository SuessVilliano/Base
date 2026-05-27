import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Gift,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ReferralSignupForm } from "@/components/booking/ReferralSignupForm";
import { referralProgram } from "@/data/referral";

export const metadata: Metadata = {
  title: "Refer & Earn — Share BASE, earn free hours",
  description:
    "Refer friends to BASE Wilmington and earn free hours, free events, and member upgrades. Members earn 2× faster.",
};

export default function ReferralPage() {
  return (
    <>
      <PageHeader
        eyebrow="Refer & Earn"
        title={
          <>
            {referralProgram.headline.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="text-base-blue">
              {referralProgram.headline.split(" ").slice(2).join(" ")}
            </span>
          </>
        }
        description={referralProgram.subhead}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link href="#start" className="btn-primary">
            Get my link
          </Link>
          <Link href="/membership" className="btn-secondary">
            See member perks →
          </Link>
        </div>
      </PageHeader>

      {/* How it works */}
      <section className="border-b border-white/5 bg-base-ink py-16 sm:py-24">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">How it works</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-base-paper sm:text-5xl">
              Three steps. <span className="text-base-blue">Free hours.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {referralProgram.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <article className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-base-smoke p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-base-blue">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-base-paper">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-fog">
                    {s.copy}
                  </p>
                  {i < 2 && (
                    <ArrowRight
                      size={18}
                      className="absolute right-5 top-7 hidden text-base-blue/60 md:block"
                    />
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reward ladder */}
      <section className="bg-base-black py-20 sm:py-28">
        <div className="container-base">
          <Reveal>
            <p className="eyebrow">Reward ladder</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-display mt-4 max-w-3xl text-balance text-3xl text-base-paper sm:text-5xl">
              The more you share, the more BASE gives back.
            </h2>
          </Reveal>

          <ol className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {referralProgram.rewards.map((r, i) => {
              const Icon = i === 0 ? Sparkles : i === referralProgram.rewards.length - 1 ? Trophy : Gift;
              return (
                <Reveal key={r.threshold} delay={i * 0.04}>
                  <li className="group relative h-full rounded-2xl border border-white/10 bg-base-ink p-6 transition-all hover:-translate-y-1 hover:border-base-blue/40">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-5xl text-base-paper">
                        {r.threshold}
                      </span>
                      <Icon size={18} className="text-base-blue" />
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-base-fog">
                      referrals
                    </p>
                    <p className="mt-5 font-display text-base text-base-paper">
                      {r.reward}
                    </p>
                    <p className="mt-2 text-[13px] leading-snug text-base-fog">
                      {r.description}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-base-blue/30 bg-base-blue/5 p-6 md:flex-row md:items-center md:p-8">
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-base-blue/15 p-2.5 text-base-blue">
                  <Users size={18} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-base-paper">
                    {referralProgram.memberMultiplier.headline}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-base-fog">
                    {referralProgram.memberMultiplier.copy}
                  </p>
                </div>
              </div>
              <Link href="/membership" className="btn-primary shrink-0">
                See membership tiers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Signup form */}
      <section
        id="start"
        className="scroll-mt-24 border-y border-white/5 bg-base-ink py-20 sm:py-24"
      >
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Get started</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-4 text-balance text-3xl text-base-paper sm:text-4xl">
                Grab your personal referral link in 30 seconds.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base-fog">
                Drop your name and email — we'll generate a tracked link unique
                to you and start your credit balance.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-6 space-y-2 text-sm text-base-paper">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-base-blue" />
                  No fees — joining the program is free.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-base-blue" />
                  Credits land in your account automatically.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-base-blue" />
                  Track your referrals + balance from your member dashboard.
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ReferralSignupForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-black py-16 sm:py-20">
        <div className="container-base grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="h-display text-balance text-3xl text-base-paper sm:text-4xl">
                Referral FAQ.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="space-y-4">
                {referralProgram.faqs.map((f) => (
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
