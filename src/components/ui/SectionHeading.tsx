import clsx from "clsx";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg" | "xl";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  size = "lg",
}: Props) {
  const sizeClass =
    size === "xl"
      ? "text-4xl sm:text-5xl md:text-6xl"
      : size === "lg"
        ? "text-3xl sm:text-4xl md:text-5xl"
        : "text-2xl sm:text-3xl md:text-4xl";

  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={clsx("h-display mt-4 text-white text-balance", sizeClass)}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-base-fog md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
