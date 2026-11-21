import { site, absoluteUrl, monthlyPrice, trialLabel } from "@/lib/site";
import { services } from "@/content/services";
import { glossary } from "@/content/glossary";
import { articles } from "@/content/insights";
import { generalFaqs } from "@/content/faq";
import { steps } from "@/content/process";

/** llms.txt (https://llmstxt.org): a concise markdown map of the site for AI agents. */
export function llmsTxt(): string {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Key facts:",
    `- Audience: independent music venue owners, operators and general managers (${site.areaServed}).`,
    "- Model: fractional CFO. Software analyzes ticketing, POS and financial exports; a person reviews and certifies every recommendation.",
    "- Engagement: each client works directly with a dedicated advisor who certifies their recommendations.",
    ...(site.showPricing ? [`- Pricing: from ${monthlyPrice()}. ${trialLabel()} (onboarding plus a certified baseline revenue audit). Pricing reassessed annually against agreed performance metrics.`] : []),
    "- Privacy: fan emails/phones are tokenized (keyed one-way hash) at ingestion; raw files are deleted after processing.",
    "- Not legal or tax advice: tax findings are prepared for the client's CPA or tax attorney.",
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description}`),
    "",
    "## Company",
    `- [How it works](${absoluteUrl("/how-it-works")}): ${steps.map((s) => s.title).join(" → ")}.`,
    `- [Pricing](${absoluteUrl("/pricing")})`,
    `- [Security and data handling](${absoluteUrl("/security")})`,
    `- [About](${absoluteUrl("/about")})`,
    `- [FAQ](${absoluteUrl("/faq")})`,
    `- [Request a venue revenue audit](${absoluteUrl("/contact")})`,
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

/** llms-full.txt: all substantive copy in one markdown document. */
export function llmsFullTxt(): string {
  const out: string[] = [`# ${site.name}: full content`, "", site.description, ""];
  out.push("## Services", "");
  for (const s of services) {
    out.push(`### ${s.name}`, `URL: ${absoluteUrl(`/services/${s.slug}`)}`, "", s.answer, "", "Common problems:");
    out.push(...s.problems.map((p) => `- ${p}`), "", "Levers:");
    out.push(...s.levers.map((l) => `- ${l.title}: ${l.body}`), "", "Deliverables:");
    out.push(...s.deliverables.map((d) => `- ${d}`), "");
    for (const f of s.faqs) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
    if (s.disclaimer) out.push(`Note: ${s.disclaimer}`, "");
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
  out.push("## Insights", "");
  for (const a of articles) {
    out.push(`### ${a.title}`, `URL: ${absoluteUrl(`/insights/${a.slug}`)}`, "", "Key takeaways:", ...a.keyTakeaways.map((k) => `- ${k}`), "");
    for (const s of a.sections) {
      out.push(`#### ${s.heading}`, ...s.paragraphs);
      if (s.list) out.push(...s.list.map((l) => `- ${l}`));
      out.push("");
    }
  }
  return out.join("\n");
}
