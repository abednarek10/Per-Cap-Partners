/**
 * Single source of truth for business facts used across pages, JSON-LD,
 * llms.txt and OG images. Change a value here and every surface updates.
 * Offers and prices live in content/offers.ts.
 */
export const site = {
  name: "Per Cap Partners",
  shortName: "Per Cap",
  productName: "Per Cap",
  tagline: "Show-level profitability for independent venue groups",
  positioning:
    "Per Cap Partners delivers show-level profitability for independent venue groups: AI-native CFO services, certified by a CPA.",
  description:
    "Per Cap Partners helps independent venue groups running 2 to 10 rooms see which shows make money once the bar, labor and security are counted. We join settlement, POS and payroll data show by show and deliver CPA-certified profitability analysis, cash forecasts and booking guardrails.",
  audience: "Independent venue operator groups running 2 to 10 rooms",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.percappartners.com").replace(/\/$/, ""),
  email: "hello@percappartners.com",
  locale: "en_US",
  areaServed: "United States",
  currency: "USD",
  showPricing: true,
  // TODO(Anthony): confirm the turnaround you can commit to for hand-delivered snapshots.
  snapshotTurnaround: "5 business days",

  founder: {
    name: "Anthony Bednarek",
    credentials: "CPA",
    jobTitle: "Founder",
    formerEmployers: ["Deloitte", "Salesforce"],
    bio: "Anthony Bednarek is a CPA who previously worked at Deloitte and Salesforce. He founded Per Cap Partners to give independent venue groups the show-level financial clarity that usually takes a full finance team, and he reviews and certifies every finding before a client sees it.",
    // Optional details. Anything left empty is simply not shown on the site.
    licenseState: "" as string, // e.g. "Illinois"
    linkedin: "" as string, // full LinkedIn profile URL
    headshot: "" as string, // e.g. "/team/anthony-bednarek.jpg" in /public
    roles: [] as { org: string; title: string; years: string }[], // e.g. { org: "Deloitte", title: "Audit Senior", years: "2015–2019" }
    inOwnWords: "" as string, // 2–3 sentences on why you built Per Cap
  },
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);

/** Primary call to action used across the site. */
export const primaryCta = { href: "/snapshot", label: "Get a free show profitability snapshot" } as const;
/** Shorter label for tight spaces like the header. */
export const primaryCtaShort = "Free snapshot";
/** "Anthony Bednarek, CPA" */
export const founderDisplayName = () => `${site.founder.name}, ${site.founder.credentials}`;
