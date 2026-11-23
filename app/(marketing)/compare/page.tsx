import Link from "next/link";
import type { Metadata } from "next";
import { comparisons } from "@/content/compare";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Compare Finance Options for Venue Groups",
  description: "Honest comparisons for venue groups: fractional CFO vs. controller vs. bookkeeper, spreadsheets vs. a platform, and how booking software fits.",
  path: "/compare",
});

export default function CompareIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }]}
        eyebrow="Compare your options"
        title="The options venue groups weigh, compared honestly"
        answer="Venue groups trying to understand show profitability usually weigh a few alternatives: hiring a bookkeeper, controller or fractional CFO, building spreadsheets or BI dashboards, or relying on booking software. These comparisons lay out what each does well, where each falls short, and when each is the right choice."
        whoFor={site.audience}
      />
      <Section>
        <ul className="grid gap-5 md:grid-cols-3">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <Link href={`/compare/${c.slug}`} className="block h-full rounded-2xl border border-line bg-surface p-6 hover:border-accent">
                <h2 className="text-xl font-bold">{c.h1}</h2>
                <p className="mt-2 text-sm text-muted">{c.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          Prefer to see the method first? Read <Link href="/show-profitability" className="text-accent-ink hover:underline">how show profitability is measured</Link> or browse the{" "}
          <Link href="/playbook" className="text-accent-ink hover:underline">Operator Playbook</Link>.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
