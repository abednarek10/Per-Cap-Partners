import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/content/insights";
import { glossary } from "@/content/glossary";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Resources for Music Venue Owners and GMs",
  description: "The Operator Playbook, comparisons, a venue finance glossary and guides on show profitability, settlements, cash and pricing for venue groups.",
  path: "/resources",
});

export default function ResourcesPage() {
  const groups = [
    { href: "/playbook", title: "Operator playbook", body: "Best practices for venue groups: show P&L, artist offers, labor allocation, cash and lenders.", count: "Best practices" },
    { href: "/compare", title: "Compare your options", body: "Fractional CFO vs. controller, spreadsheets vs. a platform, and how booking software fits.", count: "Comparisons" },
    { href: "/insights", title: "Insights", body: "Practical guides on per cap, settlements, labor, pricing and cash flow.", count: `${articles.length} articles` },
    { href: "/glossary", title: "Venue finance glossary", body: "Plain-English definitions with formulas and examples.", count: `${glossary.length} terms` },
    { href: "/faq", title: "FAQ", body: "Pricing, data security, certification and how the platform works.", count: "All questions" },
  ];
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }]} eyebrow="Resources" title="Learn the numbers that run the room" />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2">
          {groups.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="block h-full rounded-2xl border border-line bg-surface p-7 hover:border-accent">
                <p className="text-sm text-muted">{g.count}</p>
                <h2 className="mt-2 text-2xl font-bold">{g.title}</h2>
                <p className="mt-2 text-muted">{g.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
