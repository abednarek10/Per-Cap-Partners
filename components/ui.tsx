import Link from "next/link";
import { primaryCta } from "@/lib/site";
import type { ComponentProps, ReactNode } from "react";
import { serializeJsonLd, breadcrumbs as breadcrumbLd, graph } from "@/lib/seo/jsonld";
import type { Faq } from "@/content/services";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props} />;
}

export function Section({ className = "", children, ...props }: ComponentProps<"section">) {
  return (
    <section className={`py-16 sm:py-24 ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">{children}</p>;
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "ghost" };
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-on-accent hover:brightness-110"
      : "border border-line text-ink hover:border-accent hover:text-accent-ink";
  return <Link className={`${base} ${styles} ${className}`} {...props} />;
}

/** The 40–60 word answer-first summary that search and AI engines quote. */
export function AnswerBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">In short</p>
      <p className="mt-3 text-lg leading-relaxed text-ink" data-answer>
        {children}
      </p>
    </div>
  );
}

export function FaqList({ faqs, headingLevel = "h3" }: { faqs: Faq[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex items-start justify-between gap-6">
            <H className="font-sans text-lg font-semibold [font-stretch:100%] tracking-normal">{f.q}</H>
            <span aria-hidden className="mt-1 text-accent-ink transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-accent-ink">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbLd(items))} />
    </>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  answer,
  whoFor,
  meta,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  answer?: ReactNode;
  whoFor?: string;
  meta?: ReactNode;
}) {
  return (
    <div className="spotlight border-b border-line">
      <Container className="pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <div className="mt-10"><Eyebrow>{eyebrow}</Eyebrow></div>}
        <h1 className={`${eyebrow ? "mt-3" : "mt-10"} max-w-4xl text-4xl font-bold sm:text-6xl`}>{title}</h1>
        {meta && <div className="mt-5 text-sm text-muted">{meta}</div>}
        {answer && <div className="max-w-3xl"><AnswerBox>{answer}</AnswerBox></div>}
        {whoFor && (
          <p className="mt-5 max-w-3xl text-sm text-muted" data-who>
            <span className="font-semibold text-ink">Who this is for: </span>
            {whoFor}
          </p>
        )}
      </Container>
    </div>
  );
}

export function CtaBand({ title = "See which of your shows really make money", body }: { title?: string; body?: string }) {
  return (
    <section className="border-t border-line bg-surface">
      <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted">
            {body ?? `Upload about 90 days of settlements and bar sales for one room. We'll show you your most and least profitable shows once the bar is counted. Free, certified by a CPA.`}
          </p>
        </div>
        <ButtonLink href={primaryCta.href} className="shrink-0">{primaryCta.label}</ButtonLink>
      </Container>
    </section>
  );
}
