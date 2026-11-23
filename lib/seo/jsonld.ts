import { site, absoluteUrl } from "@/lib/site";
import { offers, priceLabel, getOffer } from "@/content/offers";
import type { Faq, Service } from "@/content/services";
import type { Term } from "@/content/glossary";
import type { Article } from "@/content/insights";
import type { PlaybookEntry } from "@/content/playbook";

type Thing = Record<string, unknown>;

const ORG_ID = absoluteUrl("/#organization");
const PERSON_ID = absoluteUrl("/team#founder");

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
      "Show-level profitability for live music venues",
      "Fractional CFO services for venue groups",
      "Artist deal settlements",
      "13-week cash flow forecasting",
      "Music venue finance",
      "Per cap spending",
      "Booking offer guardrails",
      "Venue lender and covenant reporting",
      "Quality of earnings for venue transactions",
    ],
    audience: { "@type": "BusinessAudience", audienceType: site.audience },
    founder: { "@id": PERSON_ID },
    ...(site.showPricing
      ? {
          makesOffer: offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            description: o.summary,
            url: absoluteUrl(o.href),
            ...(o.price.type === "free"
              ? { price: 0, priceCurrency: site.currency }
              : o.price.type === "from"
                ? {
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      minPrice: o.price.amount,
                      priceCurrency: site.currency,
                      ...(o.price.unit === "month" ? { unitCode: "MON" } : {}),
                    },
                  }
                : {}),
          })),
        }
      : {}),
  };
}

export function founder(): Thing {
  const f = site.founder;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: f.name,
    honorificSuffix: f.credentials,
    jobTitle: f.jobTitle,
    worksFor: { "@id": ORG_ID },
    description: f.bio,
    url: absoluteUrl("/team"),
    ...(f.headshot ? { image: absoluteUrl(f.headshot) } : {}),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional license",
      name: "Certified Public Accountant (CPA)",
      ...(f.licenseState ? { recognizedBy: { "@type": "Organization", name: `${f.licenseState} Board of Accountancy` } } : {}),
    },
    knowsAbout: ["Accounting", "Financial planning and analysis", "Music venue finance", "Revenue per attendee", "Tax efficiency"],
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
  };
}

/** The Per Cap platform as a software product (helps AI engines classify it). */
export function softwareApplication(): Thing {
  return {
    "@type": "SoftwareApplication",
    "@id": absoluteUrl("/product#app"),
    name: site.productName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Show-level profitability for venue groups",
    operatingSystem: "Web",
    url: absoluteUrl("/product"),
    description: site.positioning,
    publisher: { "@id": ORG_ID },
    audience: { "@type": "BusinessAudience", audienceType: site.audience },
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
    audience: { "@type": "BusinessAudience", audienceType: s.whoFor },
    ...(site.showPricing ? { offers: { "@type": "Offer", name: getOffer(s.offerId).name, description: priceLabel(getOffer(s.offerId).price), url: absoluteUrl(getOffer(s.offerId).href) } } : {}),
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

/** Playbook entry. `reviewedBy` and `lastReviewed` appear only once a CPA has certified it. */
export function playbookArticle(e: PlaybookEntry): Thing {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`/playbook/${e.slug}#article`),
    headline: e.title,
    description: e.description,
    abstract: e.answer,
    articleSection: e.category,
    audience: { "@type": "BusinessAudience", audienceType: e.whoFor },
    url: absoluteUrl(`/playbook/${e.slug}`),
    mainEntityOfPage: absoluteUrl(`/playbook/${e.slug}`),
    datePublished: e.drafted,
    dateModified: e.certified?.date ?? e.drafted,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@type": "CollectionPage", name: `${site.name} Operator Playbook`, url: absoluteUrl("/playbook") },
    ...(e.certified ? { author: { "@id": PERSON_ID }, reviewedBy: { "@id": PERSON_ID }, lastReviewed: e.certified.date } : { author: { "@id": ORG_ID } }),
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
