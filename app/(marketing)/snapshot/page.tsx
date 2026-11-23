import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getOffer } from "@/content/offers";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, FaqList } from "@/components/ui";
import { RequestForm } from "@/components/request-form";
import type { Faq } from "@/content/services";

const snapshot = getOffer("snapshot");

export const metadata: Metadata = pageMetadata({
  title: "Free Show Profitability Snapshot for Venue Groups",
  description:
    "Send 90 days of settlements and bar sales for one room and see your most and least profitable shows once the bar is counted. Free, CPA-certified.",
  path: "/snapshot",
});

const faqs: Faq[] = [
  { q: "What exactly do I send?", a: "Show settlements for the last 90 days from your booking software or spreadsheets, and POS sales with timestamps for the same room and period. Labor data is optional for the snapshot." },
  { q: "Is it really free? What's the catch?", a: "It's free with no obligation. It shows you the method on your own numbers. If you want the full picture across rooms and 12 months, that's the Show Profitability Audit." },
  { q: "What happens to our data?", a: "Fan names, emails and phone numbers are stripped when files arrive, and the rest is encrypted. We never share your numbers with anyone." },
];

export default function SnapshotPage() {
  return (
    <>
      <JsonLd data={graph(faqPage(faqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Free snapshot", path: "/snapshot" }]}
        eyebrow="Free show profitability snapshot"
        title="See your most and least profitable shows"
        answer={`The free Show Profitability Snapshot uses about 90 days of settlements and bar sales from one of your rooms. Within ${site.snapshotTurnaround} of receiving the data, you see every show ranked by contribution after the artist settlement and bar, plus bar per cap by night and genre. No cost and no obligation.`}
        whoFor={site.audience}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <RequestForm turnaround={site.snapshotTurnaround} />
          <aside className="space-y-8">
            <div>
              <h2 className="text-xl font-bold">What you get</h2>
              <ul className="mt-4 space-y-2 text-muted">
                {snapshot.includes.map((x) => (
                  <li key={x} className="flex gap-2"><span aria-hidden className="text-accent-ink">✓</span>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">What you&apos;ll need</h2>
              <ul className="mt-4 space-y-2 text-muted">
                <li>90 days of show settlements for one room</li>
                <li>POS sales with timestamps for the same period</li>
                <li>Optional: scheduling or payroll export</li>
              </ul>
            </div>
            <p className="rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
              Want the full picture? The{" "}
              <Link href="/services/show-profitability-audit" className="text-accent-ink hover:underline">Show Profitability Audit</Link> covers 12 months across
              every room. Read <Link href="/show-profitability" className="text-accent-ink hover:underline">how the method works</Link>.
            </p>
          </aside>
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="snap-faq">
        <h2 id="snap-faq" className="text-3xl font-bold">Common questions</h2>
        <div className="mt-8"><FaqList faqs={faqs} /></div>
      </Section>
    </>
  );
}
