import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/5 bg-base-ink pt-32 sm:pt-36">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-24 -z-10 h-72 bg-[radial-gradient(circle_at_50%_50%,rgba(30,91,255,0.25),transparent_60%)]"
      />
      <div className="container-base pb-16 sm:pb-20">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="h-display mt-4 max-w-4xl text-balance text-5xl text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base text-base-fog md:text-lg">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.15}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
