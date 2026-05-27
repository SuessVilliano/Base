import Link from "next/link";
import clsx from "clsx";

type Props = {
  className?: string;
  showWordmark?: boolean;
  href?: string;
};

export function Logo({ className, showWordmark = true, href = "/" }: Props) {
  return (
    <Link
      href={href}
      aria-label="BASE — Business. Arts. Sports. Education."
      className={clsx("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-base-paper text-base-black">
        <span className="absolute inset-0 rounded-md bg-base-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative font-display text-[14px] font-bold tracking-tightest">
          B
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-base-blue ring-2 ring-base-black" />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tightest text-base-paper">
          BASE
        </span>
      )}
    </Link>
  );
}
