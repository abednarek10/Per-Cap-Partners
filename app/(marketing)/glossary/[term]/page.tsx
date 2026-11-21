import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { glossary, getTerm } from "@/content/glossary";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, definedTerm } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

type Props = { params: Promise<{ term: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return glossary.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTerm((await params).term);
  if (!t) return {};
  return pageMetadata({
    title: `What Is ${t.term}? Definition for Music Venues`,
    description: t.definition.length > 158 ? `${t.definition.slice(0, 155).trimEnd()}…` : t.definition,
    path: `/glossary/${t.slug}`,
  });
}

export default async function TermPage({ params }: Props) {
  const t = getTerm((await params).term);
  if (!t) notFound();
  const related = t.related.map(getTerm).filter((x) => x !== undefined);
  const svc = t.service ? getService(t.service) : undefined;

  return (
    <>
      <JsonLd data={graph(definedTerm(t))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }, { name: t.term, path: `/glossary/${t.slug}` }]}
        eyebrow="Venue finance glossary"
        title={`What is ${t.term.toLowerCase()}?`}
        answer={t.definition}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article className="prose-venue">
            {t.formula && (
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="!mt-0 text-xl text-ink">Formula</h2>
                <p className="font-mono text-base !text-ink">{t.formula}</p>
              </div>
            )}
            {t.example && (
              <div className="mt-5 rounded-2xl border border-line bg-surface p-6">
                <h2 className="!mt-0 text-xl text-ink">Example</h2>
                <p>{t.example}</p>
              </div>
            )}
            <h2 className="text-ink">Why it matters</h2>
            {t.body.map((p) => <p key={p}>{p}</p>)}
          </article>
          <aside className="space-y-8">
            {related.length > 0 && (
              <div>
                <h2 className="text-lg font-bold">Related terms</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}><Link href={`/glossary/${r.slug}`} className="text-accent-ink hover:underline">{r.term}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            {svc && (
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="text-lg font-bold">Put it to work</h2>
                <p className="mt-2 text-sm text-muted">{svc.description}</p>
                <Link href={`/services/${svc.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent-ink hover:underline">
                  {svc.name} →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
