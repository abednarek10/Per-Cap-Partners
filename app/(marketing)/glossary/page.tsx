import Link from "next/link";
import type { Metadata } from "next";
import { glossary } from "@/content/glossary";
import { site, absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, definedTerm } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Music Venue Finance Glossary",
  description:
    "Plain-English definitions of music venue finance terms: per cap, ancillary revenue, show settlement, versus deal, pour cost, facility fee, fan lifetime value and more.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const termSet = {
    "@type": "DefinedTermSet",
    "@id": absoluteUrl("/glossary#set"),
    name: `${site.name} Venue Finance Glossary`,
    url: absoluteUrl("/glossary"),
    hasDefinedTerm: sorted.map(definedTerm),
  };
  return (
    <>
      <JsonLd data={graph(termSet)} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }]}
        eyebrow="Glossary"
        title="Music venue finance glossary"
        answer="Short, plain-English definitions of the numbers that run a live-music venue, from per cap and pour cost to show settlements and fan lifetime value. Each entry includes how the metric is calculated and why it matters to owners and GMs."
      />
      <Section>
        <dl className="grid gap-5 md:grid-cols-2">
          {sorted.map((t) => (
            <div key={t.slug} className="rounded-2xl border border-line bg-surface p-6">
              <dt>
                <Link href={`/glossary/${t.slug}`} className="text-xl font-bold hover:text-accent-ink">{t.term}</Link>
              </dt>
              <dd className="mt-2 text-muted">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <CtaBand />
    </>
  );
}
