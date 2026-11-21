# Per Cap Partners

Fractional CFO and fan intelligence for independent music venues. This repo holds the public website (Phase 1). Later phases add the secure client portal and the data ingestion engine.

## Stack
Next.js 15 (App Router, static rendering) · TypeScript · Tailwind CSS 4 · Zod · Drizzle ORM + Postgres · Playwright (unit + e2e tests)

## Getting started
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL; DATABASE_URL optional in dev
npm run dev
```
In development without `DATABASE_URL`, audit requests go to `.data/leads.jsonl` (git-ignored). In production `DATABASE_URL` is required, and requests are never silently dropped.

## Editing content
All copy lives in typed files. Edit them and every page, the JSON-LD, the sitemap and `llms.txt` update together.

| What | File |
|---|---|
| Business facts (name, URL, email, pricing, 15-venue cap, founder) | `lib/site.ts` |
| Service pages | `content/services.ts` |
| FAQ | `content/faq.ts` |
| Glossary | `content/glossary.ts` |
| Insights articles | `content/insights.ts` |
| Process steps | `content/process.ts` |

Set `showPricing: false` in `lib/site.ts` to hide the price everywhere.

## SEO / AIO features
- Every page opens with an answer-first summary of about 40–60 words that answer engines can quote.
- JSON-LD `@graph`: Organization/ProfessionalService, Person, WebSite, Service, FAQPage, DefinedTerm(Set), Article, HowTo, BreadcrumbList.
- `sitemap.xml`, `robots.txt` (explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), plus `/llms.txt` and `/llms-full.txt` generated from the content files.
- Canonical URLs, Open Graph and Twitter cards, and a generated OG image.
- All marketing pages are statically prerendered and load about 106 kB of shared JS.

## Database
```bash
npm run db:migrate    # applies db/migrations (needs DATABASE_URL)
```

## Tests
```bash
npm test              # unit tests
npm run build && npm run test:e2e   # every route: status, single H1, canonical, meta, JSON-LD, links, form
```

## Roadmap
1. Foundation + SEO/AIO site (done)
2. Auth + secure client portal (Supabase Auth with MFA, multi-tenant RLS, audit log, CSP)
3. Secure ingestion engine: signed uploads, source adapters (Ticketmaster, AXS, Eventbrite, DICE, Etix, Square, Toast, Clover), PII tokenization at ingest, raw-file deletion
4. Human-in-the-loop analysis and certification workflow
