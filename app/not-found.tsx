import Link from "next/link";

// Next.js adds <meta name="robots" content="noindex"> to 404 responses automatically.
export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="spotlight grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">404</p>
        <h1 className="mt-3 text-5xl font-bold">This show's been cancelled</h1>
        <p className="mt-4 text-muted">The page you're looking for doesn't exist.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-on-accent">Back to the main stage</Link>
      </div>
    </main>
  );
}
