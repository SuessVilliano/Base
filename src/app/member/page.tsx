import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CreditCard,
  KeyRound,
  LogIn,
  MessagesSquare,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Member Portal — Login, bookings, billing, and BASE Community",
  description:
    "Sign in to your BASE member account to manage bookings, billing, and your profile, and to access the BASE Community.",
};

const tiles = [
  {
    title: "Your bookings",
    description:
      "See upcoming and past reservations, reschedule, and grab calendar invites.",
    href: siteConfig.community.bookingsUrl,
    icon: Calendar,
  },
  {
    title: "Billing & invoices",
    description:
      "Payment methods, receipts, and your member-pricing breakdown — all in one place.",
    href: siteConfig.community.billingUrl,
    icon: CreditCard,
  },
  {
    title: "BASE Community",
    description:
      "Real-time channels with other members — entrepreneurs, creatives, and operators.",
    href: siteConfig.community.communityUrl,
    icon: MessagesSquare,
  },
  {
    title: "Profile & preferences",
    description:
      "Update your contact info, photo, and notification preferences.",
    href: siteConfig.community.profileUrl,
    icon: UserCircle,
  },
];

export default function MemberPortalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Member Portal"
        title={
          <>
            Welcome back to <span className="text-base-blue">BASE</span>.
          </>
        }
        description="Sign in to manage your bookings, billing, profile, and access the BASE Community."
      />

      {/* CTA card */}
      <section className="container-base -mt-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-base-ink p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-base-blue/15 text-base-blue">
              <KeyRound size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl text-white sm:text-3xl">
              Sign in to your BASE account
            </h2>
            <p className="mt-3 max-w-md text-balance text-sm text-base-fog sm:text-base">
              Use the email you booked or joined with — or sign in with Google
              if that&apos;s how you set it up. New here?{" "}
              <Link
                href="/membership"
                className="text-base-blue underline-offset-2 hover:underline"
              >
                Become a member
              </Link>
              .
            </p>

            <div className="mt-7 flex w-full flex-col items-stretch gap-2 sm:max-w-sm">
              <a
                href={siteConfig.community.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                <LogIn size={16} />
                Open Member Login
                <ArrowRight size={14} />
              </a>
              <p className="text-[11px] uppercase tracking-[0.22em] text-base-stone">
                Google or email · opens secure portal
              </p>
            </div>

            <p className="mt-6 max-w-md text-[12px] leading-relaxed text-base-stone">
              Your member account lives on our secure Client Club portal at{" "}
              <span className="font-mono text-base-paper">
                base.app.clientclub.net
              </span>
              . Bookings, billing, and community all sync there in real time.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="container-base pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Inside your account</p>
          <h2 className="h-display mt-3 text-balance text-3xl text-white sm:text-4xl">
            Everything BASE, in one tab.
          </h2>
          <p className="mt-3 text-base-fog">
            Once you sign in, you&apos;ll land in a private portal with these
            tools.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-base-ink p-5 transition-colors hover:border-base-blue/40 hover:bg-white/[0.04]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-base-blue group-hover:bg-base-blue/15">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-white">{t.title}</h3>
                  <p className="mt-1 text-sm text-base-fog">{t.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-base-blue/80 group-hover:text-base-blue">
                    Open
                    <ArrowRight size={12} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Not a member yet */}
      <section className="border-t border-white/5 bg-base-ink/40">
        <div className="container-base py-16 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Sparkles size={20} className="text-base-blue" />
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              Not a member yet?
            </h2>
            <p className="mt-3 max-w-xl text-base-fog">
              Members unlock priority booking, member pricing on every space,
              monthly credits, and the BASE Community. Three tiers — Creator,
              Founder, Studio.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Link href="/membership" className="btn-primary">
                See membership tiers
              </Link>
              <Link href="/book?type=tour" className="btn-secondary">
                Or book a tour first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
