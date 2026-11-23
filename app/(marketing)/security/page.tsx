import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, faqPage } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, FaqList } from "@/components/ui";
import type { Faq } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Security and Data Handling for Venue and Fan Data",
  description:
    "How Per Cap Partners protects venue group financials and fan data: PII stripped at intake, traceable encrypted source files, isolation and multi-factor sign-in.",
  path: "/security",
});

const controls = [
  { t: "Fan personal data is stripped at intake", b: "When a file arrives, fan names are removed, and emails and phone numbers are replaced with one-way keyed tokens (HMAC-SHA-256) before anything is stored. We can count returning fans without ever holding their contact details." },
  { t: "Every number is traceable", b: "The PII-stripped version of each source file is kept encrypted, so every figure in a deliverable traces back to the file and row it came from, the same standard a CPA applies to work papers." },
  { t: "Encryption in transit and at rest", b: "All traffic uses TLS. Databases and file storage are encrypted at rest. Upload links are short-lived and signed, and files never pass through public storage." },
  { t: "Each group's data is isolated", b: "Row-level security in the database means every query is scoped to your organization. Another client cannot see your data, even by accident." },
  { t: "Strong sign-in", b: "Workspace access requires multi-factor authentication. Roles separate your team members, your admins and our advisors, and every access to sensitive data is written to an audit log." },
  { t: "Validated uploads", b: "Files are checked for type, size and content signature before processing. Only CSV, Excel and PDF are accepted." },
];

const securityFaqs: Faq[] = [
  { q: "Do you sell or share our fan data?", a: "No. Your data is used only to produce your recommendations. It is never sold, shared with other clients or used to market to your fans." },
  { q: "Can you email our fans for us?", a: "Not from tokenized data, by design. Tokens can't be turned back into email addresses. Your fan lists stay in your ticketing platform, under your control." },
  { q: "What happens to our data if we leave?", a: "On request at the end of an engagement, we delete your organization's data and confirm in writing, subject to any records we're legally required to keep." },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={graph(faqPage(securityFaqs))} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Security", path: "/security" }]}
        eyebrow="Security & data"
        title="Your numbers and your fans, protected by design"
        answer={`${site.name} protects venue group data in five ways. Fan names, emails and phone numbers are stripped when files arrive. PII-stripped source files are kept encrypted so every number is traceable. Data is encrypted in transit and at rest. Each group's records are isolated with row-level security. Workspace access requires multi-factor sign-in.`}
        whoFor={site.audience}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {controls.map((c) => (
            <div key={c.t} className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="text-2xl font-bold">{c.t}</h2>
              <p className="mt-3 leading-relaxed text-muted">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="border-t border-line" aria-labelledby="sec-faq">
        <h2 id="sec-faq" className="text-3xl font-bold sm:text-4xl">Data questions</h2>
        <div className="mt-8"><FaqList faqs={securityFaqs} /></div>
      </Section>
      <CtaBand title="Ready when your data is" />
    </>
  );
}
