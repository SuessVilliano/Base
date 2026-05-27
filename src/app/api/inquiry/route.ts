import { NextResponse } from "next/server";

// =============================================================================
// INQUIRY API
// TODO: wire this to GoHighLevel (or your CRM of choice).
// For now it just logs to the server console so the form flows end-to-end.
// =============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // eslint-disable-next-line no-console
    console.log("[BASE inquiry]", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
