import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section, PageHero, CtaBand } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About Per Cap Partners",
  description:
    "Per Cap Partners gives independent music venues the finance function arena operators have, with every recommendation certified by a person before delivery.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
        eyebrow="About"
        title="A finance team for the rooms that build music scenes"
        answer={`${site.name} is a fractional CFO practice for independent music venues. It combines software that turns ticketing, bar and financial exports into per-attendee insight with a human advisor who certifies every recommendation. Each client works directly with the advisor who signs off on their numbers.`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <section id="founder" aria-labelledby="founder-name" className="rounded-2xl border border-line bg-surface p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Certifying advisor</p>
            <h2 id="founder-name" className="mt-3 text-3xl font-bold">{site.founder.name}</h2>
            <p className="mt-1 text-accent-ink">{site.founder.jobTitle}</p>
            <p className="mt-5 leading-relaxed text-muted">{site.founder.bio}</p>
          </section>
          <div className="prose-venue">
            <h2 className="!mt-0 text-ink">Why we exist</h2>
            <p>
              Independent venues are where artists build their first real audiences, and they run on some of the thinnest
              margins in live entertainment. Owners and GMs spend their days advancing shows, managing staff and looking after
              artists. The finance work that could protect the business gets done late at night, if at all.
            </p>
            <p>
              We take that work off their plate. We measure what each fan is worth to the room, find where revenue leaks and
              costs creep, and prepare tax-efficiency findings for the venue's CPA. Then we stand behind every recommendation
              with a signature.
            </p>
            <h2 className="text-ink">How we work</h2>
            <ul>
              <li>Operator-first: recommendations have to work on a Saturday night, not just in a spreadsheet.</li>
              <li>Human-certified: nothing reaches a client without review and sign-off.</li>
              <li>Privacy by design: fan contact data is tokenized before storage.</li>
              <li>Accountable: fees are reassessed each year against agreed performance metrics.</li>
            </ul>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
