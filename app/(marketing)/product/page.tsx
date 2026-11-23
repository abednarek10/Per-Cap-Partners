import Link from "next/link";
import type { Metadata } from "next";
import { site, founderDisplayName, primaryCta } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, softwareApplication, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, Eyebrow, FaqList, ButtonLink } from "@/components/ui";
import { ShowPnlSample } from "@/components/marketing/show-pnl";
import type { Faq } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "What Venue Groups Get: Show P&L, Cash Forecasts and Offer Guardrails",
  description:
    "The deliverables behind Per Cap: show-level P&L by room, booking-offer guardrails, a 13-week cash forecast, lender reporting, and an audit trail for every number.",
  path: "/product",
});

const modules = [
  { name: "Show-level P&L", what: "Every show in every room, ranked by contribution after the artist settlement, bar, labor, security and production.", href: "/show-profitability" },
  { name: "Booking-offer guardrails", what: "A maximum offer for each show from expected attendance, your real per cap and a target margin, for your talent buyers.", href: "/playbook/how-to-set-artist-offers-using-per-cap" },
  { name: "13-week cash forecast", what: "Weekly cash built around artist deposits, guarantee payouts, ticket settlement timing, payroll and debt service.", href: "/playbook/13-week-cash-flow-forecast-for-venues" },
  { name: "Lender and insurance reporting", what: "Covenant tests, lender packages and the revenue and attendance figures insurers ask for at renewal.", href: "/playbook/venue-loan-covenants-explained" },
  { name: "Audit trail", what: "Every number traces back to the source file and row it came from, and every calculation rule is versioned.", href: "/security" },
  { name: "Certified findings", what: `Recommendations ranked by dollar impact, each reviewed and signed off by ${founderDisplayName()}.`, href: "/team" },
];

const faqs: Faq[] = [
  { q: "Is Per Cap software or a service?", a: `Both. AI and our data platform do the joining, allocating and first-draft analysis. ${founderDisplayName()} certifies every finding. You get the speed of software and the accountability of a CPA.` },
  { q: "Do we need to connect our systems?", a: "No. We work from the standard exports your booking, POS, payroll and accounting systems already produce." },
  { q: "Where do deliverables live?", a: "In a secure client workspace with access limited to the people you choose. We send a short notification when something new is ready; financial figures aren't sent by email." },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={graph(softwareApplication(), faqPage(faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Product", path: "/product" }]}
        eyebrow="Product"
        title="What your group gets from Per Cap"
        answer={`Per Cap turns your settlement, POS and payroll exports into a show-level P&L for every room, booking-offer guardrails, a 13-week cash forecast and lender-ready reporting. AI does the joining and first-draft analysis, every number traces to its source row, and ${founderDisplayName()} certifies each finding before you see it.`}
        whoFor={site.audience}
      />
      <Section aria-labelledby="sample-heading">
        <h2 id="sample-heading" className="sr-only">Sample show-level P&amp;L</h2>
        <ShowPnlSample />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href="/pricing" variant="ghost">See pricing</ButtonLink>
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="modules-heading">
        <Eyebrow>Deliverables</Eyebrow>
        <h2 id="modules-heading" className="mt-3 text-3xl font-bold sm:text-5xl">Everything a venue group CFO would give you</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link key={m.name} href={m.href} className="rounded-2xl border border-line bg-surface p-6 hover:border-accent">
              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="mt-2 text-muted">{m.what}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="product-faq">
        <h2 id="product-faq" className="text-3xl font-bold sm:text-4xl">Product questions</h2>
        <div className="mt-8"><FaqList faqs={faqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
