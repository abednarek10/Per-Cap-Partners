import type { Faq } from "./services";

/**
 * The Operator Playbook: best practices for running venue groups profitably.
 *
 * Workflow (AI drafts, a CPA certifies):
 *  - New entries start with `certified: null`. They render with a "pending CPA review" banner,
 *    are noindexed, and are excluded from the sitemap and llms.txt.
 *  - After Anthony reviews an entry, set `certified: { date: "YYYY-MM-DD" }`. Only then does the
 *    page show "Reviewed by Anthony Bednarek, CPA" and become indexable.
 *  - Any substantive edit after certification must reset `certified` to null until re-reviewed.
 *
 * The AEO contract (tests/unit/aeo-contract.spec.ts) checks every entry: answer length, audience,
 * worked example math, mistakes, FAQs, internal links and claim references.
 */
export type PlaybookEntry = {
  slug: string;
  title: string; // the buyer's question, as they'd ask it
  description: string; // meta description
  answer: string; // 40-60 words, quotable
  whoFor: string;
  category: "Show profitability" | "Booking & deals" | "Cash & lenders" | "Operations";
  sections: { heading: string; paragraphs: string[]; list?: string[]; formula?: string }[];
  example: {
    title: string;
    rows: { label: string; value: number; kind?: "money" | "count" | "ratio" | "percent" }[];
    result: { label: string; value: number; kind?: "money" | "count" | "ratio" | "percent" };
    check: () => boolean; // proves the example's arithmetic
    note?: string;
  };
  mistakes: string[];
  faqs: Faq[];
  related: { href: string; label: string }[];
  claimIds: string[];
  drafted: string; // ISO date
  certified: { date: string } | null;
};

const r = Math.round;

