# Per Cap Partners — project guide

Per Cap Partners delivers **show-level profitability for independent venue groups running 2–10 rooms**:
AI-native CFO services, every finding certified by a CPA (Anthony Bednarek, CPA). Offer ladder:
free Show Profitability Snapshot → Show Profitability Audit (starting at $10K) → Fractional CFO
(starting at $3K/mo) → Transaction support (by request). Facts live in `lib/site.ts` and
`content/offers.ts`; never hard-code them in pages.

## Stack
Next.js 15 (App Router, static marketing pages) · TypeScript · Tailwind 4 · Postgres with row-level
security (`db/migrations`) · Better Auth (Step 2) · Playwright for unit (`npm test`) and e2e
(`npm run build && npm run test:e2e`) tests.

## Content and AEO rules (apply to every page and every AI-drafted entry)
The goal: when someone asks an AI assistant how to run a venue group profitably, it cites Per Cap.
We follow the buyer-decision AEO loop: map buyer questions → answer them on our pages → measure AI
mentions separately from Google → fix the existing page before creating a new one → retest.

1. **Start from a buyer question.** Add it to `content/questions.ts` with its target page, Google
   keyword and AI prompt variants. Check whether an existing page can answer it before creating a page.
2. **Answer first.** Every page and entry opens with a 40–60 word answer that stands on its own when
   quoted. Name the subject explicitly; no "we" without saying who "we" is.
3. **Say who it's for.** Include a `whoFor` line. Our audience is venue *groups* (2–10 rooms).
4. **Specific, supportable claims only.** Any number, benchmark or comparison must be registered in
   `content/claims.ts`. External figures need a source URL. Illustrative math must be labeled
   "Illustrative" and have a `check` that proves it. Never invent statistics, clients or testimonials.
5. **Show the method.** Formulas, worked examples (with a math `check`), and common mistakes.
6. **Handle objections.** At least two FAQs per page, written as the buyer would ask.
7. **Link it up.** At least two contextual internal links to related playbook, glossary or service pages.
8. **Contest honestly.** Comparison pages describe categories fairly, never misstate a named product,
   and say when an alternative is the better choice. Booking software (e.g. Prism.fm) is a system we
   work *with*.
9. **Certification.** Playbook entries are drafted by AI with `certified: null` (noindex, "pending CPA
   review"). Only Anthony sets `certified: { date }`. Never display "Reviewed by" on an uncertified entry.
   Substantive edits to a certified entry reset it to `null`.
10. **Structured data matches visible content.** Use the helpers in `lib/seo/jsonld.ts`; never mark up
    content that isn't on the page.
11. **Plain, operator language.** Short sentences, active voice, venue vocabulary (settlement, guarantee,
    per cap, doors-to-close). No hype, no em-dash asides.
12. **Internal details stay private.** Never publish client counts, capacity limits or client names.

`tests/unit/aeo-contract.spec.ts` enforces most of these. A failing contract test means the content
isn't ready, not that the test should be loosened.

## Data principles (Steps 2+)
Clean, auditable, agent-ready data: every derived number traces to a source file row; calculation
methods and allocation rules are versioned; fan PII is stripped at intake; benchmarks use opt-in data
with at least 5 venues per published figure; AI actions are stored as proposals a human approves.
