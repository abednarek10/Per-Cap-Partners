import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/content/insights";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Insights for Music Venue Owners and GMs",
  description: "Practical guides on venue finance: per cap, settlements, labor, pricing, cash flow and working with a fractional CFO.",
  path: "/insights",
});

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }]} eyebrow="Insights" title="Venue finance, explained by operators" />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {sorted.map((a) => (
            <li key={a.slug}>
              <Link href={`/insights/${a.slug}`} className="block h-full rounded-2xl border border-line bg-surface p-7 hover:border-accent">
                <p className="text-sm text-muted"><time dateTime={a.published}>{fmt(a.published)}</time> · {a.readingMinutes} min read</p>
                <h2 className="mt-3 text-2xl font-bold">{a.title}</h2>
                <p className="mt-3 text-muted">{a.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