export const playbook: PlaybookEntry[] = [
  {
    slug: "how-to-calculate-show-level-profitability",
    title: "How do you calculate show-level profitability at a music venue?",
    description: "Step-by-step: build a show P&L from settlement, bar and labor data to see what each show really earns your venue.",
    answer:
      "Show-level profitability is what one show earns the venue after every cost that show caused. Start with the venue's share of ticket revenue after the artist settlement, add bar sales net of pour cost plus merch and facility fees, then subtract that night's labor, security and production. The result is show contribution, before overhead.",
    whoFor: "Owners, GMs and finance leads at venue groups who book their own shows.",
    category: "Show profitability",
    sections: [
      {
        heading: "The show P&L, line by line",
        paragraphs: ["A show P&L has the same shape for every show, which is what makes shows comparable across rooms and nights."],
        list: [
          "Venue ticket revenue: net box office minus the artist payout from the settlement",
          "Bar net: bar sales during the show window minus pour cost",
          "Other show income: facility fees, ticket fee rebates, merch commission, sponsorship tied to the show",
          "Direct labor and security: shifts and contracted security that worked the show",
          "Production and hospitality: sound, lights, stagehands, riders and catering",
          "Show contribution: everything above, before rent, salaries and other overhead",
        ],
        formula: "Show contribution = venue ticket revenue + bar net + other show income − direct labor and security − production and hospitality",
      },
      {
        heading: "Where each number lives",
        paragraphs: [
          "The settlement lives in your booking or settlement software, bar sales in the POS, and labor in scheduling or payroll. The work is joining them by show: match POS transactions to each show's doors-to-close window and allocate shifts by the hours they overlap that window.",
        ],
      },
      {
        heading: "Decide on contribution, report on net",
        paragraphs: [
          "Booking and pricing decisions should use contribution, because overhead doesn't change with one more or one fewer show. Allocate overhead only when you report profit by room or by month to ownership.",
        ],
      },
    ],
    example: {
      title: "A 1,150-person Saturday headliner",
      rows: [
        { label: "Venue ticket revenue after settlement", value: 6200, kind: "money" },
        { label: "Bar sales", value: 26400, kind: "money" },
        { label: "Pour cost at 22%", value: -5808, kind: "money" },
        { label: "Facility fees and merch commission", value: 3400, kind: "money" },
        { label: "Labor and security", value: -7900, kind: "money" },
        { label: "Production and hospitality", value: -3200, kind: "money" },
      ],
      result: { label: "Show contribution", value: 19092, kind: "money" },
      check: () => 6200 + 26400 - 5808 + 3400 - 7900 - 3200 === 19092 && r(26400 * 0.22) === 5808,
      note: "That is $16.60 of contribution per attendee. Illustrative figures.",
    },
    mistakes: [
      "Dividing by tickets sold instead of scanned attendance",
      "Counting bar sales gross instead of net of pour cost",
      "Leaving contracted security out because it sits in a different system",
      "Allocating overhead before deciding which shows to book",
      "Comparing rooms of different sizes without a per-attendee view",
    ],
    faqs: [
      { q: "Should overhead be allocated to each show?", a: "Not for booking decisions. Use contribution to compare shows, and allocate overhead only when reporting profit by room or period." },
      { q: "What is a good contribution per attendee?", a: "There is no universal benchmark; it depends on room size, genre and market. Compare like-for-like shows in your own rooms first, then improve the bottom of the range." },
    ],
    related: [
      { href: "/show-profitability", label: "How Per Cap measures show profitability" },
      { href: "/playbook/how-to-allocate-labor-and-security-to-a-show", label: "Allocating labor and security to a show" },
      { href: "/glossary/show-pnl", label: "What is a show P&L?" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "how-to-set-artist-offers-using-per-cap",
    title: "How should a venue set artist offers using per cap?",
    description: "Set guarantees from what a show earns the house, including bar and ancillary per cap, not ticket math alone.",
    answer:
      "Set the maximum guarantee from what the show will earn the house, not ticket math alone. Estimate attendance, multiply it by your real bar and ancillary per cap for that genre and night, add expected net box office, then subtract show costs and your target contribution. What remains is the most you should offer.",
    whoFor: "Talent buyers and owners at venue groups who make offers to artists and agents.",
    category: "Booking & deals",
    sections: [
      {
        heading: "Why ticket-only offers miss",
        paragraphs: [
          "Ticket math ignores what the crowd spends once inside. A heavy-drinking crowd can justify a bigger offer than the door supports, and a light-drinking crowd can lose money on an offer that looks safe on paper.",
        ],
      },
      {
        heading: "The offer guardrail",
        paragraphs: ["Use your own history for the per cap inputs, by genre and night, and update them after every settlement."],
        formula:
          "Maximum guarantee = expected net box office + (expected attendance × net ancillary per cap) − direct show costs − target contribution",
      },
      {
        heading: "Share risk with deal structure",
        paragraphs: [
          "When attendance is uncertain, a versus deal (a guarantee versus a percentage of net) keeps the guarantee inside the guardrail while sharing the upside with the artist.",
        ],
      },
    ],
    example: {
      title: "An 800-person Thursday in a 1,000-cap room",
      rows: [
        { label: "Expected net box office (800 × $30)", value: 24000, kind: "money" },
        { label: "Bar net (800 × $18)", value: 14400, kind: "money" },
        { label: "Facility fees and merch (800 × $2.50)", value: 2000, kind: "money" },
        { label: "Direct show costs", value: -9000, kind: "money" },
        { label: "Target contribution", value: -6000, kind: "money" },
      ],
      result: { label: "Maximum guarantee", value: 25400, kind: "money" },
      check: () => 800 * 30 === 24000 && 800 * 18 === 14400 && 800 * 2.5 === 2000 && 24000 + 14400 + 2000 - 9000 - 6000 === 25400,
      note: "Ticket math alone would cap the offer at $9,000. Illustrative figures.",
    },
    mistakes: [
      "Using one average per cap for every genre and night",
      "Ignoring walk-up risk when estimating attendance",
      "Forgetting that deposits leave cash weeks before the show",
      "Not updating per cap assumptions after each settlement",
    ],
    faqs: [
      { q: "Does this mean paying artists more?", a: "Sometimes. It means paying the right amount: more for crowds that spend, less for crowds that don't, with a clear ceiling either way." },
      { q: "How do versus deals fit in?", a: "Keep the guarantee at or under the guardrail and let the percentage share upside if the show outperforms." },
    ],
    related: [
      { href: "/playbook/what-drives-bar-per-cap", label: "What drives bar per cap" },
      { href: "/glossary/artist-guarantee", label: "What is an artist guarantee?" },
      { href: "/glossary/versus-deal", label: "What is a versus deal?" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "how-to-allocate-labor-and-security-to-a-show",
    title: "How do you allocate labor and security costs to a show?",
    description: "Allocate shifts and contracted security to shows by overlapping hours so every show carries the costs it caused.",
    answer:
      "Allocate labor to a show by the hours each shift overlaps that show's window, from doors to close. When one shift covers two shows, split it by overlapping hours. Security contracted for a specific event goes to that event. Keep salaried managers and overhead out of show contribution and report them separately.",
    whoFor: "Finance leads and GMs building show-level P&Ls across rooms.",
    category: "Show profitability",
    sections: [
      {
        heading: "Use time, not revenue",
        paragraphs: [
          "Allocating labor by each show's share of revenue hides the shows that are expensive to run. Allocate by the hours staff actually worked each show, then add your payroll burden rate so taxes and benefits are included.",
        ],
        formula: "Shift cost to a show = hourly cost × hours overlapping the show window × (1 + payroll burden rate)",
      },
      {
        heading: "Write the rules down",
        paragraphs: [
          "Document which roles count as direct show labor, how load-in and load-out crews are treated, and how double-bills are split. Consistent rules matter more than perfect ones, because they make shows comparable.",
        ],
      },
    ],
    example: {
      title: "An early and a late show on the same night",
      rows: [
        { label: "Six bartenders, 8-hour shifts at $22/hour", value: 1056, kind: "money" },
        { label: "Early show share (4 of 8 hours)", value: 528, kind: "money" },
        { label: "Late show share (4 of 8 hours)", value: 528, kind: "money" },
        { label: "Security contracted for the late show", value: 1800, kind: "money" },
      ],
      result: { label: "Late show labor and security", value: 2328, kind: "money" },
      check: () => 6 * 8 * 22 === 1056 && 1056 / 2 === 528 && 528 + 1800 === 2328,
      note: "Before payroll burden. Illustrative figures.",
    },
    mistakes: [
      "Allocating labor by revenue share",
      "Forgetting overtime and payroll burden",
      "Putting salaried managers into show costs",
      "Ignoring load-in and load-out crews",
    ],
    faqs: [
      { q: "What about staff who work across rooms?", a: "Allocate by the hours they spent in each room's show window. If the schedule doesn't record that, use the room they were rostered to and note the assumption." },
      { q: "Should door staff count as show labor?", a: "Yes. Box office, door and floor staff exist because of the show and belong in its contribution." },
    ],
    related: [
      { href: "/playbook/how-to-calculate-show-level-profitability", label: "How to calculate show-level profitability" },
      { href: "/services/show-profitability-audit", label: "Show Profitability Audit" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "13-week-cash-flow-forecast-for-venues",
    title: "How do you build a 13-week cash flow forecast for a music venue?",
    description: "Build a weekly cash forecast around artist deposits, guarantees, ticket settlement timing, payroll and debt service.",
    answer:
      "A 13-week cash forecast projects cash in and out week by week around your calendar. Map artist deposits and guarantee payouts to their due dates, ticket revenue to when your ticketing agreement releases it, and bar deposits to settlement days, then add payroll, rent and debt service. It shows tight weeks before they arrive.",
    whoFor: "Owners and finance leads at venue groups managing cash across rooms.",
    category: "Cash & lenders",
    sections: [
      {
        heading: "Why venues need a weekly view",
        paragraphs: [
          "Venues pay artist deposits weeks or months before a show, and some ticketing agreements hold funds until after the event. A monthly P&L can look healthy while a specific week runs short of cash.",
        ],
      },
      {
        heading: "What goes in each week",
        paragraphs: ["Build it from cash timing, not from the P&L."],
        list: [
          "Opening cash",
          "Ticket settlements released by your ticketing platform",
          "Bar and POS card deposits",
          "Artist deposits due for future shows",
          "Guarantees and settlement payouts for this week's shows",
          "Payroll, rent, debt service, insurance and vendors",
          "Closing cash, which becomes next week's opening cash",
        ],
      },
      {
        heading: "Keep it alive",
        paragraphs: ["Roll it forward every week, compare forecast to actual, and adjust assumptions where you missed."],
      },
    ],
    example: {
      title: "One week in a two-room group",
      rows: [
        { label: "Opening cash", value: 180000, kind: "money" },
        { label: "Ticket settlements received", value: 62000, kind: "money" },
        { label: "Bar and POS deposits", value: 48000, kind: "money" },
        { label: "Artist deposits for future shows", value: -40000, kind: "money" },
        { label: "Guarantees paid this week", value: -55000, kind: "money" },
        { label: "Payroll", value: -38000, kind: "money" },
        { label: "Rent and debt service", value: -22000, kind: "money" },
        { label: "Other vendors", value: -9000, kind: "money" },
      ],
      result: { label: "Closing cash", value: 126000, kind: "money" },
      check: () => 180000 + 62000 + 48000 - 40000 - 55000 - 38000 - 22000 - 9000 === 126000,
      note: "Illustrative figures.",
    },
    mistakes: [
      "Forecasting from the P&L instead of cash timing",
      "Ignoring ticket revenue holdbacks in your ticketing agreement",
      "Leaving out deposits for shows booked months ahead",
      "Building it once and never rolling it forward",
    ],
    faqs: [
      { q: "Why 13 weeks?", a: "Thirteen weeks is one quarter: long enough to see the deposits you are committing to now, short enough to forecast week by week with confidence." },
      { q: "Who should own it?", a: "Finance owns the model, but talent buyers should see it, because new offers and deposits change it immediately." },
    ],
    related: [
      { href: "/services/fractional-cfo", label: "Fractional CFO for venue groups" },
      { href: "/glossary/13-week-cash-flow", label: "What is a 13-week cash flow forecast?" },
      { href: "/glossary/artist-deposit", label: "What is an artist deposit?" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "private-rentals-vs-weak-weeknight-shows",
    title: "Should a venue book private rentals instead of weak weeknight shows?",
    description: "Compare weeknight shows and private rentals on contribution to decide which nights to rent out.",
    answer:
      "Compare a weak weeknight show and a private rental on contribution, not revenue. A rental fee plus a bar minimum often earns more, with less risk, than a show that misses its guarantee. Average the last six months of contribution for that night, price rentals to beat it, and keep some nights for developing artists.",
    whoFor: "Owners and talent buyers deciding how to fill Monday to Wednesday nights.",
    category: "Booking & deals",
    sections: [
      {
        heading: "Run the comparison",
        paragraphs: [
          "Pull every show on that night for the last six months and average their contribution. Then price a rental from its fee, expected bar net, and the labor and production it needs.",
        ],
        formula: "Rental contribution = rental fee + bar net − labor − production",
      },
      {
        heading: "Don't rent every weak night",
        paragraphs: [
          "Weeknight shows also develop artists who headline weekends later, and they keep a room in the scene's calendar. Decide how many nights a month you hold for development, and rent the rest when the numbers say so.",
        ],
      },
    ],
    example: {
      title: "A Tuesday in a 400-cap room",
      rows: [
        { label: "Average Tuesday show contribution", value: -598, kind: "money" },
        { label: "Private rental fee", value: 2500, kind: "money" },
        { label: "Rental bar net", value: 2574, kind: "money" },
        { label: "Rental labor", value: -900, kind: "money" },
        { label: "Rental production", value: -200, kind: "money" },
      ],
      result: { label: "Rental contribution", value: 3974, kind: "money" },
      check: () => 2500 + 2574 - 900 - 200 === 3974,
      note: "The rental beats the average show by $4,572 a night. Illustrative figures.",
    },
    mistakes: [
      "Comparing on revenue instead of contribution",
      "Renting without a bar minimum",
      "Underpricing rentals by ignoring staffing",
      "Giving up every developing-artist night",
    ],
    faqs: [
      { q: "How do we price a rental?", a: "Start from the contribution of the shows it replaces, add a margin for the risk you're removing, and set a bar minimum so a light-drinking event can't undercut it." },
      { q: "Will rentals hurt our reputation with agents?", a: "Not if you are deliberate about which nights you hold for shows. Agents care about reliable dates and fair settlements." },
    ],
    related: [
      { href: "/playbook/how-to-calculate-show-level-profitability", label: "How to calculate show-level profitability" },
      { href: "/show-profitability", label: "Show profitability method" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "how-to-read-a-show-settlement",
    title: "How do you read a show settlement?",
    description: "A line-by-line guide to show settlements: gross, net box office, show expenses, deal terms and the venue's share.",
    answer:
      "A show settlement reconciles one night's ticket revenue with the artist deal. It starts from gross ticket sales, removes taxes and fees to reach net box office, deducts agreed show expenses, then applies the deal: a guarantee, a percentage, or a versus. What's left is the venue's ticket share, before bar and other income.",
    whoFor: "Owners, GMs and settlement staff at venue groups.",
    category: "Booking & deals",
    sections: [
      {
        heading: "The order of a settlement",
        paragraphs: ["Settlements follow the same sequence, set by the deal memo."],
        list: [
          "Gross ticket sales",
          "Minus taxes and ticketing fees that aren't revenue: net box office",
          "Minus agreed show expenses (production, security, hospitality, marketing): net after expenses",
          "Apply the deal terms to find the artist payout",
          "Venue ticket share = net box office − artist payout (part of it reimburses show expenses)",
        ],
      },
      {
        heading: "Where money leaks",
        paragraphs: [
          "House costs that were incurred but left off the settlement, expense caps applied inconsistently across promoters, and deposits not deducted from the final payout.",
        ],
      },
    ],
    example: {
      title: "A $10,000 versus 85% deal",
      rows: [
        { label: "Gross ticket sales", value: 30000, kind: "money" },
        { label: "Taxes and fees", value: -3000, kind: "money" },
        { label: "Show expenses", value: -7000, kind: "money" },
        { label: "Net after expenses", value: 20000, kind: "money" },
        { label: "Artist payout: greater of $10,000 or 85% of $20,000", value: -17000, kind: "money" },
      ],
      result: { label: "Venue ticket share (including $7,000 expense reimbursement)", value: 10000, kind: "money" },
      check: () => 30000 - 3000 - 7000 === 20000 && Math.max(10000, (20000 * 85) / 100) === 17000 && 30000 - 3000 - 17000 === 10000,
      note: "Illustrative figures.",
    },
    mistakes: [
      "Not recovering house expenses the deal allows",
      "Applying expense caps differently by promoter",
      "Forgetting to deduct the deposit already paid",
      "Not reconciling the settlement to the ticketing report",
    ],
    faqs: [
      { q: "Who should check settlements?", a: "Someone other than the person who negotiated the deal, against the deal memo and the ticketing report, before payment." },
      { q: "Is the venue ticket share profit?", a: "No. Part of it reimburses show expenses. Profit comes after you add bar and other income and subtract all show costs." },
    ],
    related: [
      { href: "/glossary/show-settlement", label: "What is a show settlement?" },
      { href: "/glossary/versus-deal", label: "What is a versus deal?" },
      { href: "/playbook/how-to-calculate-show-level-profitability", label: "How to calculate show-level profitability" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "venue-loan-covenants-explained",
    title: "What loan covenants do music venues have to track?",
    description: "Debt service coverage and other loan covenants for venues, how they're calculated, and how to stay ahead of them.",
    answer:
      "Loan covenants are financial tests in your loan agreement that you must keep passing. Venues most often face a debt service coverage ratio, comparing cash earnings with loan payments, and sometimes leverage or minimum liquidity tests. Calculate them monthly from show-level results, using your agreement's definitions, so a slow season never surprises your lender.",
    whoFor: "Owners and finance leads at venue groups with bank or SBA debt.",
    category: "Cash & lenders",
    sections: [
      {
        heading: "Debt service coverage",
        paragraphs: [
          "Your agreement defines exactly what counts as cash available and debt service. Use its definitions, not your own, and test monthly on a trailing 12-month basis.",
        ],
        formula: "DSCR = cash available for debt service ÷ total debt service",
      },
      {
        heading: "Seasonality matters",
        paragraphs: [
          "A slow summer or a cancelled run of shows can push a trailing ratio below the minimum months later. A 13-week cash forecast and monthly show-level P&L give you warning while there's still time to act.",
        ],
      },
    ],
    example: {
      title: "Testing against an example 1.25x minimum",
      rows: [
        { label: "Cash available for debt service (trailing 12 months)", value: 780000, kind: "money" },
        { label: "Annual debt service", value: 600000, kind: "money" },
        { label: "Cash needed at an example 1.25x minimum", value: 750000, kind: "money" },
      ],
      result: { label: "DSCR", value: 1.3, kind: "ratio" },
      check: () => 780000 / 600000 === 1.3 && 1.25 * 600000 === 750000,
      note: "Headroom is $30,000 of annual cash flow. Your agreement sets the real minimum. Illustrative figures.",
    },
    mistakes: [
      "Using your own EBITDA definition instead of the agreement's",
      "Testing only at year-end",
      "Ignoring how deposits and guarantees shift cash between quarters",
      "Telling the lender late",
    ],
    faqs: [
      { q: "What happens if we break a covenant?", a: "It depends on your agreement. Lenders often prefer early notice and a plan; read your agreement and involve your attorney." },
      { q: "Can show-level data help with lenders?", a: "Yes. It explains why results moved and what you're changing, which is what lenders want to see." },
    ],
    related: [
      { href: "/glossary/dscr", label: "What is DSCR?" },
      { href: "/services/transaction-support", label: "Transaction support" },
      { href: "/playbook/13-week-cash-flow-forecast-for-venues", label: "13-week cash forecast for venues" },
    ],
    claimIds: [],
    drafted: "2026-11-23",
    certified: null,
  },
  {
    slug: "what-drives-bar-per-cap",
    title: "What drives bar per cap at a music venue?",
    description: "The demand and conversion factors that move bar per cap, and how to measure it by show type before setting targets.",
    answer:
      "Bar per cap is driven by who the crowd is and how easy you make it to buy. Genre, age, day of week and set times shape demand. Bar speed, staffing, menu, pricing and changeover length shape conversion. Measure per cap by show type from your own history before setting targets, because universal benchmarks mislead.",
    whoFor: "GMs and bar managers at venue groups.",
    category: "Operations",
    sections: [
      {
        heading: "Demand: who is in the room",
        paragraphs: ["Genre, age, day of week, ticket price and set times decide how much a crowd wants to drink. You influence these mainly through booking."],
      },
      {
        heading: "Conversion: how easy it is to buy",
        paragraphs: ["Fix friction before raising prices."],
        list: [
          "Wells open and staffed to forecast attendance",
          "A shorter menu during peaks",
          "Tap-to-pay and tabs",
          "Changeovers long enough to visit the bar",
        ],
      },
      {
        heading: "Why it matters so much",
        paragraphs: ["Small per-head changes compound across a calendar, which is why per cap belongs in every booking decision."],
      },
    ],
    example: {
      title: "What a per cap is worth",
      rows: [
        { label: "Sold-out attendance", value: 2000, kind: "count" },
        { label: "Bar per cap", value: 25, kind: "money" },
      ],
      result: { label: "Bar sales in one night", value: 50000, kind: "money" },
      check: () => 2000 * 25 === 50000,
      note: "Illustrative figures.",
    },
    mistakes: [
      "Using tickets sold instead of scanned attendance",
      "Raising prices before fixing bar speed",
      "Setting one per cap target for every genre",
    ],
    faqs: [
      { q: "Is there a standard bar per cap?", a: "No single figure applies across room sizes, genres and markets. Benchmark against your own like-for-like shows, and against peer groups only when the comparison set is large enough to be meaningful." },
      { q: "How fast can per cap improve?", a: "Conversion fixes like staffing and menu changes can show up the next weekend. Demand changes come through booking over a season." },
    ],
    related: [
      { href: "/glossary/per-cap", label: "What is per cap?" },
      { href: "/playbook/how-to-set-artist-offers-using-per-cap", label: "Setting artist offers from per cap" },
      { href: "/insights/how-to-raise-bar-per-cap-at-a-music-venue", label: "How to raise bar per cap" },
    ],
    claimIds: ["bar-night-50k"],
    drafted: "2026-11-23",
    certified: null,
  },
];

export const getPlaybookEntry = (slug: string) => playbook.find((p) => p.slug === slug);
export const isCertified = (e: PlaybookEntry) => e.certified !== null;
/** Entries visible to search engines and AI crawlers. */
export const publishedPlaybook = () => playbook.filter(isCertified);
