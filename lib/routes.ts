import { services } from "@/content/services";
import { glossary } from "@/content/glossary";
import { articles } from "@/content/insights";

/** Every indexable public route, used by the sitemap and the SEO test suite. */
export function publicRoutes(): { path: string; lastModified?: string; priority: number }[] {
  return [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    { path: "/how-it-works", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/security", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/glossary", priority: 0.6 },
    ...glossary.map((t) => ({ path: `/glossary/${t.slug}`, priority: 0.6 })),
    { path: "/insights", priority: 0.6 },
    ...articles.map((a) => ({ path: `/insights/${a.slug}`, lastModified: a.updated, priority: 0.6 })),
  ];
}
