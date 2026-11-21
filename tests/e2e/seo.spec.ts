import { test, expect } from "@playwright/test";
import { publicRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

const routes = publicRoutes();

for (const { path } of routes) {
  test(`SEO basics: ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    expect((await page.title()).length).toBeGreaterThan(10);

    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.length ?? 0, "meta description length").toBeGreaterThanOrEqual(50);
    expect(desc?.length ?? 0, "meta description length").toBeLessThanOrEqual(170);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(absoluteUrl(path).replace(/\/$/, ""));
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThan(0);
    for (const b of blocks) {
      const data = JSON.parse(b);
      expect(data["@context"]).toBe("https://schema.org");
      expect(Array.isArray(data["@graph"])).toBe(true);
    }
    const types = blocks.flatMap((b) => JSON.parse(b)["@graph"].map((n: { "@type": unknown }) => n["@type"])).flat();
    expect(types).toContain("Organization");
    if (path !== "/") expect(types).toContain("BreadcrumbList");

    // Every <details> FAQ on the page should be backed by FAQPage schema.
    if ((await page.locator("main details").count()) > 0) expect(types).toContain("FAQPage");
  });
}

test("no broken internal links", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const { path } of routes) {
    await page.goto(path);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!.split("#")[0]!));
    hrefs.forEach((h) => seen.add(h || "/"));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("robots.txt welcomes AI crawlers and points at the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) expect(txt).toContain(bot);
  expect(txt).toContain("Disallow: /portal/");
  expect(txt).toContain(`Sitemap: ${absoluteUrl("/sitemap.xml")}`);
});

test("sitemap lists every public route", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const { path } of routes) expect(xml).toContain(`<loc>${absoluteUrl(path)}</loc>`);
});

test("llms.txt and llms-full.txt are served as markdown", async ({ request }) => {
  for (const p of ["/llms.txt", "/llms-full.txt"]) {
    const res = await request.get(p);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/markdown");
  }
});

test("security headers are set", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("OG image renders", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
});

test("unknown pages return 404 with noindex", async ({ page }) => {
  const res = await page.goto("/not-a-real-page");
  expect(res?.status()).toBe(404);
  const robots = await page.locator('meta[name="robots"]').evaluateAll((m) => m.map((x) => x.getAttribute("content")));
  expect(robots.some((c) => c?.includes("noindex"))).toBe(true);
});

// Internal engagement details must never appear on public surfaces.
test("no public surface reveals internal engagement details", async ({ page, request }) => {
  const leak = /\b\d+\s+(venues|clients)\s+(at a time|max)|only\s+\d+\s+venues|roster|\bseats?\b|capped at/i;
  for (const { path } of routes) {
    await page.goto(path);
    expect(await page.locator("body").innerText(), path).not.toMatch(leak);
  }
  for (const p of ["/llms.txt", "/llms-full.txt"]) expect(await (await request.get(p)).text(), p).not.toMatch(leak);
});
