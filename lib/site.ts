/**
 * Single source of truth for business facts used across pages, JSON-LD,
 * llms.txt and OG images. Change a value here and every surface updates.
 */
export const site = {
  name: "Per Cap Partners",
  shortName: "Per Cap",
  tagline: "Fractional CFO and fan intelligence for independent music venues",
  description:
    "Per Cap Partners is a fractional CFO for independent music venues. We turn your ticketing, bar and financial data into human-certified recommendations that raise revenue per head, cut costs and improve tax efficiency, so owners and GMs can focus on booking and servicing talent.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.percappartners.com").replace(/\/$/, ""),
  email: "hello@percappartners.com",
  locale: "en_US",
  areaServed: "United States",

  // Engagement model
  monthlyFeeFrom: 849.99,
  currency: "USD",
  showPricing: true,

  founder: {
    // TODO: replace with the certifying advisor's real name, title and credentials.
    name: "Founder Name",
    jobTitle: "Founder & Managing Partner",
    bio: "Per Cap Partners was founded to give independent venues the finance function that only arena operators can usually afford. Every recommendation a client receives is reviewed and certified by the founder before it is delivered.",
    sameAs: [] as string[], // e.g. LinkedIn profile URL
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

/** "$849.99/mo" */
export const monthlyPrice = () => `${formatUsd(site.monthlyFeeFrom)}/mo`;
/** The no-cost entry offer every CTA points to. */
export const freeAudit = "Free Venue Revenue Audit";
