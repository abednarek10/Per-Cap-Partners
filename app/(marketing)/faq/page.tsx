import type { Metadata } from "next";
import { generalFaqs } from "@/content/faq";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "FAQ: Fractional CFO Services for Music Venues",
  description:
    "Answers for venue owners and GMs: what a fractional CFO does, pricing, data security, what data we need, and how certified recommendations work.",
  path: "/faq",
});

export default function FaqPage() {
  const all = [...generalFaqs, ...services.flatMap((s) => s.faqs)];
  return (
    <>
      <JsonLd data={graph(faqPage(all))} />
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} eyebrow="FAQ" title="Frequently asked questions" />
      <Section aria-labelledby="general">
        <h2 id="general" className="text-3xl font-bold">Working with us</h2>
        <div className="mt-8"><FaqList faqs={generalFaqs} /></div>
      </Section>
      {services.map((s) => (
        <Section key={s.slug} className="border-t border-line" aria-labelledby={`faq-${s.slug}`}>
          <h2 id={`faq-${s.slug}`} className="text-3xl font-bold">{s.name}</h2>
          <div className="mt-8"><FaqList faqs={s.faqs} /></div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
