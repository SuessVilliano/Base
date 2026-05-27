"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Loader2 } from "lucide-react";

// =============================================================================
// REFERRAL SIGNUP FORM
// Posts to /api/inquiry with formType=referral. The API route tags the
// contact in GHL and (when wired) returns a tracked referral link.
// For now we synthesize a placeholder link from the email so visitors see
// what their link will look like.
// =============================================================================
export function ReferralSignupForm() {
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    try {
      await fetch("/api/inquiry?type=referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "referral" }),
      });
    } finally {
      // Placeholder tracked link — replace with the real one returned by the
      // CRM / referral platform when wired up.
      const slug =
        (payload.email ?? "")
          .toLowerCase()
          .split("@")[0]
          ?.replace(/[^a-z0-9]+/g, "-")
          .slice(0, 24) || "you";
      setLink(`https://base.liv8.co/?ref=${slug}`);
      setSubmitting(false);
    }
  }

  if (link) {
    return (
      <div className="rounded-3xl border border-base-blue/30 bg-base-blue/5 p-6 sm:p-8">
        <CheckCircle2 className="text-base-blue" size={28} />
        <h3 className="mt-3 font-display text-2xl text-base-paper">
          You're in. Here's your referral link.
        </h3>
        <p className="mt-2 text-sm text-base-fog">
          Share it anywhere. We'll credit hours to your BASE account every time
          someone joins or books through it.
        </p>

        <div className="mt-5 flex items-stretch gap-2 rounded-xl border border-white/10 bg-base-ink p-2">
          <input
            readOnly
            value={link}
            className="flex-1 bg-transparent px-2 text-sm text-base-paper outline-none"
            onFocus={(e) => e.currentTarget.select()}
          />
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-base-blue px-3 py-2 text-xs font-semibold text-white hover:bg-base-blue-600"
          >
            <Copy size={12} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="mt-4 text-[11px] text-base-stone">
          Tip: a tracked link will be issued by the CRM in the next step — for
          now this is your preview link.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-base-ink p-6 sm:p-8"
    >
      <h3 className="font-display text-2xl text-base-paper">
        Get my referral link
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-base-paper placeholder:text-base-stone"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-base-paper placeholder:text-base-stone"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-base-paper placeholder:text-base-stone sm:col-span-2"
        />
        <select
          name="audience"
          required
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-base-paper sm:col-span-2"
        >
          <option value="">Who are you sharing with?</option>
          <option>Friends & community</option>
          <option>My audience / followers</option>
          <option>Clients & businesses</option>
          <option>Nonprofit / org network</option>
          <option>Mixed</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-6 w-full sm:w-auto"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
        Generate my link
      </button>
      <p className="mt-3 text-[11px] text-base-stone">
        By signing up you agree to our referral program terms.
      </p>
    </form>
  );
}
