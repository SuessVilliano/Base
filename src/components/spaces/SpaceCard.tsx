import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import type { Space } from "@/data/spaces";
import { Placeholder } from "@/components/ui/Placeholder";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <article
      id={space.id}
      className="group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-white/10 bg-base-ink transition-all hover:border-base-blue/40"
    >
      <div className="relative">
        <Placeholder
          label={space.name}
          caption={`Replace at /public/spaces/${space.id}/hero.jpg`}
          aspect="wide"
          className="rounded-none"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-base-blue px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {space.category}
          </span>
          {space.emoji && (
            <span className="text-lg" aria-hidden>
              {space.emoji}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-white">{space.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-base-fog">
          {space.positioning}
        </p>

        <div className="mt-5 flex items-center gap-2 text-[12px] text-base-paper">
          <Users size={14} className="text-base-blue" />
          <span>{space.capacity}</span>
        </div>

        {space.bestUses.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {space.bestUses.slice(0, 6).map((u) => (
              <li
                key={u}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-base-paper"
              >
                {u}
              </li>
            ))}
            {space.bestUses.length > 6 && (
              <li className="rounded-full bg-base-blue/15 px-2.5 py-1 text-[11px] text-base-blue">
                +{space.bestUses.length - 6} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          <Link
            href={`/book?space=${space.id}`}
            className="inline-flex items-center gap-1 rounded-full bg-base-blue px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-base-blue-600"
          >
            Book This Space
          </Link>
          <Link
            href={`/book?space=${space.id}#inquire`}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold text-base-paper hover:border-white/30 hover:bg-white/10"
          >
            Ask About This Space
          </Link>
          <Link
            href="/map"
            className="ml-auto inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-base-fog hover:text-white"
          >
            See on map <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
