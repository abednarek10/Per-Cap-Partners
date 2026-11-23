import { services } from "@/content/services";
import { glossary } from "@/content/glossary";
import { articles } from "@/content/insights";
import { comparisons } from "@/content/compare";
import { playbook, publishedPlaybook } from "@/content/playbook";

/** Every indexable public route, used by the sitemap, llms.txt and the SEO test suite. */
export function publicRoutes(): { path: string; lastModified?: string; priority: number }[] {
  return [
    { path: "/", priority: 1 },
    { path: "/show-profitability", priority: 0.95 },
    { path: "/snapshot", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    { path: "/pricing", priority: 0.85 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/product", priority: 0.7 },
    { path: "/team", priority: 0.8 },
    { path: "/security", priority: 0.7 },
    { path: "/playbook", priority: 0.85 },
    ...publishedPlaybook().map((e) => ({ path: `/playbook/${e.slug}`, lastModified: e.certified!.date, priority: 0.8 })),
    { path: "/compare", priority: 0.7 },
    ...comparisons.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.75 })),
    { path: "/faq", priority: 0.7 },
    { path: "/resources", priority: 0.5 },
    { path: "/glossary", priority: 0.6 },
    ...glossary.map((t) => ({ path: `/glossary/${t.slug}`, priority: 0.6 })),
    { path: "/insights", priority: 0.5 },
    ...articles.map((a) => ({ path: `/insights/${a.slug}`, lastModified: a.updated, priority: 0.5 })),
  ];
}

/** Routes that exist but must stay out of indexes (drafts awaiting CPA review, internal queues). */
export function nonIndexedRoutes(): string[] {
  return ["/playbook/review", ...playbook.filter((e) => !e.certified).map((e) => `/playbook/${e.slug}`)];
}
