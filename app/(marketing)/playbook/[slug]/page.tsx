import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { playbook, getPlaybookEntry } from "@/content/playbook";
import { founderDisplayName, primaryCta } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, playbookArticle, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList } from "@/components/ui";
import { WorkedExample } from "@/components/marketing/worked-example";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return playbook.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getPlaybookEntry((await params).slug);
  if (!e) return {};
  const base = pageMetadata({ title: e.title, description: e.description, path: `/playbook/${e.slug}`, type: "article", publishedTime: e.drafted, modifiedTime: e.certified?.date ?? e.drafted });
  // Uncertified drafts stay out of search and AI indexes until a CPA signs off.
  return e.certified ? base : { ...base, robots: { index: false, follow: false } };
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function PlaybookEntryPage({ params }: Props) {
  const e = getPlaybookEntry((await params).slug);
  if (!e) notFound();

  return (
    <>
      <JsonLd data={graph(playbookArticle(e), faqPage(e.faqs))} />
      {!e.certified && (
        <div role="note" className="border-b border-accent bg-surface-2">
          <p className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
            <strong>Draft, pending CPA review.</strong> This entry was drafted on {fmt(e.drafted)} and hasn't been certified yet. It
            isn't published to search engines until it is.
          </p>
        </div>
      )}
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Playbook", path: "/playbook" }, { name: e.title, path: `/playbook/${e.slug}` }]}
        eyebrow={`Operator playbook · ${e.category}`}
        title={e.title}
        answer={e.answer}
        whoFor={e.whoFor}
        meta={e.certified ? <span data-reviewed>Reviewed by {founderDisplayName()} · {fmt(e.certified.date)}</span> : undefined}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article className="min-w-0">
            {e.sections.map((s) => (
              <section key={s.heading} className="prose-venue">
                <h2 className="text-ink">{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
                {s.formula && (
                  <p className="!mt-5 rounded-xl border border-line bg-surface p-4 font-mono text-sm !text-ink">{s.formula}</p>
                )}
              </section>
            ))}
            <div className="mt-10"><WorkedExample example={e.example} /></div>
            <section className="prose-venue">
              <h2 className="text-ink">Common mistakes</h2>
              <ul>{e.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
            </section>
          </article>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="text-lg font-bold">Related</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {e.related.map((r) => (
                  <li key={r.href}><Link href={r.href} className="text-accent-ink hover:underline">{r.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/50 bg-surface p-6">
              <h2 className="text-lg font-bold">See it on your numbers</h2>
              <p className="mt-2 text-sm text-muted">Get your most and least profitable shows from 90 days of data, free.</p>
              <Link href={primaryCta.href} className="mt-4 inline-block text-sm font-semibold text-accent-ink hover:underline">{primaryCta.label} →</Link>
            </div>
          </aside>
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="entry-faq">
        <h2 id="entry-faq" className="text-3xl font-bold">Common questions</h2>
        <div className="mt-8"><FaqList faqs={e.faqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
