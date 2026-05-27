"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { partnerTypes } from "@/data/partner";

export function PartnerForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      await fetch("/api/inquiry?type=partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "partner" }),
      });
    } finally {
      setSubmitting(false);
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-base-blue/30 bg-base-blue/5 p-6 text-center">
        <CheckCircle2 className="mx-auto text-base-blue" size={28} />
        <p className="mt-3 text-sm text-white">
          Thanks for your interest — we'll be in touch about partnership.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-base-ink p-6 sm:p-8"
    >
      <h3 className="font-display text-2xl text-white">Partner Inquiry</h3>
      <p className="mt-2 text-sm text-base-fog">
        Tell us how you'd like to invest, advocate, or partner with BASE.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <input
          name="organization"
          placeholder="Organization"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <select
          name="partnerType"
          required
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white sm:col-span-2"
        >
          <option value="">Partnership type</option>
          {partnerTypes.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about your goals."
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone sm:col-span-2"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-6"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
        Send Partner Inquiry
      </button>
    </form>
  );
}
