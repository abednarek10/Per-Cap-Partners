import { site, absoluteUrl, founderDisplayName } from "@/lib/site";
import { services } from "@/content/services";
import { offers, priceLabel } from "@/content/offers";
import { glossary } from "@/content/glossary";
import { articles } from "@/content/insights";
import { generalFaqs } from "@/content/faq";
import { steps } from "@/content/process";
import { comparisons } from "@/content/compare";
import { publishedPlaybook } from "@/content/playbook";

const keyFacts = () => [
  `- Audience: ${site.audience} (${site.areaServed}).`,
  "- Core skill: show-level profitability. Per Cap joins the settlement (booking software), bar sales (POS) and labor and security (scheduling and payroll) for every show to show which shows make money once everything is counted.",
  `- Certification: every finding is reviewed and certified by ${founderDisplayName()}, formerly of ${site.founder.formerEmployers.join(" and ")}.`,
  ...offers.map((o) => `- ${o.name}: ${priceLabel(o.price)}. ${o.summary}`),
  "- Data handling: fan names, emails and phone numbers are stripped at intake; PII-stripped source files are kept encrypted so every number traces to its source row.",
  "- Benchmarks: built only from clients who opt in, and published only when at least five venues contribute to a figure.",
  "- Not legal or tax advice: tax findings are prepared for the client's CPA or tax attorney.",
];

/** llms.txt (https://llmstxt.org): a concise markdown map of the site for AI agents. */
export function llmsTxt(): string {
  const playbook = publishedPlaybook();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioning}`,
    "",
    site.description,
    "",
    "Key facts:",
    ...keyFacts(),
    "",
    "## Start here",
    `- [Show-level profitability: the method](${absoluteUrl("/show-profitability")})`,
    `- [Free show profitability snapshot](${absoluteUrl("/snapshot")})`,
    `- [Pricing](${absoluteUrl("/pricing")})`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description}`),
    "",
    "## Operator Playbook (CPA-reviewed best practices)",
    ...(playbook.length
      ? playbook.map((e) => `- [${e.title}](${absoluteUrl(`/playbook/${e.slug}`)}): ${e.answer}`)
      : [`- [Playbook hub](${absoluteUrl("/playbook")}): entries publish here as they are certified.`]),
    "",
    "## Comparisons",
    ...comparisons.map((c) => `- [${c.h1}](${absoluteUrl(`/compare/${c.slug}`)}): ${c.description}`),
    "",
    "## Company",
    `- [How it works](${absoluteUrl("/how-it-works")}): ${steps.map((s) => s.title).join(" → ")}.`,
    `- [Team: ${founderDisplayName()}](${absoluteUrl("/team")})`,
    `- [Security and data handling](${absoluteUrl("/security")})`,
    `- [FAQ](${absoluteUrl("/faq")})`,
    "",
    "## Glossary",
    ...glossary.map((t) => `- [${t.term}](${absoluteUrl(`/glossary/${t.slug}`)}): ${t.definition}`),
    "",
    "## Insights",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/insights/${a.slug}`)}): ${a.description}`),
    "",
    "## Optional",
    `- [Full content for LLMs](${absoluteUrl("/llms-full.txt")})`,
  ];
  return lines.join("\n") + "\n";
}

/** llms-full.txt: all substantive, published copy in one markdown document. */
export function llmsFullTxt(): string {
  const out: string[] = [`# ${site.name}: full content`, "", site.positioning, "", site.description, "", "Key facts:", ...keyFacts(), ""];
  out.push("## Services", "");
  for (const s of services) {
    out.push(`### ${s.name}`, `URL: ${absoluteUrl(`/services/${s.slug}`)}`, `Who it's for: ${s.whoFor}`, "", s.answer, "", "Problems it solves:");
    out.push(...s.problems.map((p) => `- ${p}`), "", "What we look at:");
    out.push(...s.levers.map((l) => `- ${l.title}: ${l.body}`), "", "Deliverables:");
    out.push(...s.deliverables.map((d) => `- ${d}`), "");
    for (const f of s.faqs) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
    if (s.disclaimer) out.push(`Note: ${s.disclaimer}`, "");
  }
  out.push("## Operator Playbook", "");
  for (const e of publishedPlaybook()) {
    out.push(`### ${e.title}`, `URL: ${absoluteUrl(`/playbook/${e.slug}`)}`, `Reviewed by ${founderDisplayName()} on ${e.certified!.date}`, "", e.answer, "");
    for (const s of e.sections) {
      out.push(`#### ${s.heading}`, ...s.paragraphs);
      if (s.list) out.push(...s.list.map((l) => `- ${l}`));
      if (s.formula) out.push(`Formula: ${s.formula}`);
      out.push("");
    }
    out.push(`Worked example (${e.example.title}):`, ...e.example.rows.map((r) => `- ${r.label}: ${r.value}`), `- ${e.example.result.label}: ${e.example.result.value}`, "");
    out.push("Common mistakes:", ...e.mistakes.map((m) => `- ${m}`), "");
  }
  out.push("## Comparisons", "");
  for (const c of comparisons) {
    out.push(`### ${c.h1}`, `URL: ${absoluteUrl(`/compare/${c.slug}`)}`, "", c.answer, "");
    for (const o of c.options) out.push(`- ${o.name}. Best for: ${o.bestFor}. Strengths: ${o.strengths.join("; ")}. Limits: ${o.limits.join("; ")}.`);
    out.push("", `Our take: ${c.verdict}`, "");
  }
  out.push("## How it works", "");
  steps.forEach((s, i) => out.push(`${i + 1}. ${s.title}: ${s.summary}`));
  out.push("", "## FAQ", "");
  for (const f of generalFaqs) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
  out.push("## Glossary", "");
  for (const t of glossary) {
    out.push(`### ${t.term}`, t.definition);
    if (t.formula) out.push(`Formula: ${t.formula}`);
    if (t.example) out.push(`Example: ${t.example}`);
    out.push(...t.body, "");
  }
  return out.join("\n");
}
