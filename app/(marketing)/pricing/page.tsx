import type { Metadata } from "next";
import { site, monthlyPrice, trialLabel } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList, ButtonLink } from "@/components/ui";
import type { Faq } from "@/content/services";

const price = monthlyPrice();
const trial = trialLabel();

export const metadata: Metadata = pageMetadata({
  title: "Fractional CFO Pricing for Music Venues",
  description: site.showPricing
    ? `Fractional CFO for music venues from ${price}. ${trial}: we onboard your data and deliver your baseline revenue audit before you pay anything.`
    : `How Per Cap Partners prices fractional CFO services for music venues, reassessed against agreed performance metrics.`,
  path: "/pricing",
});

const pricingFaqs: Faq[] = [
  { q: "What does 'reassessed on performance' mean?", a: "At kickoff we agree on a short list of metrics, such as per cap, labor cost per head and recovered settlement costs. Each year we review results against them together and reset pricing and scope. If the work isn't creating value, you'll see it in the numbers." },
  { q: "How does the free month work?", a: `Your first ${site.freeTrialMonths === 1 ? "month is" : `${site.freeTrialMonths} months are`} free. In that time we onboard your ticketing, bar and financial data and deliver your baseline: per cap by show type, cost per head and a settlement review, all certified before you see it. You decide whether to continue once you've seen the findings.` },
  { q: "What's not included?", a: "Bookkeeping, payroll processing and tax filing stay with your existing bookkeeper and CPA. We work alongside them and give them better inputs." },
];

const formatAmount = () => price.replace("/mo", "");

export default function PricingPage() {
  return (
    <>
      <JsonLd data={graph(faqPage(pricingFaqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title={site.showPricing ? `${trial}. Then from ${price}.` : "One engagement. Every lever covered."}
        answer={
          site.showPricing
            ? `${site.name} plans start at ${price}, covering all four service areas, and your ${trial.toLowerCase()}. During the free month we onboard your data and deliver a certified baseline revenue audit. Pricing is reassessed each year against performance metrics agreed at kickoff.`
            : `${site.name} engagements are a single fee covering all four service areas, reassessed each year against agreed performance metrics.`
        }
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-accent/50 bg-surface p-8 sm:p-10">
            <h2 className="text-2xl font-bold">Fractional CFO engagement</h2>
            {site.showPricing && (
              <>
                <p className="mt-6">
                  <span className="text-sm text-muted">Starting at</span>{" "}
                  <span className="font-display text-6xl font-bold text-accent-ink">{formatAmount()}</span>
                  <span className="text-muted"> / mo</span>
                </p>
                <p className="mt-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent">{trial}</p>
              </>
            )}
            <ul className="mt-8 space-y-3">
              {[
                "Free first month: onboarding + certified baseline audit",
                "Revenue, cost, tax-efficiency and GTM analysis",
                "Every finding reviewed and certified by a person",
                "Monthly KPI pack and 13-week cash-flow forecast",
                "Quarterly strategy session with ownership",
                "Tax-efficiency memo prepared for your CPA",
                "Secure client portal with fan PII tokenization",
                "Annual performance reassessment",
              ].map((i) => (
                <li key={i} className="flex gap-3"><span aria-hidden className="text-accent-ink">✓</span>{i}</li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-10">Start your free month</ButtonLink>
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">Why one fee for everything?</h3>
              <p className="mt-3 text-muted">Revenue, costs, tax and strategy all affect each other. One engagement means one advisor sees the whole picture, with no add-ons and no hourly billing surprises.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">Built to pay for itself</h3>
              <p className="mt-3 text-muted">At a 400-person room running 150 shows a year, a $2 per cap gain is $120,000 in added revenue. That's the scale of return we look for before taking on a venue. (Illustrative only.)</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">Best fit</h3>
              <p className="mt-3 text-muted">Independent venues running a regular calendar of ticketed shows with a bar or F&B operation, typically 75+ shows a year.</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq" className="text-3xl font-bold sm:text-4xl">Pricing questions</h2>
        <div className="mt-8"><FaqList faqs={pricingFaqs} /></div>
      </Section>
      <CtaBand />
    </>
  );
}
