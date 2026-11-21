export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string; // Schema.org Service name
  navLabel: string;
  title: string; // <title>
  h1: string;
  description: string; // meta description, <= ~155 chars
  answer: string; // 40-60 word answer-first summary for search + AI engines
  problems: string[];
  levers: { title: string; body: string }[];
  deliverables: string[];
  metrics: string[];
  faqs: Faq[];
  disclaimer?: string;
};

export const services: Service[] = [
  {
    slug: "revenue",
    name: "Venue Revenue Optimization",
    navLabel: "Revenue",
    title: "Music Venue Revenue Optimization: Raise Per Cap Spending",
    h1: "Raise revenue per head at every show",
    description:
      "Grow music venue revenue with per cap analysis of ticket pricing, fee mix, bar sales and merch. Human-certified recommendations from a fractional CFO.",
    answer:
      "Venue revenue optimization means increasing what each attendee spends, not just how many attend. Per Cap Partners joins your ticketing and point-of-sale data to find where per cap spending leaks (ticket tiers, fee structure, bar speed, menu mix, door-to-bar timing), then delivers certified, show-level recommendations your team can act on the next weekend.",
    problems: [
      "You know total bar sales, but not bar per cap by genre, night or promoter.",
      "Ticket tiers are set by gut feel, and sell-outs happen weeks early at prices that were too low.",
      "Platform fees, facility fees and ticket rebates are spread across settlements nobody reconciles.",
      "Merch, coat check, VIP and parking are run as afterthoughts instead of revenue lines.",
    ],
    levers: [
      { title: "Ticket pricing and tiering", body: "Price curves by artist draw and day of week, early-bird and late-tier structure, and sell-through pacing so you stop leaving money on sold-out nights." },
      { title: "Fee mix and rebates", body: "Facility fees, service charge splits and ticketing-platform rebates benchmarked against your contract, so every dollar you are owed is visible." },
      { title: "Bar and F&B per cap", body: "Spend per attendee by show type, hour and bar station. We find the menu, staffing and layout changes that move it." },
      { title: "Ancillary revenue", body: "Merch splits, VIP upgrades, sponsorship inventory and private-event demand, sized from your own data rather than industry averages." },
    ],
    deliverables: [
      "Per cap baseline by show, genre, promoter and day of week",
      "Ticket pricing and tier recommendations for the upcoming calendar",
      "Bar and F&B menu, pricing and staffing recommendations",
      "Quarterly revenue opportunity report, certified before delivery",
    ],
    metrics: ["Gross per cap", "Bar per cap", "Sell-through rate", "Average ticket price", "Fee revenue per ticket", "Ancillary revenue per show"],
    faqs: [
      { q: "What is a good bar per cap for a music venue?", a: "It depends on capacity, genre, ticket price and market, so a single benchmark misleads. We calculate your own per cap by show type first, then compare like-for-like nights to find the gap between your best and typical shows. That gap is usually the most realistic target." },
      { q: "Do you change our ticket prices for us?", a: "No. We recommend price points and tier structures with the reasoning behind them. You and your talent buyer decide, because you know the artist relationships." },
      { q: "Which ticketing and POS systems do you work with?", a: "Any system that can export CSV or Excel, including Ticketmaster, AXS, Eventbrite, DICE, Etix, Square, Toast and Clover. If you can download a report, we can use it." },
    ],
  },
  {
    slug: "cost-reduction",
    name: "Venue Cost Reduction",
    navLabel: "Cost reduction",
    title: "Music Venue Cost Reduction: Labor, COGS and Settlements",
    h1: "Cut costs without cutting the show",
    description:
      "Reduce music venue operating costs: day-of-show labor, pour cost, vendor contracts and settlement leakage, measured per head and certified by a fractional CFO.",
    answer:
      "Venue cost reduction starts with measuring cost per attendee, show by show. Per Cap Partners compares day-of-show labor, pour cost, production spend and vendor contracts against attendance and revenue, then flags the specific nights, roles and line items where you are overspending, with certified recommendations that protect the fan experience.",
    problems: [
      "Labor is scheduled from habit, not forecast attendance, so slow nights carry full-house staffing.",
      "Pour cost drifts upward and nobody knows whether it is pricing, waste or theft.",
      "Settlement sheets hide production, hospitality and house expenses that are never recovered.",
      "Vendor, insurance and service contracts auto-renew without a market check.",
    ],
    levers: [
      { title: "Day-of-show labor", body: "Staffing models built from advance ticket sales and historical walk-up, so security, bar and box office scale to the actual crowd." },
      { title: "Pour cost and COGS", body: "Variance between theoretical and actual pour cost by product and station, plus menu engineering to protect margin." },
      { title: "Settlement leakage", body: "Line-by-line review of show settlements to find unrecovered house expenses, hospitality overages and inconsistent deal terms." },
      { title: "Fixed-cost review", body: "Insurance, utilities, ticketing contracts, POS and payment processing benchmarked and renegotiation-ready." },
    ],
    deliverables: [
      "Cost-per-head baseline for labor, COGS and production",
      "Labor scheduling model tied to advance sales",
      "Settlement audit with recoverable-expense findings",
      "Vendor and contract renegotiation brief",
    ],
    metrics: ["Labor cost per attendee", "Pour cost %", "Production cost per show", "Settlement recovery rate", "Payment processing rate"],
    faqs: [
      { q: "Will cost cutting hurt the fan or artist experience?", a: "Every recommendation is reviewed against fan-facing impact before it is certified. The aim is to remove spend that nobody notices, such as overstaffed slow nights or unrecovered settlement costs, not to cut hospitality or sound." },
      { q: "How do you find settlement leakage?", a: "We compare your settlement sheets against your deal memos and actual expenses, show by show, and list every house cost that was incurred but not recovered or charged inconsistently between promoters." },
    ],
  },
  {
    slug: "tax-efficiency",
    name: "Venue Tax Efficiency Planning",
    navLabel: "Tax efficiency",
    title: "Tax Efficiency for Music Venues: Depreciation, Sales Tax, Structure",
    h1: "Keep more of what the room earns",
    description:
      "Tax efficiency planning for music venues: depreciation of build-outs and sound gear, sales tax on tickets and F&B, entity structure. Coordinated with your CPA.",
    answer:
      "Tax efficiency for a music venue means timing and structuring spend so it is taxed as favorably as the law allows. Per Cap Partners reviews capital purchases (sound, lighting, build-outs), sales and amusement tax handling, entity structure and available credits, then prepares findings for your CPA or tax attorney to confirm and file.",
    problems: [
      "Sound, lighting and renovation spend is depreciated slowly by default, with no review of faster options.",
      "Ticket, admission and F&B sales tax rules differ by city and state, and are often over- or under-collected.",
      "The entity structure was set up when the venue opened and has not been revisited since.",
      "No one is tracking credits, incentives or grants the venue may qualify for.",
    ],
    levers: [
      { title: "Capital purchase timing", body: "Review of production gear, build-outs and equipment purchases for depreciation strategy, which you then confirm with your CPA." },
      { title: "Sales and amusement tax", body: "Mapping of how tickets, fees, F&B and merch are taxed in your jurisdiction, compared against what your systems actually collect." },
      { title: "Entity and owner structure", body: "Questions to bring to your tax advisor about how the business, real estate and owner compensation are structured." },
      { title: "Credits and incentives", body: "A watch list of federal, state and local programs relevant to live-venue operators, checked against your eligibility." },
    ],
    deliverables: [
      "Tax-efficiency findings memo, prepared for your CPA",
      "Sales tax collection reconciliation",
      "Capital expenditure schedule with timing considerations",
      "Credits and incentives eligibility checklist",
    ],
    metrics: ["Effective tax rate", "Sales tax variance", "Capex by asset class", "Credits identified"],
    faqs: [
      { q: "Are you a CPA firm? Do you file our taxes?", a: "No. We are a fractional CFO service. We find and document tax-efficiency opportunities from your operating data, then hand a findings memo to your CPA or tax attorney, who confirms what applies and files." },
      { q: "What tax opportunities are common for venues?", a: "Common review areas are how sound, lighting and renovation costs are depreciated, how admissions and F&B sales tax are collected, owner compensation and entity structure, and local incentive programs. Which ones apply depends entirely on your situation and must be confirmed by a licensed tax professional." },
    ],
    disclaimer:
      "Per Cap Partners does not provide legal or tax advice. Tax-related findings are prepared for review by your licensed CPA or tax attorney, who determines what applies to your business.",
  },
  {
    slug: "gtm-strategy",
    name: "Venue Go-to-Market and Operating Strategy",
    navLabel: "GTM & operations",
    title: "Music Venue Marketing and Operating Strategy from Fan Data",
    h1: "Know your fans. Plan the calendar around them.",
    description:
      "Fan-data-driven go-to-market and operating strategy for music venues: fan segments, calendar mix, marketing ROI, KPIs and monthly CFO reporting.",
    answer:
      "Venue go-to-market strategy uses your own fan data to decide which shows to book, how to price and promote them, and where to spend marketing. Per Cap Partners segments your ticket buyers by frequency, genre and spend, measures marketing return per channel, and delivers a certified operating plan with monthly CFO-level KPI reporting.",
    problems: [
      "You can't say how many of last month's buyers were repeat fans, or what they are worth.",
      "Marketing spend is split across channels with no link to tickets sold.",
      "The calendar mix (genres, nights, promoters, private events) is set without margin data.",
      "Ownership gets a P&L once a quarter, too late to change anything.",
    ],
    levers: [
      { title: "Fan segmentation", body: "First-timers, regulars and superfans, by genre and spend, built from privacy-safe tokens so you can measure loyalty without storing raw personal data." },
      { title: "Calendar and booking mix", body: "Contribution margin by genre, night, promoter and deal type, so booking decisions carry financial context." },
      { title: "Marketing ROI", body: "Cost per ticket sold by channel and campaign, plus pre-sale and on-sale timing analysis." },
      { title: "CFO reporting cadence", body: "Monthly KPI pack, cash-flow forecast and budget-versus-actual, written for owners and GMs rather than accountants." },
    ],
    deliverables: [
      "Fan segment profiles and repeat-attendance analysis",
      "Calendar mix and contribution margin review",
      "Marketing channel ROI report",
      "Monthly KPI pack and 13-week cash-flow forecast",
    ],
    metrics: ["Repeat fan rate", "Fan lifetime value", "Cost per ticket sold", "Contribution margin per show", "13-week cash position"],
    faqs: [
      { q: "Do you replace our marketing team or talent buyer?", a: "No. We give them better numbers. Your buyer still books the talent, and your marketing team still runs campaigns. We show which shows, fans and channels actually make money." },
      { q: "How do you handle fan personal data?", a: "Emails and phone numbers are converted into one-way tokens when your file is processed, before anything is stored. We can recognise a returning fan across shows without keeping their raw contact details." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
