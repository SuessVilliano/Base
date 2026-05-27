import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-base-black pt-32">
      <div className="container-base text-center">
        <p className="eyebrow">404</p>
        <h1 className="h-display mt-4 text-5xl text-white sm:text-7xl">
          That door's not open.
        </h1>
        <p className="mt-4 text-base-fog">
          Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/spaces" className="btn-secondary">
            Spaces
          </Link>
          <Link href="/book" className="btn-secondary">
            Book
          </Link>
        </div>
      </div>
    </section>
  );
}
