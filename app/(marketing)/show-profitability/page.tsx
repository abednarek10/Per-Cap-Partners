import Link from "next/link";
import type { Metadata } from "next";
import { site, absoluteUrl, primaryCta } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList, Eyebrow, ButtonLink } from "@/components/ui";
import { ShowPnlSample, ThreeSystems } from "@/components/marketing/show-pnl";
import type { Faq } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Show-Level Profitability: How Venue Groups Measure It",
  description:
    "How to measure profit per show: join settlement, bar and labor data, allocate costs by rule, and rank every show by contribution across your rooms.",
  path: "/show-profitability",
});

const pnlLines = [
  { line: "Venue ticket revenue", from: "Settlement", how: "Net box office minus the artist payout under the deal" },
  { line: "Bar net", from: "POS", how: "Sales in the doors-to-close window, minus pour cost" },
  { line: "Other show income", from: "Settlement, POS, contracts", how: "Facility fees, ticket fee rebates, merch commission, show sponsorship" },
  { line: "Labor and security", from: "Scheduling, payroll, security invoices", how: "Shifts allocated by hours overlapping the show; contracted security to its event" },
  { line: "Production and hospitality", from: "Settlement, AP", how: "Sound, lights, stagehands, riders, catering" },
  { line: "Show contribution", from: "Calculated", how: "Everything above, before rent, salaries and overhead" },
];

const questionsAnswered = [
  { q: "Which shows make money once the bar is counted?", a: "Rank every show by contribution. Shows with healthy ticket sales can still lose money after the guarantee and staffing, and modest shows can carry the week.", href: "/playbook/how-to-calculate-show-level-profitability" },
  { q: "Which genres and nights drink?", a: "Bar per cap and contribution per attendee by genre, night and promoter show where the room earns, so booking can lean into it.", href: "/playbook/what-drives-bar-per-cap" },
  { q: "Are our offers too high for the per cap we get?", a: "Compare each guarantee with the contribution its show actually produced, then set offer ceilings from real per cap.", href: "/playbook/how-to-set-artist-offers-using-per-cap" },
  { q: "Should Tuesdays be private rentals?", a: "Average a night's show contribution over six months and compare it with a priced rental, while holding some nights for developing artists.", href: "/playbook/private-rentals-vs-weak-weeknight-shows" },
];

const faqs: Faq[] = [
  { q: "Why use contribution instead of net profit per show?", a: "Rent, salaried staff and other overhead don't change when you book one more show. Contribution shows what each show adds toward those costs, which is what booking decisions need. Overhead is allocated only for room-level and ownership reporting." },
  { q: "What if our data isn't clean?", a: "It rarely is. Missing timestamps, combined shifts and inconsistent settlements are expected. Every assumption we make is written down and applied the same way to every show, so comparisons stay fair." },
  { q: "Can this run every month?", a: "Yes. That's the Fractional CFO service: the same show-level P&L, updated monthly across all your rooms, plus cash forecasting and lender reporting." },
];

export default function ShowProfitabilityPage() {
  const article = {
    "@type": "TechArticle",
    "@id": absoluteUrl("/show-profitability#method"),
    headline: "Show-level profitability for venue groups",
    description: "How Per Cap Partners measures profit per show by joining settlement, bar and labor data and allocating costs by rule.",
    url: absoluteUrl("/show-profitability"),
    publisher: { "@id": absoluteUrl("/#organization") },
    about: ["Show-level profitability", "Show P&L", "Contribution margin", "Per cap"],
  };
  return (
    <>
      <JsonLd data={graph(article, faqPage(faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Show profitability", path: "/show-profitability" }]}
        eyebrow="The method"
        title="Show-level profitability, explained"
        answer="Show-level profitability measures what each show earns the venue after every cost it caused. It joins three data sources that rarely meet: the settlement from booking software, bar sales from the POS, and labor and security from scheduling and payroll. The result is a P&L for every show, ranked by contribution, across every room."
        whoFor={site.audience}
      />

      <Section aria-labelledby="join-heading">
        <Eyebrow>Step 1</Eyebrow>
        <h2 id="join-heading" className="mt-3 text-3xl font-bold sm:text-4xl">Join the three systems, show by show</h2>
        <div className="mt-8"><ThreeSystems /></div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="lines-heading">
        <Eyebrow>Step 2</Eyebrow>
        <h2 id="lines-heading" className="mt-3 text-3xl font-bold sm:text-4xl">Build the same P&amp;L for every show</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-muted">
              <tr><th scope="col" className="px-5 py-3 font-medium">Line</th><th scope="col" className="px-5 py-3 font-medium">Comes from</th><th scope="col" className="px-5 py-3 font-medium">How it's measured</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {pnlLines.map((l) => (
                <tr key={l.line}>
                  <th scope="row" className={`px-5 py-3 ${l.line === "Show contribution" ? "font-bold text-accent-ink" : "font-semibold"}`}>{l.line}</th>
                  <td className="px-5 py-3 text-muted">{l.from}</td>
                  <td className="px-5 py-3 text-muted">{l.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-muted">
          Allocation rules are written down, approved by you and versioned, so every show is measured the same way. See{" "}
          <Link href="/playbook/how-to-allocate-labor-and-security-to-a-show" className="text-accent-ink hover:underline">how labor and security are allocated</Link> and{" "}
          <Link href="/playbook/how-to-read-a-show-settlement" className="text-accent-ink hover:underline">how to read a settlement</Link>.
        </p>
      </Section>

      <Section className="border-t border-line" aria-labelledby="rank-heading">
        <Eyebrow>Step 3</Eyebrow>
        <h2 id="rank-heading" className="mt-3 text-3xl font-bold sm:text-4xl">Rank every show and act on it</h2>
        <div className="mt-8"><ShowPnlSample /></div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="q-heading">
        <h2 id="q-heading" className="text-3xl font-bold sm:text-4xl">The four questions it answers</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {questionsAnswered.map((x) => (
            <div key={x.q} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">{x.q}</h3>
              <p className="mt-2 text-muted">{x.a}</p>
              <Link href={x.href} className="mt-4 inline-block text-sm font-semibold text-accent-ink hover:underline">Read the playbook →</Link>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href="/services/show-profitability-audit" variant="ghost">Show Profitability Audit</ButtonLink>
        </div>
      </Section>

      <Section className="border-t border-line" aria-labelledby="sp-faq">
        <h2 id="sp-faq" className="text-3xl font-bold">Common questions</h2>
        <div className="mt-8"><FaqList faqs={faqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
