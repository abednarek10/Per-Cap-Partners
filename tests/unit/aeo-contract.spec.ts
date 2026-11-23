/**
 * AEO content contract. These tests encode the content rules in CLAUDE.md so every page and every
 * AI-drafted entry follows them as the site grows. A failure means the content isn't ready.
 */
import { test, expect } from "@playwright/test";
import { services } from "@/content/services";
import { comparisons } from "@/content/compare";
import { playbook, publishedPlaybook } from "@/content/playbook";
import { glossary } from "@/content/glossary";
import { claims, getClaim } from "@/content/claims";
import { questions } from "@/content/questions";
import { offers } from "@/content/offers";
import { publicRoutes, nonIndexedRoutes } from "@/lib/routes";
import { llmsTxt, llmsFullTxt } from "@/lib/llms";

const words = (s: string) => s.trim().split(/\s+/).length;
const knownPaths = new Set([...publicRoutes().map((r) => r.path), ...nonIndexedRoutes()]);
const DAY = 24 * 60 * 60 * 1000;

type Answerable = { id: string; answer: string; whoFor: string; faqs: unknown[]; related: { href: string }[] };
const answerables: Answerable[] = [
  ...services.map((s) => ({ id: `service:${s.slug}`, answer: s.answer, whoFor: s.whoFor, faqs: s.faqs, related: s.related })),
  ...comparisons.map((c) => ({ id: `compare:${c.slug}`, answer: c.answer, whoFor: c.whoFor, faqs: c.faqs, related: c.related })),
  ...playbook.map((p) => ({ id: `playbook:${p.slug}`, answer: p.answer, whoFor: p.whoFor, faqs: p.faqs, related: p.related })),
];

test.describe("page contract", () => {
  for (const a of answerables) {
    test(`${a.id}: answer-first, audience, objections, links`, () => {
      const n = words(a.answer);
      expect(n, `${a.id} answer is ${n} words; keep it 40-60 so it can be quoted`).toBeGreaterThanOrEqual(40);
      expect(n, `${a.id} answer is ${n} words; keep it 40-60 so it can be quoted`).toBeLessThanOrEqual(60);
      expect(a.whoFor.length, `${a.id} needs a who-it's-for line`).toBeGreaterThan(10);
      expect(a.faqs.length, `${a.id} needs at least two objection-handling FAQs`).toBeGreaterThanOrEqual(2);
      expect(a.related.length, `${a.id} needs at least two internal links`).toBeGreaterThanOrEqual(2);
      for (const r of a.related) expect(knownPaths.has(r.href), `${a.id} links to unknown page ${r.href}`).toBe(true);
    });
  }
});

test.describe("playbook entries", () => {
  for (const e of playbook) {
    test(`${e.slug}: method, worked example, mistakes`, () => {
      expect(e.title.endsWith("?"), "titles are phrased as the buyer's question").toBe(true);
      expect(e.sections.length).toBeGreaterThanOrEqual(2);
      expect(e.example.check(), "worked example math must add up").toBe(true);
      expect(e.mistakes.length).toBeGreaterThanOrEqual(3);
      expect(e.description.length).toBeLessThanOrEqual(170);
      for (const id of e.claimIds) expect(getClaim(id), `unknown claim ${id}`).toBeTruthy();
      if (e.certified) {
        expect(e.certified.date >= e.drafted, "certification can't predate the draft").toBe(true);
        expect(Number.isNaN(Date.parse(e.certified.date))).toBe(false);
      }
    });
  }

  test("uncertified drafts never reach the sitemap or llms.txt", () => {
    const published = new Set(publishedPlaybook().map((e) => e.slug));
    const indexed = new Set(publicRoutes().map((r) => r.path));
    const llms = llmsTxt() + llmsFullTxt();
    for (const e of playbook.filter((x) => !published.has(x.slug))) {
      expect(indexed.has(`/playbook/${e.slug}`), `${e.slug} is a draft but is in the sitemap`).toBe(false);
      expect(llms.includes(`/playbook/${e.slug}`), `${e.slug} is a draft but is in llms.txt`).toBe(false);
      expect(nonIndexedRoutes()).toContain(`/playbook/${e.slug}`);
    }
  });
});

test.describe("claims registry", () => {
  test("claims are current, sourced and arithmetically true", () => {
    const ids = new Set<string>();
    for (const c of claims) {
      expect(ids.has(c.id), `duplicate claim ${c.id}`).toBe(false);
      ids.add(c.id);
      const age = (Date.now() - Date.parse(c.verified)) / DAY;
      expect(age, `${c.id} was last verified ${Math.round(age)} days ago; re-verify it`).toBeLessThan(366);
      if (c.kind === "external") expect(c.source?.url, `${c.id} is external and needs a source`).toMatch(/^https:\/\//);
      if (c.kind === "illustrative") {
        expect(c.check, `${c.id} needs a math check`).toBeTruthy();
        expect(c.check!(), `${c.id} math doesn't add up`).toBe(true);
      }
    }
  });
});

test.describe("buyer question map", () => {
  test("every question resolves to a page that exists", () => {
    expect(questions.length).toBeGreaterThanOrEqual(30);
    for (const q of questions) {
      expect(knownPaths.has(q.target), `"${q.q}" targets missing page ${q.target}`).toBe(true);
      expect(q.prompts.length, `"${q.q}" needs AI prompt variants for tracking`).toBeGreaterThanOrEqual(1);
    }
  });

  test("covers every buying stage and the CONTEST bucket", () => {
    for (const stage of ["problem", "approach", "provider", "price"] as const) {
      expect(questions.some((q) => q.stage === stage), `no ${stage}-stage questions`).toBe(true);
    }
    expect(questions.some((q) => q.bucket === "CONTEST")).toBe(true);
  });

  test("questions are unique", () => {
    const seen = new Set(questions.map((q) => q.q.toLowerCase()));
    expect(seen.size).toBe(questions.length);
  });
});

test.describe("offers and glossary", () => {
  test("every service maps to an offer, and the ladder starts free", () => {
    expect(offers[0]?.price.type).toBe("free");
    for (const s of services) expect(offers.some((o) => o.id === s.offerId), s.slug).toBe(true);
  });

  test("glossary cross-references and services exist", () => {
    const slugs = new Set(glossary.map((t) => t.slug));
    for (const t of glossary) {
      for (const r of t.related) expect(slugs.has(r), `${t.slug} -> ${r}`).toBe(true);
      if (t.service) expect(services.some((s) => s.slug === t.service), `${t.slug} -> service ${t.service}`).toBe(true);
    }
  });
});
