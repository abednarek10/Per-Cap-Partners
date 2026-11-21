import type { Metadata } from "next";
import { site, monthlyPrice, trialLabel } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/ui";
import { AuditForm } from "@/components/audit-form";

export const metadata: Metadata = pageMetadata({
  title: "Request a Venue Revenue Audit",
  description:
    "Request a venue revenue audit from Per Cap Partners. We review 12 months of shows and show where per cap, costs and taxes can improve.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Request an audit", path: "/contact" }]}
        eyebrow="Request an audit"
        title="Request a venue revenue audit"
        answer={`Tell us about your venue and we'll book a 30-minute call. If it's a fit, your ${trialLabel().toLowerCase()}: we review your last 12 months of ticketing, bar and financial data and show you where per cap, costs and taxes can improve. Plans start at ${monthlyPrice()} only if you decide to continue.`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <AuditForm />
          <aside className="space-y-6 text-muted">
            <div>
              <h2 className="text-xl font-bold text-ink">What happens next</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5">
                <li>We reply within two business days.</li>
                <li>30-minute call to understand your room and calendar.</li>
                <li>We send a checklist of exports to pull.</li>
                <li>You get your audit findings, reviewed and certified.</li>
              </ol>
            </div>
            <p>
              Prefer email? <a href={`mailto:${site.email}`} className="text-accent-ink hover:underline">{site.email}</a>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
