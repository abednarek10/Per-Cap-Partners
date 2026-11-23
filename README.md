# Per Cap Partners

Show-level profitability for independent venue groups running 2–10 rooms: AI-native CFO services,
certified by a CPA. **Read `CLAUDE.md` first**: it holds the positioning, the content and AEO rules,
and the data principles every change must follow.

## Stack
Next.js 15 (App Router, static rendering) · TypeScript · Tailwind CSS 4 · Zod · Postgres (plain SQL migrations + row-level security) · Playwright (unit + e2e tests)

## Getting started
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL; DATABASE_URL optional in dev
npm run dev
```
In development without `DATABASE_URL`, snapshot requests go to `.data/leads.jsonl` (git-ignored). In production `DATABASE_URL` is required, and requests are never silently dropped.

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
npm run db:migrate    # applies db/migrations in order (needs DATABASE_OWNER_URL)
```

## Tests
```bash
npm test              # unit tests
npm run build && npm run test:e2e   # every route: status, single H1, canonical, meta, JSON-LD, links, form
```

## Roadmap
1. Strategy and site: group positioning, offer ladder, Operator Playbook, comparisons, AEO contract tests (done)
2. Platform foundation: auth with required 2FA, group and room tenancy (RLS migrations already written), snapshot intake, admin console, notifications
3. Canonical data model and ingestion with lineage: settlement, POS and labor adapters, PII stripped at intake
4. Show P&L engine: allocation rules, self-serve snapshot, offer guardrails, 13-week cash forecast
5. AI drafting and CPA certification for findings and Playbook entries
6. AEO tracker and opt-in benchmarks
7. Billing and transaction-support tooling
