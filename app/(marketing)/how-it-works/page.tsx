import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";
import { steps } from "@/content/process";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "How It Works: From Venue Data to Certified Recommendations",
  description:
    "How Per Cap Partners works: upload ticketing, POS and financial exports, we analyze per attendee, a person certifies every finding, and you act on a prioritized plan.",
  path: "/how-it-works",
});

const howTo = {
  "@type": "HowTo",
  name: `How a ${site.name} engagement works`,
  description: "The four-step process from raw venue data to human-certified financial recommendations.",
  url: absoluteUrl("/how-it-works"),
  step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.summary })),
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={graph(howTo)} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]}
        eyebrow="How it works"
        title="Upload. Analyze. Certify. Act."
        answer={`Working with ${site.name} takes four steps. You upload standard exports from your ticketing, POS and accounting systems. We clean and join the data and measure everything per attendee. A person reviews and certifies every finding. Then you receive a short, prioritized list of dollar-sized recommendations plus monthly CFO reporting.`}
      />
      <Section>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.title} className="grid gap-6 rounded-2xl border border-line bg-surface p-7 md:grid-cols-[120px_1fr]">
              <p className="font-display text-6xl font-bold text-accent-ink">{i + 1}</p>
              <div>
                <h2 className="text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-lg">{s.summary}</p>
                <div className="prose-venue">{s.detail.map((d) => <p key={d}>{d}</p>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="border-t border-line" aria-labelledby="timeline">
        <h2 id="timeline" className="text-3xl font-bold sm:text-4xl">The first 90 days</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Days 1–30", b: "Data upload, cleanup and baseline: per cap, cost per head, settlement review and fan segments." },
            { t: "Days 31–60", b: "First certified recommendations, quick wins tested on live shows, and the KPI pack goes monthly." },
            { t: "Days 61–90", b: "Tax-efficiency memo to your CPA, calendar and pricing plan for next season, and a 13-week cash forecast." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold text-accent-ink">{c.t}</h3>
              <p className="mt-3 text-muted">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
