import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, service as serviceLd } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Fractional CFO Services for Music Venues",
  description:
    "Revenue optimization, cost reduction, tax efficiency and go-to-market strategy for independent music venues, delivered as one fractional CFO engagement.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(...services.map(serviceLd))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="One finance partner for every number in the building"
        answer={`${site.name} provides fractional CFO services built for independent music venues in four areas: revenue optimization (per cap, ticket pricing, fees), cost reduction (labor, pour cost, settlements), tax efficiency (prepared for your CPA), and go-to-market and operating strategy driven by your own fan data. All four come in a single engagement.`}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-2xl border border-line bg-surface p-7 hover:border-accent">
              <h2 className="text-2xl font-bold">{s.name}</h2>
              <p className="mt-3 text-muted">{s.description}</p>
              <ul className="mt-5 space-y-1.5 text-sm">
                {s.levers.map((l) => (
                  <li key={l.title} className="flex gap-2"><span aria-hidden className="text-accent-ink">•</span>{l.title}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold text-accent-ink">Learn more <span aria-hidden>→</span></p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
