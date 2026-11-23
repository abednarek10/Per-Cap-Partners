import Link from "next/link";
import type { Metadata } from "next";
import { site, primaryCta } from "@/lib/site";
import { getOffer, priceLabel } from "@/content/offers";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList, ButtonLink } from "@/components/ui";
import { OfferLadder } from "@/components/marketing/offer-ladder";
import type { Faq } from "@/content/services";

const audit = priceLabel(getOffer("audit").price);
const cfo = priceLabel(getOffer("cfo").price);

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Show Profitability Audit and Fractional CFO for Venue Groups",
  description: `Free show profitability snapshot. Show Profitability Audit ${audit.toLowerCase()}, fixed fee. Fractional CFO ${cfo.toLowerCase()}. Transaction support by request.`,
  path: "/pricing",
});

const faqs: Faq[] = [
  { q: "What sets the price of an audit?", a: "The number of rooms and shows in scope and how many systems the data comes from. You get a fixed quote before we start, and it doesn't change if the data is messier than expected." },
  { q: "What sets the Fractional CFO fee?", a: "The number of rooms, how often you need reporting, and whether lender and insurance reporting are included. The fee is agreed up front and reviewed each year." },
  { q: "Do we have to do the audit before Fractional CFO?", a: "No, but most groups start with it because it creates the 12-month baseline the monthly work builds on." },
  { q: "What's not included?", a: "Bookkeeping, payroll processing and tax filing stay with your bookkeeper and CPA. We work alongside them." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={graph(faqPage(faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title="Start free. Then pick the depth you need."
        answer={`Per Cap Partners starts with a free show profitability snapshot for one room. The Show Profitability Audit is a fixed fee, ${audit.toLowerCase()}, and rebuilds 12 months across every room. Fractional CFO is ${cfo.toLowerCase()} for monthly show-level P&L, cash forecasting and lender reporting. Transaction support is priced per deal.`}
        whoFor={site.audience}
      />
      <Section aria-labelledby="offers-heading">
        <h2 id="offers-heading" className="sr-only">Offers and starting prices</h2>
        <OfferLadder detailed />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href="/compare/fractional-cfo-vs-controller-vs-bookkeeper" variant="ghost">Compare with hiring</ButtonLink>
        </div>
        <p className="mt-8 max-w-3xl text-muted">
          Why it pays back: show-level decisions compound across a calendar. At a $25 bar per cap, a 2,000-person night is about
          $50,000 in bar sales, so getting offers, staffing and nights right moves real money. (Illustrative.) See{" "}
          <Link href="/playbook/what-drives-bar-per-cap" className="text-accent-ink hover:underline">what drives bar per cap</Link>.
        </p>
      </Section>
      <Section className="border-t border-line" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq" className="text-3xl font-bold sm:text-4xl">Pricing questions</h2>
        <div className="mt-8"><FaqList faqs={faqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
