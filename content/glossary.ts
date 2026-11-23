export type Term = {
  slug: string;
  term: string;
  definition: string; // one-sentence, quotable definition
  body: string[]; // short explanatory paragraphs
  formula?: string;
  example?: string;
  related: string[]; // slugs
  service?: string; // related service slug
};

export const glossary: Term[] = [
  {
    slug: "per-cap",
    term: "Per cap",
    definition:
      "Per cap (per capita spending) is the average amount each attendee spends at a venue during an event, usually reported separately for bar/F&B, merchandise and total spend.",
    formula: "Per cap = revenue from a category ÷ number of attendees (scanned tickets, not tickets sold)",
    example: "A show with 400 scanned attendees and $9,200 in bar sales has a bar per cap of $23.",
    body: [
      "Per cap is the single most useful number for comparing shows of different sizes. Total bar sales rise with attendance, but per cap shows how well the venue converts each person in the room into revenue.",
      "Use scanned attendance rather than tickets sold. No-shows and comps change the denominator, and mixing the two makes per cap look better or worse than it is.",
      "Per cap varies by genre, day of week, door time, set length and bar speed, so compare like-for-like shows before setting targets.",
    ],
    related: ["ancillary-revenue", "pour-cost", "fan-lifetime-value"],
    service: "show-profitability-audit",
  },
  {
    slug: "ancillary-revenue",
    term: "Ancillary revenue",
    definition:
      "Ancillary revenue is all venue income that is not the face value of a ticket, including bar and food sales, ticket fees, merchandise commission, VIP upgrades, coat check, parking, sponsorship and private events.",
    body: [
      "For many independent venues, ancillary revenue is where the profit is. Ticket face value often flows largely to the artist, while bar sales and fees stay with the house.",
      "Tracking ancillary revenue per attendee, per show, shows which nights carry the business and which only look busy.",
    ],
    related: ["per-cap", "facility-fee", "show-settlement"],
    service: "show-profitability-audit",
  },
  {
    slug: "show-settlement",
    term: "Show settlement",
    definition:
      "A show settlement is the end-of-night accounting between a venue or promoter and an artist that reconciles ticket revenue, agreed expenses and the artist's guarantee or percentage of the door.",
    body: [
      "Settlements apply the deal memo: guarantee, versus deal, backend percentage, and which house expenses can be deducted before the split.",
      "Settlement leakage happens when real house costs (production, hospitality, security, credit card fees) are incurred but not recovered, or are charged inconsistently from one show to the next.",
    ],
    related: ["versus-deal", "ancillary-revenue"],
    service: "show-profitability-audit",
  },
  {
    slug: "versus-deal",
    term: "Versus deal",
    definition:
      "A versus deal pays the artist the greater of a guaranteed amount or an agreed percentage of net box office receipts after approved expenses.",
    example: "$2,500 vs. 85% of net: if net box office after expenses is $5,000, the artist receives $4,250 because 85% of net beats the guarantee.",
    body: [
      "Versus deals share upside with the artist while protecting them on soft nights. The venue's margin depends on how accurately expenses are defined and recovered in settlement.",
    ],
    related: ["show-settlement"],
    service: "show-profitability-audit",
  },
  {
    slug: "pour-cost",
    term: "Pour cost",
    definition:
      "Pour cost is the cost of the liquor, beer or wine used in a drink, expressed as a percentage of that drink's selling price.",
    formula: "Pour cost % = cost of product used ÷ revenue from that product × 100",
    body: [
      "Comparing theoretical pour cost (what recipes and prices say it should be) with actual pour cost (from inventory counts) shows how much is lost to over-pouring, waste, comps or theft.",
      "Venues often track pour cost monthly. Tracking it by show type shows whether certain nights or bar stations drive the variance.",
    ],
    related: ["per-cap"],
    service: "show-profitability-audit",
  },
  {
    slug: "facility-fee",
    term: "Facility fee",
    definition:
      "A facility fee is a per-ticket charge that goes to the venue, typically for building upkeep and capital improvements, and is usually kept outside the artist's box office split.",
    body: [
      "Facility fees, service charges and ticketing-platform rebates together form a venue's fee revenue. They are often split across contracts and settlement reports, which makes them easy to under-count.",
    ],
    related: ["ancillary-revenue", "show-settlement"],
    service: "show-profitability-audit",
  },
  {
    slug: "fan-lifetime-value",
    term: "Fan lifetime value",
    definition:
      "Fan lifetime value (fan LTV) is the total revenue a single fan is expected to generate for a venue across all the shows they attend, including tickets, fees and in-venue spending.",
    body: [
      "Fan LTV shows which genres and promoters bring in fans who come back. A show with a modest gross that converts first-timers into regulars can be worth more than a one-off sell-out.",
      "Fan LTV can be measured without storing raw personal data by matching privacy-safe tokens across ticketing and point-of-sale records.",
    ],
    related: ["per-cap", "repeat-fan-rate"],
    service: "fractional-cfo",
  },
  {
    slug: "repeat-fan-rate",
    term: "Repeat fan rate",
    definition:
      "Repeat fan rate is the share of a venue's ticket buyers in a period who have bought tickets to at least one earlier show at that venue.",
    formula: "Repeat fan rate = buyers with a prior purchase ÷ total unique buyers in the period",
    body: [
      "A rising repeat fan rate means the venue is building a loyal audience, which lowers marketing cost per ticket and makes the calendar easier to fill.",
    ],
    related: ["fan-lifetime-value"],
    service: "fractional-cfo",
  },
  {
    slug: "fractional-cfo",
    term: "Fractional CFO",
    definition:
      "A fractional CFO is an experienced chief financial officer who works part-time for several businesses, providing strategic finance leadership without the cost of a full-time executive.",
    body: [
      "For a music venue, a fractional CFO typically owns financial reporting, cash-flow forecasting, budgeting, pricing strategy, cost control and coordination with the venue's CPA.",
      "It suits independent venues that have outgrown bookkeeping-only support but cannot justify a six-figure finance hire.",
    ],
    related: ["per-cap", "show-settlement"],
    service: "fractional-cfo",
  },
  {
    slug: "artist-guarantee",
    term: "Artist guarantee",
    definition:
      "An artist guarantee is the minimum fee a venue or promoter agrees to pay an artist for a show, regardless of how many tickets sell.",
    body: [
      "Guarantees put the attendance risk on the venue. When a show undersells, the guarantee can exceed the venue's share of ticket revenue, and only bar and other income can make the show profitable.",
      "Setting guarantees from expected bar and ancillary per cap, not ticket sales alone, keeps offers inside what each show can earn.",
    ],
    related: ["versus-deal", "artist-deposit", "show-break-even"],
    service: "fractional-cfo",
  },
  {
    slug: "artist-deposit",
    term: "Artist deposit",
    definition:
      "An artist deposit is a portion of the guarantee paid in advance, often when the deal is signed, and deducted from the artist's payout at settlement.",
    body: [
      "Deposits move cash out of the business weeks or months before the show earns anything, which is why venue cash forecasts are built around deposit due dates.",
    ],
    related: ["artist-guarantee", "13-week-cash-flow", "show-settlement"],
    service: "fractional-cfo",
  },
  {
    slug: "show-break-even",
    term: "Show break-even",
    definition:
      "Show break-even is the attendance at which a show's revenue, including bar and other income, covers the artist payout and every direct cost of the show.",
    formula: "Break-even attendance = fixed show costs ÷ contribution per attendee before fixed costs",
    body: [
      "Break-even that counts only tickets overstates the attendance a show needs at heavy-drinking shows and understates it at light-drinking ones.",
    ],
    related: ["show-pnl", "contribution-margin", "artist-guarantee"],
    service: "show-profitability-audit",
  },
  {
    slug: "show-pnl",
    term: "Show P&L",
    definition:
      "A show P&L is a profit and loss statement for a single show: the venue's ticket share, bar and other income, minus the labor, security and production that show required.",
    body: [
      "The inputs live in different systems: the settlement in booking software, bar sales in the POS, labor in payroll. Joining them per show is what makes shows comparable across nights and rooms.",
    ],
    related: ["contribution-margin", "show-settlement", "per-cap"],
    service: "show-profitability-audit",
  },
  {
    slug: "contribution-margin",
    term: "Contribution margin",
    definition:
      "Contribution margin is what a show or product earns after the costs it directly caused, before fixed overhead such as rent and salaries.",
    formula: "Contribution margin = revenue − direct (variable) costs",
    body: [
      "Booking decisions should use contribution because overhead doesn't change with one more or one fewer show. A show with positive contribution helps pay the rent even if it doesn't look profitable after overhead.",
    ],
    related: ["show-pnl", "show-break-even"],
    service: "show-profitability-audit",
  },
  {
    slug: "dscr",
    term: "Debt service coverage ratio (DSCR)",
    definition:
      "The debt service coverage ratio compares the cash a business generates with the loan payments it must make, and is the most common covenant in venue loans.",
    formula: "DSCR = cash available for debt service ÷ total debt service",
    body: [
      "Your loan agreement defines exactly what counts as cash available and debt service, and sets the minimum ratio you must maintain.",
    ],
    related: ["13-week-cash-flow", "quality-of-earnings"],
    service: "fractional-cfo",
  },
  {
    slug: "13-week-cash-flow",
    term: "13-week cash flow forecast",
    definition:
      "A 13-week cash flow forecast projects a business's cash receipts and payments week by week for the next quarter, so cash shortfalls are visible before they happen.",
    body: [
      "For venues, the forecast is built around artist deposits, guarantee payouts, when ticket revenue is released, bar deposits, payroll and debt service.",
    ],
    related: ["artist-deposit", "dscr"],
    service: "fractional-cfo",
  },
  {
    slug: "quality-of-earnings",
    term: "Quality of earnings",
    definition:
      "A quality-of-earnings review tests how much of a business's reported profit is real, recurring and likely to continue, typically before an acquisition, sale or refinancing.",
    body: [
      "For a venue, it examines add-backs, one-time items and how much profit depends on specific artists, promoters, rooms or seasons.",
    ],
    related: ["dscr", "contribution-margin"],
    service: "transaction-support",
  },
];

export const getTerm = (slug: string) => glossary.find((t) => t.slug === slug);
