import clsx from "clsx";

type Props = {
  label?: string;
  caption?: string;
  className?: string;
  tone?: "dark" | "light";
  aspect?: "square" | "video" | "portrait" | "wide" | "auto";
};

// =============================================================================
// PLACEHOLDER IMAGE COMPONENT
// Use anywhere a real image should eventually live.
// The `label` shows the slot name so it's obvious what to replace.
// =============================================================================
export function Placeholder({
  label = "Image slot",
  caption,
  className,
  tone = "dark",
  aspect = "video",
}: Props) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
        ? "aspect-video"
        : aspect === "portrait"
          ? "aspect-[3/4]"
          : aspect === "wide"
            ? "aspect-[16/7]"
            : "";

  return (
    <div
      className={clsx(
        "relative isolate flex w-full items-center justify-center overflow-hidden rounded-2xl",
        aspectClass,
        tone === "dark"
          ? "bg-[radial-gradient(circle_at_30%_20%,rgba(30,91,255,0.18),transparent_60%),linear-gradient(180deg,#1A1A1F,#0F0F12)] text-base-fog"
          : "bg-[radial-gradient(circle_at_30%_20%,rgba(30,91,255,0.15),transparent_60%),linear-gradient(180deg,#F5F5F2,#E6E6E2)] text-base-stone",
        className
      )}
      aria-label={`${label} (placeholder)`}
    >
      <div
        aria-hidden
        className={clsx(
          "absolute inset-0 opacity-40",
          tone === "dark" ? "bg-grid-light" : "bg-grid-dark"
        )}
        style={{ backgroundSize: "24px 24px" }}
      />
      <div className="relative z-10 px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-base-blue">
          Image
        </p>
        <p className="mt-1 font-display text-sm font-medium">{label}</p>
        {caption && (
          <p className="mx-auto mt-1 max-w-xs text-[11px] leading-snug opacity-70">
            {caption}
          </p>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}
