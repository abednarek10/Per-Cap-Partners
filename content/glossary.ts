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
    service: "revenue",
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
    service: "revenue",
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
    service: "cost-reduction",
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
    service: "cost-reduction",
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
    service: "cost-reduction",
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
    service: "revenue",
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
    service: "gtm-strategy",
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
    service: "gtm-strategy",
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
    service: "gtm-strategy",
  },
];

export const getTerm = (slug: string) => glossary.find((t) => t.slug === slug);
