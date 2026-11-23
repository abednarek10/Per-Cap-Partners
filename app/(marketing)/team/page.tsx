import Link from "next/link";
import type { Metadata } from "next";
import { site, founderDisplayName, primaryCta } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { graph, founder as founderLd } from "@/lib/seo/jsonld";
import { Section, JsonLd, PageHero, CtaBand, Eyebrow } from "@/components/ui";

const f = site.founder;

export const metadata: Metadata = pageMetadata({
  title: `Team: ${f.name}, CPA, Founder of Per Cap Partners`,
  description: `Meet ${f.name}, CPA, founder of Per Cap Partners and formerly of ${f.formerEmployers.join(" and ")}. Every finding on the Per Cap platform is certified by a CPA.`,
  path: "/team",
});

const principles = [
  { t: "Certified, not just generated", b: "AI drafts findings from your data. A CPA checks the numbers and the reasoning, then signs off. Nothing reaches your dashboard unreviewed." },
  { t: "Operator-first", b: "A recommendation has to work on a sold-out Saturday, not just in a spreadsheet. Every finding names the owner, the effort and how it will be measured." },
  { t: "Your data stays yours", b: "Fan contact details are tokenized before storage, each venue's data is isolated, and nothing is sold or shared. Reports live in your account, not in inboxes." },
  { t: "Accountable pricing", b: "Pricing is reassessed every year against the results we agree on at kickoff. If Per Cap isn't paying for itself, you'll see it in the numbers." },
];

export default function TeamPage() {
  const initials = f.name.split(" ").map((n) => n[0]).join("");
  return (
    <>
      <JsonLd data={graph(founderLd())} />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Team", path: "/team" }]}
        eyebrow="Team"
        title="Built by a CPA for the people who run the rooms"
        answer={`${site.name} was founded by ${founderDisplayName()}, formerly of ${f.formerEmployers.join(" and ")}. Per Cap pairs AI that rebuilds every show's P&L with a licensed CPA who certifies each finding, so venue groups get CFO-level rigor without hiring a full finance team.`}
        whoFor={site.audience}
      />

      <Section aria-labelledby="founder-name">
        <article id="founder" className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="space-y-5">
            {f.headshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.headshot} alt={`${f.name}, ${f.credentials}`} width={320} height={320} className="aspect-square w-full max-w-xs rounded-3xl object-cover" />
            ) : (
              <div aria-hidden className="grid aspect-square w-full max-w-xs place-items-center rounded-3xl border border-line bg-surface font-display text-7xl font-bold text-accent-ink">
                {initials}
              </div>
            )}
            <dl className="grid gap-3 rounded-2xl border border-line bg-surface p-5 text-sm">
              <div>
                <dt className="text-muted">Credential</dt>
                <dd className="font-semibold">Certified Public Accountant{f.licenseState ? ` (${f.licenseState})` : ""}</dd>
              </div>
              <div>
                <dt className="text-muted">Previously</dt>
                <dd className="font-semibold">{f.formerEmployers.join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-muted">Role at Per Cap</dt>
                <dd className="font-semibold">{f.jobTitle}, certifying CPA</dd>
              </div>
              {f.linkedin && (
                <div>
                  <dt className="text-muted">Profile</dt>
                  <dd><a href={f.linkedin} className="font-semibold text-accent-ink hover:underline" rel="me noopener" target="_blank">LinkedIn</a></dd>
                </div>
              )}
            </dl>
          </div>

          <div className="max-w-3xl">
            <Eyebrow>Founder</Eyebrow>
            <h2 id="founder-name" className="mt-3 text-4xl font-bold sm:text-5xl">{f.name}, {f.credentials}</h2>
            <p className="mt-2 text-lg font-semibold text-accent-ink">{f.jobTitle} · Formerly {f.formerEmployers.join(" and ")}</p>
            <div className="prose-venue">
              <p>{f.bio}</p>
              {f.inOwnWords && <p className="border-l-2 border-accent pl-4 italic !text-ink">“{f.inOwnWords}”</p>}
              <p>
                At Per Cap, Anthony is the person who signs off on your numbers. The platform does the volume work: cleaning
                exports from different ticketing and POS systems, joining them, measuring every show per attendee and drafting
                findings. Anthony reviews each finding against how your venue actually runs before it is certified and published
                to your dashboard.
              </p>
            </div>

            {f.roles.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-bold">Experience</h3>
                <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
                  {f.roles.map((r) => (
                    <li key={`${r.org}-${r.title}`} className="flex flex-wrap items-baseline justify-between gap-2 p-4">
                      <span><span className="font-semibold">{r.title}</span> · {r.org}</span>
                      <span className="font-mono text-sm text-muted">{r.years}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>
      </Section>

      <Section className="border-t border-line" aria-labelledby="why-cpa">
        <div className="max-w-3xl">
          <Eyebrow>Why a CPA</Eyebrow>
          <h2 id="why-cpa" className="mt-3 text-3xl font-bold sm:text-4xl">AI is fast. A CPA is accountable.</h2>
          <p className="mt-5 text-lg text-muted">
            Ownership, lenders and your own accountant need numbers they can rely on. A licensed CPA is bound by professional
            standards of care and ethics, so a certified finding means a qualified person has checked the math and stands behind it.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.t} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-bold">{p.t}</h3>
              <p className="mt-2 text-muted">{p.b}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          Ready to see your venue through this lens?{" "}
          <Link href={primaryCta.href} className="font-semibold text-accent-ink hover:underline">{primaryCta.label} →</Link>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
