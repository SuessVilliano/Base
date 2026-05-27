"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/config";
import { spaces } from "@/data/spaces";

const eventTypes = [
  "Private event",
  "Corporate meeting / off-site",
  "Community forum",
  "Nonprofit event",
  "Workshop / training",
  "Podcast / media production",
  "Music / artist showcase",
  "Youth program",
  "Sports / wellness activation",
  "Vendor market",
  "Food truck event",
  "Art show",
  "Networking mixer",
  "Business launch",
  "Brand activation",
  "Educational program",
  "Graduation / celebration",
  "Livestream event",
  "Panel discussion",
  "Content day",
  "Other",
];

// =============================================================================
// MAIN INQUIRY / BOOKING FORM
// On submit, the form payload is POSTed to /api/inquiry (currently logs).
// Wire this endpoint to GoHighLevel (or your CRM) when ready.
// =============================================================================
export function InquiryForm() {
  const params = useSearchParams();
  const preselectedSpace = params.get("space") ?? "";
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-base-blue/30 bg-base-blue/5 p-10 text-center">
        <CheckCircle2 className="mx-auto text-base-blue" size={36} />
        <h3 className="mt-4 font-display text-2xl text-white">
          Thank you — we received your inquiry.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-base-fog">
          A BASE team member will reach out shortly. {siteConfig.bookingDisclaimer}
        </p>
      </div>
    );
  }

  return (
    <form
      id="inquire"
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-base-ink p-6 sm:p-8"
    >
      <h3 className="font-display text-2xl text-white">
        Tell us about your event
      </h3>
      <p className="mt-2 text-sm text-base-fog">
        Share the basics and we'll get back to you with availability, pricing,
        and a tour invite.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Organization (optional)" name="organization" />

        <SelectField
          label="Event type"
          name="eventType"
          required
          options={eventTypes}
        />
        <Field label="Desired date" name="desiredDate" type="date" />
        <Field
          label="Estimated guest count"
          name="guestCount"
          type="number"
          min={1}
        />
        <SelectField
          label="Space interested in"
          name="space"
          defaultValue={preselectedSpace}
          options={["Not sure yet", ...spaces.map((s) => s.name)]}
        />

        <ToggleField
          label="Do you need audio/video?"
          name="needsAV"
        />
        <ToggleField
          label="Do you need food truck / outdoor space?"
          name="needsOutdoor"
        />

        <div className="sm:col-span-2">
          <Field
            label="Message"
            name="message"
            multiline
            placeholder="Tell us about the vibe, special needs, vendors, or anything else."
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-base-stone">
          {siteConfig.bookingDisclaimer}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Sending…
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Field primitives
// -----------------------------------------------------------------------------

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  min?: number;
  defaultValue?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  multiline,
  min,
  defaultValue,
}: FieldProps) {
  const base =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-base-stone focus:border-base-blue/60 focus:bg-white/[0.06]";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-base-paper">
        {label} {required && <span className="text-base-blue">*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={base}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          min={min}
          defaultValue={defaultValue}
          className={base}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-base-paper">
        {label} {required && <span className="text-base-blue">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-base-blue/60 focus:bg-white/[0.06]"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleField({ label, name }: { label: string; name: string }) {
  return (
    <fieldset className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <legend className="px-1 text-[12px] font-medium text-base-paper">
        {label}
      </legend>
      <div className="mt-1 flex gap-4 text-sm text-base-paper">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name={name} value="yes" className="accent-base-blue" />
          Yes
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name={name} value="no" className="accent-base-blue" />
          No
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name={name} value="maybe" defaultChecked className="accent-base-blue" />
          Not sure
        </label>
      </div>
    </fieldset>
  );
}
