import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

// Always evaluate at request time. The lib has its own 60s in-memory TTL.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date") ?? undefined;

  try {
    const report = await getAvailability(date);
    return NextResponse.json(report, {
      headers: {
        // Allow Vercel's CDN to hold the response briefly so we don't hit
        // GHL on every visitor refresh. SWR keeps it snappy.
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("[availability] failed:", err);
    return NextResponse.json(
      { error: "availability_unavailable" },
      { status: 200 },
    );
  }
}
