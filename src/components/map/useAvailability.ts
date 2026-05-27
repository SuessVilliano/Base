"use client";

import { useEffect, useRef, useState } from "react";
import type {
  AvailabilityReport,
  AvailabilityStatus,
  SpaceAvailability,
} from "@/lib/availability";

export type { AvailabilityStatus, SpaceAvailability };

export type AvailabilityState = {
  report: AvailabilityReport | null;
  loading: boolean;
  error: string | null;
  /** epoch ms of the last successful refresh */
  lastUpdated: number | null;
};

export type AvailabilityOptions = {
  /** YYYY-MM-DD; omit for "today in ET" (server decides). */
  date?: string;
  /** Refresh interval in ms. Pass 0 to disable. */
  refreshMs?: number;
};

export function useAvailability(opts: AvailabilityOptions = {}): AvailabilityState {
  const { date, refreshMs = 60_000 } = opts;
  const [state, setState] = useState<AvailabilityState>({
    report: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });
  // Avoid setState after unmount on the StrictMode double-effect path.
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const url = date ? `/api/availability?date=${date}` : `/api/availability`;

    async function pull() {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as AvailabilityReport;
        if (cancelled || !aliveRef.current) return;
        setState({
          report: json,
          loading: false,
          error: null,
          lastUpdated: Date.now(),
        });
      } catch (err: unknown) {
        if (cancelled || !aliveRef.current) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
      }
    }

    setState((prev) => ({ ...prev, loading: true }));
    pull();

    if (refreshMs > 0) {
      const id = setInterval(pull, refreshMs);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }
    return () => {
      cancelled = true;
    };
  }, [date, refreshMs]);

  return state;
}
