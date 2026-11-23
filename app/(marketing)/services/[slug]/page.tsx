import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService } from "@/content/services";
import { getOffer, priceLabel } from "@/content/offers";
import { site, primaryCta } from "@/lib/site";
import { glossary } from "@/content/glossary";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage, service as serviceLd } from "@/lib/seo/jsonld";
import { Section, Eyebrow, FaqList, JsonLd, PageHero, CtaBand } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const terms = glossary.filter((t) => t.service === s.slug);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={graph(serviceLd(s), faqPage(s.faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.navLabel, path: `/services/${s.slug}` }]}
        eyebrow={s.name}
        title={s.h1}
        answer={s.answer}
        whoFor={s.whoFor}
        meta={site.showPricing ? <span className="font-semibold text-accent-ink">{priceLabel(getOffer(s.offerId).price)} · {getOffer(s.offerId).timeline}</span> : undefined}
      />

      <Section aria-labelledby="problems">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Sound familiar?</Eyebrow>
            <h2 id="problems" className="mt-3 text-3xl font-bold sm:text-4xl">Where the money goes missing</h2>
          </div>
          <ul className="space-y-4">
            {s.problems.map((p) => (
              <li key={p} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-lg">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="levers">
        <Eyebrow>What we look at</Eyebrow>
        <h2 id="levers" className="mt-3 text-3xl font-bold sm:text-4xl">The levers we pull</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {s.levers.map((l) => (
            <div key={l.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">{l.title}</h3>
              <p className="mt-3 text-muted">{l.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="deliverables">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 id="deliverables" className="mt-3 text-3xl font-bold sm:text-4xl">Certified deliverables</h2>
            <ul className="mt-8 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3"><span aria-hidden className="text-accent-ink">✓</span>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Metrics we track</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.metrics.map((m) => (
                <li key={m} className="rounded-full border border-line bg-surface px-4 py-2 text-sm">{m}</li>
              ))}
            </ul>
            {terms.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-bold">Key terms</h3>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {terms.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/glossary/${t.slug}`} className="text-accent-ink underline decoration-line hover:decoration-accent">
                        What is {t.term.toLowerCase()}?
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        {s.disclaimer && <p className="mt-12 rounded-xl border border-line bg-surface-2 p-5 text-sm text-muted">{s.disclaimer}</p>}
      </Section>

      <Section className="border-t border-line" aria-labelledby="faqs">
        <h2 id="faqs" className="text-3xl font-bold sm:text-4xl">{s.navLabel}: common questions</h2>
        <div className="mt-8"><FaqList faqs={s.faqs} /></div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="related">
        <h2 id="related" className="text-2xl font-bold">Learn more</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {s.related.map((r) => (
            <li key={r.href}><Link href={r.href} className="text-accent-ink hover:underline">{r.label} →</Link></li>
          ))}
        </ul>
        <h3 className="mt-10 text-lg font-bold">Other services</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="block rounded-2xl border border-line bg-surface p-5 hover:border-accent">
                <span className="font-semibold">{o.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={primaryCta.href} className="block rounded-2xl border border-accent/60 bg-surface p-5 hover:border-accent">
              <span className="font-semibold">Free show profitability snapshot</span>
            </Link>
          </li>
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
