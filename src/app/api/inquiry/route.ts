import { NextResponse } from "next/server";
import { siteConfig } from "@/data/config";

// =============================================================================
// INQUIRY API
// Receives event/tour/partner form submissions and creates a contact in
// GoHighLevel using a Private Integration Token (PIT).
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   GHL_PIT_TOKEN   — pit-... token (NEVER commit this)
//   GHL_LOCATION_ID — optional override; defaults to siteConfig.ghl.locationId
//
// If GHL_PIT_TOKEN is missing the route still returns 200 so the form's
// success state shows; the payload is logged for backup.
// =============================================================================

type InquiryBody = {
  formType?: "inquiry" | "tour" | "partner";
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  eventType?: string;
  desiredDate?: string;
  guestCount?: string | number;
  space?: string;
  needsAV?: string;
  needsOutdoor?: string;
  message?: string;
  // tour form
  preferredDate?: string;
  note?: string;
  // partner form
  partnerType?: string;
};

const FORM_TAGS: Record<string, string[]> = {
  inquiry: ["base-website", "event-inquiry"],
  tour: ["base-website", "tour-request"],
  partner: ["base-website", "partner-inquiry"],
  referral: ["base-website", "referral-signup"],
  membership: ["base-website", "membership-interest"],
};

export async function POST(request: Request) {
  let body: InquiryBody = {};
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const formType = body.formType ?? "inquiry";
  const token = process.env.GHL_PIT_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID ?? siteConfig.ghl.locationId;

  // Always log a copy server-side so submissions aren't lost if GHL is down
  // eslint-disable-next-line no-console
  console.log(`[BASE inquiry:${formType}]`, JSON.stringify(body, null, 2));

  if (!token) {
    // No PIT configured yet — accept the form so UX is unblocked.
    return NextResponse.json({ ok: true, ghl: "not-configured" });
  }

  try {
    const result = await sendToGhl(body, formType, token, locationId);
    return NextResponse.json({ ok: true, ghl: result });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[BASE inquiry] GHL forwarding failed:", err);
    // We still return ok:true so the visitor sees the success state — the log
    // is the safety net for follow-up.
    return NextResponse.json({ ok: true, ghl: "error" });
  }
}

// -----------------------------------------------------------------------------

async function sendToGhl(
  body: InquiryBody,
  formType: string,
  token: string,
  locationId: string,
) {
  const [firstName, ...rest] = (body.name ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  const tags = [...(FORM_TAGS[formType] ?? FORM_TAGS.inquiry)];
  if (body.eventType) tags.push(`event:${slug(body.eventType)}`);
  if (body.space) tags.push(`space:${slug(body.space)}`);
  if (body.partnerType) tags.push(`partner:${slug(body.partnerType)}`);

  const contactPayload: Record<string, unknown> = {
    locationId,
    firstName: firstName || body.name || "",
    lastName: lastName || "",
    email: body.email,
    phone: body.phone,
    companyName: body.organization,
    source: "base-website",
    tags,
  };

  const contactRes = await fetch(`${siteConfig.ghl.apiBase}/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: siteConfig.ghl.apiVersion,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(contactPayload),
  });

  if (!contactRes.ok) {
    const text = await contactRes.text();
    throw new Error(`Create contact failed (${contactRes.status}): ${text}`);
  }
  const contactData = (await contactRes.json()) as {
    contact?: { id?: string };
    id?: string;
  };
  const contactId =
    contactData.contact?.id ?? contactData.id ?? undefined;

  // Attach a note with the full form details (avoids needing custom fields).
  if (contactId) {
    await fetch(
      `${siteConfig.ghl.apiBase}/contacts/${contactId}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: siteConfig.ghl.apiVersion,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: formatNote(body, formType),
          userId: undefined,
        }),
      },
    ).catch((e) => {
      // Note creation is best-effort.
      // eslint-disable-next-line no-console
      console.warn("[BASE inquiry] note failed:", e);
    });
  }

  return { contactId };
}

function formatNote(body: InquiryBody, formType: string) {
  const lines = [
    `Source: BASE website (${formType})`,
    body.eventType ? `Event type: ${body.eventType}` : null,
    body.partnerType ? `Partner type: ${body.partnerType}` : null,
    body.space ? `Space of interest: ${body.space}` : null,
    body.desiredDate ? `Desired date: ${body.desiredDate}` : null,
    body.preferredDate ? `Tour date: ${body.preferredDate}` : null,
    body.guestCount ? `Estimated guests: ${body.guestCount}` : null,
    body.needsAV ? `Needs A/V: ${body.needsAV}` : null,
    body.needsOutdoor ? `Needs outdoor/food truck: ${body.needsOutdoor}` : null,
    body.organization ? `Organization: ${body.organization}` : null,
    "",
    body.message || body.note || "",
  ].filter(Boolean);
  return lines.join("\n");
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
