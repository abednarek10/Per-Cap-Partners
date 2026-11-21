import { test, expect } from "@playwright/test";
import { serializeJsonLd, organization, faqPage, graph } from "@/lib/seo/jsonld";
import { llmsTxt, llmsFullTxt } from "@/lib/llms";
import { publicRoutes } from "@/lib/routes";
import { services } from "@/content/services";
import { glossary } from "@/content/glossary";
import { site } from "@/lib/site";

const words = (s: string) => s.trim().split(/\s+/).length;

test("JSON-LD serialization cannot break out of a script tag", () => {
  const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  expect(out).not.toContain("</script>");
  expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
});

test("organization schema carries pricing facts", () => {
  const org = organization();
  expect(org["@type"]).toEqual(["Organization", "ProfessionalService"]);
  if (site.showPricing) expect(JSON.stringify(org)).toContain(String(site.monthlyFeeFrom));
});

test("FAQ schema maps questions to answers", () => {
  const g = graph(faqPage([{ q: "Q?", a: "A." }]));
  expect(g["@context"]).toBe("https://schema.org");
  expect(JSON.stringify(g)).toContain('"acceptedAnswer"');
});

test("public routes are unique and start with a slash", () => {
  const paths = publicRoutes().map((r) => r.path);
  expect(new Set(paths).size).toBe(paths.length);
  for (const p of paths) expect(p.startsWith("/")).toBe(true);
});

test("answer-first summaries stay quotable (roughly 35-75 words)", () => {
  for (const s of services) {
    const n = words(s.answer);
    expect(n, `${s.slug} answer is ${n} words`).toBeGreaterThanOrEqual(35);
    expect(n, `${s.slug} answer is ${n} words`).toBeLessThanOrEqual(75);
  }
});

test("meta descriptions fit in search snippets", () => {
  for (const s of services) expect(s.description.length, s.slug).toBeLessThanOrEqual(170);
});

test("glossary cross-references point at real terms", () => {
  const slugs = new Set(glossary.map((t) => t.slug));
  for (const t of glossary) for (const r of t.related) expect(slugs.has(r), `${t.slug} -> ${r}`).toBe(true);
});

test("llms.txt lists every service and glossary term", () => {
  const txt = llmsTxt();
  expect(txt.startsWith(`# ${site.name}`)).toBe(true);
  for (const s of services) expect(txt).toContain(`/services/${s.slug}`);
  for (const t of glossary) expect(txt).toContain(`/glossary/${t.slug}`);
  expect(llmsFullTxt().length).toBeGreaterThan(txt.length);
});
