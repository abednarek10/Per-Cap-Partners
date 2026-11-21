import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/content/insights";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, article as articleLd } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.description, path: `/insights/${a.slug}`, type: "article", publishedTime: a.published, modifiedTime: a.updated });
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return (
    <>
      <JsonLd data={graph(articleLd(a))} />
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: a.title, path: `/insights/${a.slug}` }]} title={a.title} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">
            By {site.founder.name} · <time dateTime={a.published}>{fmt(a.published)}</time>
            {a.updated !== a.published && <> · Updated <time dateTime={a.updated}>{fmt(a.updated)}</time></>} · {a.readingMinutes} min read
          </p>
          <aside aria-labelledby="takeaways" className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <h2 id="takeaways" className="text-xl font-bold">Key takeaways</h2>
            <ul className="mt-4 space-y-2">
              {a.keyTakeaways.map((k) => (
                <li key={k} className="flex gap-3"><span aria-hidden className="text-accent-ink">→</span>{k}</li>
              ))}
            </ul>
          </aside>
          <div className="prose-venue mt-4">
            {a.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-ink">{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
          </div>
        </article>
      </Section>
      <CtaBand />
    </>
  );
}
