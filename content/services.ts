import type { Offer } from "./offers";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  offerId: Offer["id"];
  name: string; // Schema.org Service name
  navLabel: string;
  title: string; // <title>
  h1: string;
  description: string; // meta description, <= ~160 chars
  answer: string; // 40-60 word answer-first summary
  whoFor: string;
  problems: string[];
  levers: { title: string; body: string }[];
  deliverables: string[];
  metrics: string[];
  faqs: Faq[];
  related: { href: string; label: string }[];
  disclaimer?: string;
};

export const services: Service[] = [
  {
    slug: "show-profitability-audit",
    offerId: "audit",
    name: "Show Profitability Audit",
    navLabel: "Show Profitability Audit",
    title: "Show Profitability Audit for Venue Groups",
    h1: "Find the shows that lose money",
    description:
      "A fixed-fee audit that rebuilds 12 months show by show across your rooms: settlement, bar, merch, labor and security. Find the shows that lose money and fix them.",
    answer:
      "A Show Profitability Audit rebuilds your last 12 months show by show, joining settlement, bar, merch, facility fees, labor and security across every room. You learn which shows lose money once everything is counted, why they lose it, and which booking, pricing and staffing changes fix it. Fixed fee, four to six weeks, certified by a CPA.",
    whoFor: "Independent venue groups running 2 to 10 rooms that book their own shows.",
    problems: [
      "Settlements live in booking software, bar sales in the POS and labor in payroll, so nobody sees one show's full P&L.",
      "A sold-out night can lose money after the guarantee and staffing, and a modest night can carry the week. Without the join, you can't tell which is which.",
      "Artist offers are set from ticket math alone, ignoring what that crowd actually spends at the bar.",
      "Ownership and lenders ask which rooms and nights carry the business, and the answer takes a week of spreadsheets.",
    ],
    levers: [
      { title: "Settlement rebuild", body: "Every show's deal, guarantee, versus split, deposits and house expenses, reconciled to what was actually paid out." },
      { title: "Bar and ancillary join", body: "POS sales assigned to each show's doors-to-close window, net of pour cost, plus merch commission and facility fees." },
      { title: "Labor and security allocation", body: "Shifts and security headcount allocated to the shows they worked, using rules you approve and can audit." },
      { title: "Decisions", body: "The shows that lose money, the nights and genres that drink, offers that are too high for the per cap you get, and nights better sold as private rentals." },
    ],
    deliverables: [
      "Show-level P&L for every show in the last 12 months, by room",
      "The shows that lose money once everything is counted, and why",
      "Bar per cap and contribution by genre, night and promoter",
      "Booking-offer guardrails based on your actual per cap",
      "Ranked action plan with dollar estimates, certified by a CPA",
    ],
    metrics: ["Show contribution", "Contribution per attendee", "Bar per cap", "Labor and security per head", "Break-even attendance", "Settlement recovery"],
    faqs: [
      { q: "What data do you need for the audit?", a: "Twelve months of show settlements from your booking software, POS sales with timestamps, payroll or scheduling exports for bar, floor and security staff, and your general ledger. Standard exports are enough; there are no integrations to set up." },
      { q: "Why a fixed fee instead of hourly?", a: "You should know the cost before we start. The fee is set from the number of rooms and shows in scope, and it doesn't change if the data turns out messier than expected." },
      { q: "What happens after the audit?", a: "You keep the show-level P&L and the action plan. Many groups move to the Fractional CFO service so the same view updates monthly, but there is no obligation." },
    ],
    related: [
      { href: "/show-profitability", label: "How show-level profitability works" },
      { href: "/playbook/how-to-calculate-show-level-profitability", label: "How to calculate show-level profitability" },
      { href: "/playbook/how-to-allocate-labor-and-security-to-a-show", label: "Allocating labor and security to a show" },
    ],
  },
  {
    slug: "fractional-cfo",
    offerId: "cfo",
    name: "Fractional CFO for Venue Groups",
    navLabel: "Fractional CFO",
    title: "Fractional CFO for Independent Venue Groups",
    h1: "A CFO for your rooms, without the full-time hire",
    description:
      "Monthly show-level P&L, a 13-week cash forecast built around deposits and guarantees, booking-offer guardrails, and lender and insurance reporting for venue groups.",
    answer:
      "Fractional CFO service for venue groups delivers monthly show-level P&L across your rooms, a 13-week cash forecast built around artist deposits and guarantees, booking-offer guardrails for your talent buyers, and lender and insurance reporting. You get CFO-level decisions and a CPA's sign-off without the cost of a full-time hire.",
    whoFor: "Venue groups running 2 to 10 rooms that have outgrown bookkeeping but can't justify a full-time CFO.",
    problems: [
      "Cash is tied up in artist deposits and guarantees weeks before ticket revenue settles, and nobody forecasts the gap.",
      "Talent buyers make offers without a clear ceiling based on what that show will actually earn the house.",
      "Lender covenant reporting and insurance renewals turn into a scramble every time.",
      "Ownership gets a P&L once a quarter, too late to change booking, staffing or pricing.",
    ],
    levers: [
      { title: "Monthly show-level P&L", body: "Every show, every room, every month: contribution after artist costs, bar, labor and security, with trends by night, genre and promoter." },
      { title: "13-week cash forecast", body: "Weekly cash built around deposit due dates, guarantee payouts, ticket settlement timing, payroll and debt service." },
      { title: "Booking-offer guardrails", body: "A maximum offer for each show based on expected attendance, your real per cap and a target margin, so buyers can move fast without guessing." },
      { title: "Lender and insurance reporting", body: "Covenant calculations, lender packages and the revenue and attendance data insurers ask for at renewal." },
    ],
    deliverables: [
      "Monthly show-level P&L pack by room",
      "Rolling 13-week cash forecast",
      "Booking-offer guardrail model for talent buyers",
      "Covenant and lender reporting",
      "Monthly review with ownership, certified by a CPA",
    ],
    metrics: ["Show contribution", "Weeks of cash", "Deposits outstanding", "Debt service coverage", "Contribution per attendee", "Offer-to-contribution ratio"],
    faqs: [
      { q: "How is this different from our bookkeeper or accountant?", a: "Your bookkeeper records transactions and your tax accountant files returns. A fractional CFO decides what to do next: which shows to book at what offer, how much cash you need and when, and what to tell ownership and lenders. We work alongside both." },
      { q: "Do we need to change our software?", a: "No. We work from exports of the booking, POS, payroll and accounting systems you already use." },
      { q: "Do you handle taxes?", a: "We prepare tax-efficiency findings for your CPA or tax attorney, who confirms what applies and files. We don't file returns." },
    ],
    related: [
      { href: "/playbook/13-week-cash-flow-forecast-for-venues", label: "Building a 13-week cash forecast for venues" },
      { href: "/playbook/how-to-set-artist-offers-using-per-cap", label: "Setting artist offers from per cap" },
      { href: "/compare/fractional-cfo-vs-controller-vs-bookkeeper", label: "Fractional CFO vs. controller vs. bookkeeper" },
    ],
    disclaimer:
      "Per Cap Partners does not provide legal or tax advice. Tax-related findings are prepared for review by your licensed CPA or tax attorney, who determines what applies to your business.",
  },
  {
    slug: "transaction-support",
    offerId: "transaction",
    name: "Venue Transaction Support",
    navLabel: "Transaction support",
    title: "Quality of Earnings and Lender Packages for Venue Deals",
    h1: "Know what a venue really earns before you buy, sell or refinance",
    description:
      "Show-level quality-of-earnings reviews and lender packages for venue acquisitions, sales and refinancing, prepared by a CPA who knows live music economics.",
    answer:
      "Transaction support gives buyers, sellers and lenders a show-level view of what a venue really earns. We review settlements, bar, labor and add-backs to normalize earnings, test how repeatable the calendar is, and prepare lender-ready packages, so a deal is priced on evidence rather than a single year's headline revenue.",
    whoFor: "Venue groups buying, selling, refinancing or opening a room.",
    problems: [
      "Headline revenue hides how much depends on a few big shows or one promoter.",
      "Add-backs and owner expenses are hard to verify without show-level data.",
      "Lenders want covenant-ready numbers, not a stack of POS reports.",
    ],
    levers: [
      { title: "Quality of earnings", body: "Normalized earnings rebuilt from show-level data, with add-backs tested and one-time items separated." },
      { title: "Calendar durability", body: "How much profit depends on specific artists, promoters, nights or seasons." },
      { title: "Lender packages", body: "Historical performance, forecasts and covenant headroom, prepared the way lenders read them." },
    ],
    deliverables: [
      "Quality-of-earnings report",
      "Normalized EBITDA bridge",
      "Lender-ready financial package",
    ],
    metrics: ["Normalized EBITDA", "Revenue concentration", "Contribution by room", "Debt service coverage"],
    faqs: [
      { q: "When should we start transaction support?", a: "As early as possible. A buyer or lender will ask for show-level detail, and preparing it before talks begin avoids delays and price chips." },
      { q: "Can you work for the buyer or the seller?", a: "Either, but not both on the same deal." },
    ],
    related: [
      { href: "/playbook/venue-loan-covenants-explained", label: "Venue loan covenants explained" },
      { href: "/glossary/quality-of-earnings", label: "What is quality of earnings?" },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
