import Link from "next/link";
import type { Metadata } from "next";
import { site, formatUsd, monthlyPrice } from "@/lib/site";
import { services } from "@/content/services";
import { generalFaqs } from "@/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage, service as serviceLd } from "@/lib/seo/jsonld";
import { Container, Section, Eyebrow, ButtonLink, FaqList, JsonLd, CtaBand } from "@/components/ui";
import { steps } from "@/content/process";

export const metadata: Metadata = pageMetadata({
  title: `Fractional CFO for Music Venues | ${site.name}`,
  description:
    "Fractional CFO for independent music venues. Raise per cap, cut costs and improve tax efficiency with human-certified recommendations. Start with a free revenue audit.",
  path: "/",
});

const homeFaqs = generalFaqs.slice(0, 5);

const illustrative = { attendees: 400, shows: 150, lift: 2 };
const illustrativeTotal = illustrative.attendees * illustrative.shows * illustrative.lift;

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(...services.map(serviceLd), faqPage(homeFaqs))} />

      {/* Hero */}
      <div className="spotlight border-b border-line">
        <Container className="pb-20 pt-16 sm:pb-28 sm:pt-24">
          <Eyebrow>Fractional CFO for independent music venues</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold sm:text-7xl">
            <span className="text-accent-ink">You book the talent.</span> We run the numbers.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" data-answer>
            {site.name} is a fractional CFO for independent music venues. We turn your ticketing, bar and financial
            data into human-certified recommendations that raise revenue per head, cut costs and improve tax
            efficiency, so owners and GMs can get back to booking and servicing talent.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Get your free revenue audit</ButtonLink>
            <ButtonLink href="/how-it-works" variant="ghost">See how it works</ButtonLink>
          </div>
          <ul className="mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 text-sm text-muted sm:grid-cols-4">
            {[
              "Human-certified findings",
              "Dedicated advisor",
              "Free revenue audit",
              site.showPricing ? `From ${monthlyPrice()}` : "Fan PII tokenized",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Problem */}
      <Section aria-labelledby="problem-heading">
        <div className="max-w-3xl">
          <Eyebrow>The problem</Eyebrow>
          <h2 id="problem-heading" className="mt-3 text-3xl font-bold sm:text-5xl">
            Independent venues run on thin margins and late numbers
          </h2>
          <p className="mt-5 text-lg text-muted">
            Arena operators have finance teams. Most independent rooms have a bookkeeper, a POS report and a gut feeling.
            The data to run a tighter business is already sitting in your ticketing and bar systems. Nobody has the time to join it up.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { t: "You see totals, not per head", b: "Bar sales were up. But was that more fans, or each fan spending more? Without per cap by show type, you can't tell." },
            { t: "Settlements leak quietly", b: "House costs that never get recovered, deal terms that drift between promoters, fees nobody reconciles." },
            { t: "Ownership sees it too late", b: "A quarterly P&L can't fix last month's labor schedule or this month's cash crunch." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">{c.t}</h3>
              <p className="mt-3 text-muted">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="border-t border-line" aria-labelledby="services-heading">
        <div className="max-w-3xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 id="services-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Four levers, one finance partner</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent"
            >
              <p className="font-display text-sm font-bold text-accent-ink">0{i + 1}</p>
              <h3 className="mt-2 text-2xl font-bold">{s.h1}</h3>
              <p className="mt-3 text-muted">{s.description}</p>
              <p className="mt-5 text-sm font-semibold text-accent-ink">
                {s.navLabel} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Illustrative math */}
      <Section className="border-t border-line" aria-labelledby="math-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Why per cap matters</Eyebrow>
            <h2 id="math-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Two dollars a head is a full-time salary</h2>
            <p className="mt-5 text-lg text-muted">
              Small per-head gains compound across a full calendar. That's why we measure everything per attendee, and
              why the engagement is built to pay for itself many times over.
            </p>
          </div>
          <figure className="rounded-2xl border border-line bg-surface p-7">
            <figcaption className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Illustrative example</figcaption>
            <dl className="mt-6 space-y-4 text-lg">
              <Row k="Average scanned attendance" v={illustrative.attendees.toLocaleString("en-US")} />
              <Row k="Ticketed shows per year" v={illustrative.shows.toLocaleString("en-US")} />
              <Row k="Per cap increase" v={formatUsd(illustrative.lift)} />
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <dt className="font-semibold">Added annual revenue</dt>
                <dd className="font-display text-4xl font-bold text-accent-ink">{formatUsd(illustrativeTotal)}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-muted">Hypothetical figures for illustration only. Your results depend on your venue, market and calendar.</p>
          </figure>
        </div>
      </Section>

      {/* How it works */}
      <Section className="border-t border-line" aria-labelledby="how-heading">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-heading" className="mt-3 text-3xl font-bold sm:text-5xl">From raw exports to certified decisions</h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-display text-3xl font-bold text-accent-ink">{i + 1}</p>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8"><Link href="/how-it-works" className="font-semibold text-accent-ink hover:underline">Read the full process →</Link></p>
      </Section>

      {/* Human-certified + dedicated advisor */}
      <Section className="border-t border-line" aria-labelledby="certified-heading">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Human-certified</Eyebrow>
            <h2 id="certified-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Software finds it. A person signs off on it.</h2>
            <p className="mt-5 text-lg text-muted">
              Automated analysis does the heavy lifting on cleanup and pattern-finding. Before anything reaches you, a
              person checks the numbers, tests the reasoning against how your room actually runs, and certifies it.
              You get decisions you can act on, not another dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-surface p-8">
            <h3 className="text-2xl font-bold">A CFO who knows your room</h3>
            <p className="mt-3 text-muted">
              You work directly with the advisor who reviews and signs off on your numbers, someone who knows your calendar,
              your team and how your room runs on a sold-out Saturday.
              {site.showPricing &&
                ` It starts with a free revenue audit. Plans start at ${monthlyPrice()}, and pricing is reassessed each year against the performance metrics we agree on together.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Get your free revenue audit</ButtonLink>
              <ButtonLink href="/pricing" variant="ghost">How pricing works</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Security */}
      <Section className="border-t border-line" aria-labelledby="security-heading">
        <div className="max-w-3xl">
          <Eyebrow>Your data</Eyebrow>
          <h2 id="security-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Built for data you can't afford to leak</h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Fan PII tokenized", b: "Emails and phones become one-way tokens before storage. Names are dropped." },
            { t: "Encrypted everywhere", b: "TLS in transit, encryption at rest, private storage only." },
            { t: "Isolated per venue", b: "Row-level security means no client can see another's data." },
            { t: "Raw files deleted", b: "Uploaded exports are removed after processing." },
          ].map((c) => (
            <li key={c.t} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted">{c.b}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8"><Link href="/security" className="font-semibold text-accent-ink hover:underline">How we handle your data →</Link></p>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-line" aria-labelledby="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="faq-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Straight answers</h2>
            <p className="mt-4"><Link href="/faq" className="font-semibold text-accent-ink hover:underline">All questions →</Link></p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
