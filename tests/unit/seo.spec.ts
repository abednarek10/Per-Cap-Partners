import { test, expect } from "@playwright/test";
import { serializeJsonLd, organization, faqPage, graph, founder, playbookArticle } from "@/lib/seo/jsonld";
import { llmsTxt, llmsFullTxt } from "@/lib/llms";
import { publicRoutes } from "@/lib/routes";
import { services } from "@/content/services";
import { glossary } from "@/content/glossary";
import { offers } from "@/content/offers";
import { playbook } from "@/content/playbook";
import { site } from "@/lib/site";

test("JSON-LD serialization cannot break out of a script tag", () => {
  const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  expect(out).not.toContain("</script>");
  expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
});

test("organization schema lists every offer on the ladder", () => {
  const org = organization();
  expect(org["@type"]).toEqual(["Organization", "ProfessionalService"]);
  if (site.showPricing) {
    const json = JSON.stringify(org);
    for (const o of offers) expect(json).toContain(o.name);
    expect(json).toContain('"minPrice":10000');
  }
});

test("founder schema carries the CPA credential", () => {
  const f = founder();
  expect(f.name).toBe(site.founder.name);
  expect(JSON.stringify(f)).toContain("Certified Public Accountant");
});

test("uncertified playbook schema never claims a reviewer", () => {
  for (const e of playbook.filter((x) => !x.certified)) {
    const json = JSON.stringify(playbookArticle(e));
    expect(json).not.toContain("reviewedBy");
    expect(json).not.toContain("lastReviewed");
  }
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

test("meta descriptions fit in search snippets", () => {
  for (const s of services) expect(s.description.length, s.slug).toBeLessThanOrEqual(170);
});

test("llms.txt lists services, offers and glossary terms", () => {
  const txt = llmsTxt();
  expect(txt.startsWith(`# ${site.name}`)).toBe(true);
  for (const s of services) expect(txt).toContain(`/services/${s.slug}`);
  for (const o of offers) expect(txt).toContain(o.name);
  for (const t of glossary) expect(txt).toContain(`/glossary/${t.slug}`);
  expect(llmsFullTxt().length).toBeGreaterThan(txt.length);
});
