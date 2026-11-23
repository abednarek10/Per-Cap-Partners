import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";
import { steps } from "@/content/process";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "How It Works: From Venue Exports to Show-Level Decisions",
  description:
    "How Per Cap works for venue groups: a free snapshot, then settlements, POS and payroll joined show by show, every finding certified by a CPA, and monthly decisions.",
  path: "/how-it-works",
});

const howTo = {
  "@type": "HowTo",
  name: `How ${site.productName} works`,
  description: "The five steps from a free snapshot to CPA-certified, show-level decisions for a venue group.",
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
        title="Snapshot. Collect. Rebuild. Certify. Decide."
        answer={`Working with ${site.name} takes five steps. Start with a free snapshot for one room. For an audit, export 12 months from your booking, POS, payroll and accounting systems. We rebuild every show's P&L, a CPA certifies each finding, and you decide what to book, price and staff, monthly if you choose Fractional CFO.`}
        whoFor={site.audience}
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
        <h2 id="timeline" className="text-3xl font-bold sm:text-4xl">A typical audit timeline</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Weeks 1–2", b: "Exports collected and checked. Allocation rules for labor, security and overhead agreed with you." },
            { t: "Weeks 3–4", b: "Every show rebuilt across every room. Draft findings reviewed against how your rooms actually run." },
            { t: "Weeks 5–6", b: "Certified findings presented: the shows that lose money, why, and ranked changes to booking, pricing and staffing." },
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
