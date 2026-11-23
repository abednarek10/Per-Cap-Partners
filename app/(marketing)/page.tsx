import Link from "next/link";
import type { Metadata } from "next";
import { site, primaryCta, founderDisplayName } from "@/lib/site";
import { services } from "@/content/services";
import { generalFaqs } from "@/content/faq";
import { steps } from "@/content/process";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage, service as serviceLd } from "@/lib/seo/jsonld";
import { Container, Section, Eyebrow, ButtonLink, FaqList, JsonLd, CtaBand } from "@/components/ui";
import { ShowPnlSample, ThreeSystems } from "@/components/marketing/show-pnl";
import { OfferLadder } from "@/components/marketing/offer-ladder";

export const metadata: Metadata = pageMetadata({
  title: `Show-Level Profitability for Venue Groups | ${site.name}`,
  description:
    "See which shows make money once the bar, labor and security are counted. CPA-certified show profitability, cash forecasting and fractional CFO services for venue groups.",
  path: "/",
});

const homeFaqs = generalFaqs.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(...services.map(serviceLd), faqPage(homeFaqs))} />

      {/* Hero: the problem and the offer */}
      <div className="spotlight border-b border-line">
        <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <Eyebrow>Show-level profitability for independent venue groups</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold sm:text-7xl">
            Know which shows <span className="text-accent-ink">actually make money.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" data-answer>
            The ticket brings people in. The bar and the building make the money. {site.name} joins your settlements, bar sales and
            labor show by show, so venue groups running 2 to 10 rooms can see which shows earn, which lose, and what to book next.
            Every finding is certified by a CPA.
          </p>
          <p className="mt-4 text-sm text-muted" data-who>
            <span className="font-semibold text-ink">Who this is for: </span>{site.audience}.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="/show-profitability" variant="ghost">See the method</ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">You book the talent. We run the numbers.</p>
        </Container>
      </div>

      {/* The problem: three systems */}
      <Section aria-labelledby="systems-heading">
        <div className="max-w-3xl">
          <Eyebrow>The problem</Eyebrow>
          <h2 id="systems-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Your show P&amp;L is split across three systems</h2>
          <p className="mt-5 text-lg text-muted">
            The settlement is in your booking software, bar sales are in the register, and labor and security are in scheduling and
            payroll. Almost nobody joins them per show, so the basic questions go unanswered. Joining financial data and allocating
            costs is accounting work, which is exactly what a CPA is trained for.
          </p>
        </div>
        <div className="mt-10"><ThreeSystems /></div>
      </Section>

      {/* What it looks like */}
      <Section className="border-t border-line" aria-labelledby="sample-heading">
        <div className="max-w-3xl">
          <Eyebrow>What you get</Eyebrow>
          <h2 id="sample-heading" className="mt-3 text-3xl font-bold sm:text-5xl">A P&amp;L for every show, in every room</h2>
          <p className="mt-5 text-lg text-muted">
            Ranked by contribution, after the artist settlement, bar, labor, security and production. The shows that lose money stand out
            immediately, and so do the ones quietly carrying the week.
          </p>
        </div>
        <div className="mt-10"><ShowPnlSample /></div>
        <p className="mt-6 text-muted">
          Learn the method: <Link href="/playbook/how-to-calculate-show-level-profitability" className="text-accent-ink hover:underline">how to calculate show-level profitability</Link>{" "}
          and <Link href="/playbook/how-to-set-artist-offers-using-per-cap" className="text-accent-ink hover:underline">how to set artist offers from per cap</Link>.
        </p>
      </Section>

      {/* Offer ladder */}
      <Section className="border-t border-line" aria-labelledby="offers-heading">
        <div className="max-w-3xl">
          <Eyebrow>How to work with us</Eyebrow>
          <h2 id="offers-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Start free. Go as deep as you need.</h2>
        </div>
        <div className="mt-10"><OfferLadder /></div>
        <p className="mt-6"><Link href="/pricing" className="font-semibold text-accent-ink hover:underline">Compare offers and pricing →</Link></p>
      </Section>

      {/* How it works */}
      <Section className="border-t border-line" aria-labelledby="how-heading">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-heading" className="mt-3 text-3xl font-bold sm:text-5xl">From exports to decisions</h2>
          <p className="mt-5 text-lg text-muted">No integrations and no new software for your team. If your systems can export a report, we can use it.</p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-display text-3xl font-bold text-accent-ink">{i + 1}</p>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Credibility */}
      <Section className="border-t border-line" aria-labelledby="cred-heading">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
          <div aria-hidden className="grid h-28 w-28 place-items-center rounded-full bg-accent font-display text-4xl font-bold text-on-accent">
            {site.founder.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <Eyebrow>Who certifies your numbers</Eyebrow>
            <h2 id="cred-heading" className="mt-3 text-3xl font-bold sm:text-4xl">{founderDisplayName()}</h2>
            <p className="mt-2 font-semibold text-accent-ink">Founder · Formerly {site.founder.formerEmployers.join(" and ")}</p>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Show profitability is an accounting problem: joining financial data from different systems and allocating costs fairly.
              AI does the volume work. A CPA checks the numbers and the reasoning and signs off on every finding, the standard
              ownership, lenders and insurers expect.
            </p>
            <Link href="/team" className="mt-5 inline-block font-semibold text-accent-ink hover:underline">Meet the team →</Link>
          </div>
        </div>
      </Section>

      {/* Security + playbook */}
      <Section className="border-t border-line" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="sr-only">Data security and resources</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-8">
            <Eyebrow>Your data</Eyebrow>
            <h3 className="mt-3 text-3xl font-bold">Built for numbers you can&apos;t afford to leak</h3>
            <ul className="mt-5 grid gap-3 text-muted sm:grid-cols-2">
              {["Fan names, emails and phones stripped at intake", "Encrypted in transit and at rest", "Each group's data isolated", "Every number traceable to its source"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden className="text-accent-ink">✓</span>{t}</li>
              ))}
            </ul>
            <Link href="/security" className="mt-6 inline-block font-semibold text-accent-ink hover:underline">How we protect your data →</Link>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-8">
            <Eyebrow>Operator playbook</Eyebrow>
            <h3 className="mt-3 text-3xl font-bold">Best practices for running venue groups</h3>
            <p className="mt-4 text-muted">
              Settlements, artist offers, labor allocation, cash forecasting around deposits and lender covenants. Each entry has a
              formula, a worked example and the common mistakes.
            </p>
            <Link href="/playbook" className="mt-6 inline-block font-semibold text-accent-ink hover:underline">Browse the playbook →</Link>
          </div>
        </div>
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
