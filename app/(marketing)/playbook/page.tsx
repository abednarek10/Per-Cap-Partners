import Link from "next/link";
import type { Metadata } from "next";
import { playbook, publishedPlaybook, type PlaybookEntry } from "@/content/playbook";
import { site, absoluteUrl, founderDisplayName } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Operator Playbook: Best Practices for Venue Groups",
  description:
    "CPA-reviewed best practices for running venue groups profitably: show-level P&L, artist offers, labor allocation, settlements, cash forecasting and lender covenants.",
  path: "/playbook",
});

const categories: PlaybookEntry["category"][] = ["Show profitability", "Booking & deals", "Cash & lenders", "Operations"];

export default function PlaybookHub() {
  const published = publishedPlaybook();
  const pending = playbook.filter((e) => !e.certified);
  const collection = {
    "@type": "CollectionPage",
    "@id": absoluteUrl("/playbook#collection"),
    name: `${site.name} Operator Playbook`,
    url: absoluteUrl("/playbook"),
    hasPart: published.map((e) => ({ "@type": "Article", headline: e.title, url: absoluteUrl(`/playbook/${e.slug}`) })),
  };

  return (
    <>
      <JsonLd data={graph(collection)} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Playbook", path: "/playbook" }]}
        eyebrow="Operator playbook"
        title="How to run a venue group profitably"
        answer={`The Operator Playbook is a library of best practices for independent venue groups: how to measure show-level profitability, set artist offers from per cap, allocate labor, read settlements, forecast cash around deposits and track lender covenants. Every entry has a formula, a worked example and common mistakes, and is reviewed by ${founderDisplayName()}.`}
        whoFor={site.audience}
      />
      <Section>
        {published.length > 0 ? (
          <div className="space-y-12">
            {categories.map((cat) => {
              const items = published.filter((e) => e.category === cat);
              if (!items.length) return null;
              return (
                <section key={cat} aria-labelledby={`cat-${cat}`}>
                  <h2 id={`cat-${cat}`} className="text-2xl font-bold">{cat}</h2>
                  <ul className="mt-5 grid gap-4 md:grid-cols-2">
                    {items.map((e) => (
                      <li key={e.slug}>
                        <Link href={`/playbook/${e.slug}`} className="block h-full rounded-2xl border border-line bg-surface p-6 hover:border-accent">
                          <h3 className="text-lg font-bold">{e.title}</h3>
                          <p className="mt-2 text-sm text-muted">{e.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <p className="text-lg text-muted">The first entries are in CPA review and will publish here as each one is certified.</p>
        )}

        {pending.length > 0 && (
          <section className="mt-14" aria-labelledby="coming">
            <h2 id="coming" className="text-xl font-bold">In review</h2>
            <ul className="mt-4 grid gap-2 text-muted md:grid-cols-2">
              {pending.map((e) => <li key={e.slug}>{e.title}</li>)}
            </ul>
          </section>
        )}

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Link href="/glossary" className="rounded-2xl border border-line bg-surface p-6 hover:border-accent">
            <h2 className="text-lg font-bold">Venue finance glossary</h2>
            <p className="mt-1 text-sm text-muted">Definitions with formulas: per cap, show P&amp;L, guarantees, DSCR and more.</p>
          </Link>
          <Link href="/compare" className="rounded-2xl border border-line bg-surface p-6 hover:border-accent">
            <h2 className="text-lg font-bold">Compare your options</h2>
            <p className="mt-1 text-sm text-muted">Fractional CFO vs. controller, spreadsheets vs. a platform, and how booking software fits.</p>
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
