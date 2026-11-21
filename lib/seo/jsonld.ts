import { site, absoluteUrl, monthlyPrice, freeAudit } from "@/lib/site";
import type { Faq, Service } from "@/content/services";
import type { Term } from "@/content/glossary";
import type { Article } from "@/content/insights";

type Thing = Record<string, unknown>;

const ORG_ID = absoluteUrl("/#organization");
const PERSON_ID = absoluteUrl("/about#founder");

export function organization(): Thing {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email,
    areaServed: { "@type": "Country", name: site.areaServed },
    knowsAbout: [
      "Fractional CFO services",
      "Music venue finance",
      "Per cap spending",
      "Ticket pricing",
      "Show settlements",
      "Venue cost reduction",
      "Fan data analytics",
    ],
    audience: { "@type": "BusinessAudience", audienceType: "Music venue owners, operators and general managers" },
    founder: { "@id": PERSON_ID },
    ...(site.showPricing
      ? {
          priceRange: `From ${monthlyPrice()}`,
          makesOffer: [
            {
              "@type": "Offer",
              name: freeAudit,
              description: "Review of the last 12 months of ticketing, bar and financial data, showing where per cap, costs and taxes can improve.",
              url: absoluteUrl("/contact"),
              price: 0,
              priceCurrency: site.currency,
            },
            {
              "@type": "Offer",
              name: "Fractional CFO engagement for music venues",
              url: absoluteUrl("/pricing"),
              priceCurrency: site.currency,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: site.monthlyFeeFrom,
                price: site.monthlyFeeFrom,
                priceCurrency: site.currency,
                unitCode: "MON",
              },
            },
          ],
        }
      : {}),
  };
}

export function founder(): Thing {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    worksFor: { "@id": ORG_ID },
    description: site.founder.bio,
    ...(site.founder.sameAs.length ? { sameAs: site.founder.sameAs } : {}),
  };
}

export function website(): Thing {
  return { "@type": "WebSite", "@id": absoluteUrl("/#website"), url: site.url, name: site.name, publisher: { "@id": ORG_ID }, inLanguage: "en-US" };
}

export function service(s: Service): Thing {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${s.slug}#service`),
    name: s.name,
    serviceType: s.name,
    description: s.answer,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: site.areaServed },
    audience: { "@type": "BusinessAudience", audienceType: "Independent music venues" },
  };
}

export function faqPage(faqs: Faq[]): Thing {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function definedTerm(t: Term): Thing {
  return {
    "@type": "DefinedTerm",
    "@id": absoluteUrl(`/glossary/${t.slug}#term`),
    name: t.term,
    description: t.definition,
    url: absoluteUrl(`/glossary/${t.slug}`),
    inDefinedTermSet: { "@type": "DefinedTermSet", name: `${site.name} Venue Finance Glossary`, url: absoluteUrl("/glossary") },
  };
}

export function article(a: Article): Thing {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated,
    url: absoluteUrl(`/insights/${a.slug}`),
    mainEntityOfPage: absoluteUrl(`/insights/${a.slug}`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    image: absoluteUrl("/opengraph-image"),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

/** Wrap one or more nodes in a single @graph document. */
export function graph(...nodes: Thing[]): Thing {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Serialize safely for an inline <script> tag (prevents </script> breakout). */
export function serializeJsonLd(data: Thing): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
