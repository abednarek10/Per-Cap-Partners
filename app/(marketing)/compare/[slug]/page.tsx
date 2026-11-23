import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { comparisons, getComparison } from "@/content/compare";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList, Eyebrow } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getComparison((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.description, path: `/compare/${c.slug}` });
}

export default async function ComparePage({ params }: Props) {
  const c = getComparison((await params).slug);
  if (!c) notFound();
  const webPage = {
    "@type": "WebPage",
    "@id": absoluteUrl(`/compare/${c.slug}#page`),
    name: c.title,
    description: c.answer,
    url: absoluteUrl(`/compare/${c.slug}`),
    about: c.options.map((o) => ({ "@type": "Thing", name: o.name })),
  };

  return (
    <>
      <JsonLd data={graph(webPage, faqPage(c.faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }, { name: c.h1, path: `/compare/${c.slug}` }]}
        eyebrow="Compare your options"
        title={c.h1}
        answer={c.answer}
        whoFor={c.whoFor}
      />
      <Section aria-labelledby="options-heading">
        <h2 id="options-heading" className="sr-only">Options compared</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {c.options.map((o) => (
            <div key={o.name} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">{o.name}</h3>
              <p className="mt-2 text-sm"><span className="font-semibold">Best for: </span><span className="text-muted">{o.bestFor}</span></p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Strengths</p>
              <ul className="mt-2 space-y-1.5 text-sm">{o.strengths.map((s) => <li key={s} className="flex gap-2"><span aria-hidden className="text-accent-ink">+</span>{s}</li>)}</ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Limits</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">{o.limits.map((s) => <li key={s} className="flex gap-2"><span aria-hidden>−</span>{s}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl rounded-2xl border border-accent/50 bg-surface p-6">
          <Eyebrow>Our take</Eyebrow>
          <p className="mt-3 text-lg">{c.verdict}</p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {c.related.map((r) => <li key={r.href}><Link href={r.href} className="text-accent-ink hover:underline">{r.label} →</Link></li>)}
        </ul>
      </Section>
      <Section className="border-t border-line" aria-labelledby="compare-faq">
        <h2 id="compare-faq" className="text-3xl font-bold">Common questions</h2>
        <div className="mt-8"><FaqList faqs={c.faqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
