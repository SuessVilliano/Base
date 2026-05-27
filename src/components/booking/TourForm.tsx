"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function TourForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      await fetch("/api/inquiry?type=tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: "tour" }),
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
          Tour request received. We'll confirm a time shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id="tour"
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-base-ink p-6"
    >
      <h3 className="font-display text-xl text-white">Schedule a Tour</h3>
      <p className="mt-1 text-sm text-base-fog">
        See BASE in person — we'll walk you through every space.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
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
          required
          placeholder="Phone"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <input
          name="preferredDate"
          type="date"
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone"
        />
        <textarea
          name="note"
          placeholder="Anything you want us to know?"
          rows={3}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone sm:col-span-2"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-5 w-full sm:w-auto"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
        Request Tour
      </button>
    </form>
  );
}
