import type { Faq } from "./services";

/**
 * Comparison pages (the CONTEST part of AEO): address the alternatives buyers actually consider,
 * with honest trade-offs. Rules: never misstate a competitor's product, describe categories rather
 * than attacking vendors, and say when an alternative is the better choice.
 */
export type Comparison = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  answer: string; // 40-60 words
  whoFor: string;
  options: { name: string; bestFor: string; strengths: string[]; limits: string[] }[];
  verdict: string;
  faqs: Faq[];
  related: { href: string; label: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: "fractional-cfo-vs-controller-vs-bookkeeper",
    title: "Fractional CFO vs. Controller vs. Bookkeeper for Venue Groups",
    h1: "Fractional CFO, controller or bookkeeper: which does a venue group need?",
    description: "What a bookkeeper, controller and fractional CFO each do for a venue group, what they cost in practice, and when each is the right hire.",
    answer:
      "A bookkeeper records transactions, a controller makes sure the books are accurate and closed on time, and a CFO decides what to do with the numbers. Most venue groups with 2 to 10 rooms need a reliable bookkeeper plus CFO-level judgment on booking, cash and lenders, which a fractional CFO provides without a full-time salary.",
    whoFor: "Owners of venue groups deciding how to staff their finance function.",
    options: [
      {
        name: "Bookkeeper",
        bestFor: "Recording transactions, reconciling accounts and paying bills",
        strengths: ["Essential foundation for every venue", "Affordable, often part-time or outsourced"],
        limits: ["Doesn't build show-level P&Ls or cash forecasts", "Not expected to advise on booking or lenders"],
      },
      {
        name: "Controller",
        bestFor: "Accurate monthly close, controls and reporting across entities",
        strengths: ["Clean, timely books across rooms", "Strong internal controls"],
        limits: ["Usually focused on accuracy, not booking strategy", "A full-time controller is a significant fixed cost"],
      },
      {
        name: "Fractional CFO",
        bestFor: "Show profitability, cash forecasting, offer guardrails and lender reporting",
        strengths: ["CFO-level decisions without a full-time salary", "Works alongside your bookkeeper and tax accountant"],
        limits: ["Shared attention, not in the building every day", "Depends on clean bookkeeping underneath"],
      },
    ],
    verdict:
      "Keep a good bookkeeper. Add a controller when multi-entity close and controls become the bottleneck. Add a fractional CFO when the questions are about which shows to book, how much cash you need and what to tell ownership and lenders.",
    faqs: [
      { q: "Can a fractional CFO replace our bookkeeper?", a: "No. A fractional CFO depends on accurate books. The two roles work together." },
      { q: "When is a full-time CFO worth it?", a: "When the finance decisions are constant enough to fill a full-time role, often at larger groups or during rapid expansion." },
    ],
    related: [
      { href: "/services/fractional-cfo", label: "Fractional CFO for venue groups" },
      { href: "/glossary/fractional-cfo", label: "What is a fractional CFO?" },
    ],
  },
  {
    slug: "spreadsheets-vs-show-profitability-platform",
    title: "Spreadsheets vs. a Show Profitability Platform for Venues",
    h1: "Can you track show profitability in spreadsheets?",
    description: "The trade-offs of spreadsheets, BI tools and a dedicated show profitability service for joining settlement, POS and labor data per show.",
    answer:
      "You can track show profitability in spreadsheets, and many venues start there. The hard part isn't the math; it's joining settlement, POS and labor exports every month, applying the same allocation rules every time, and keeping an audit trail. Spreadsheets suit one room. Groups usually outgrow them as rooms and shows multiply.",
    whoFor: "Finance leads at venue groups choosing how to build show-level reporting.",
    options: [
      {
        name: "Spreadsheets",
        bestFor: "One room, a motivated owner, a few shows a week",
        strengths: ["Free and flexible", "Easy to start this week"],
        limits: ["Manual joins every month", "Formulas break silently", "Hard to audit or hand off"],
      },
      {
        name: "General BI tools",
        bestFor: "Groups with in-house data skills",
        strengths: ["Powerful dashboards", "Connects many sources"],
        limits: ["Someone still has to model show P&L and allocation rules", "Needs ongoing data engineering"],
      },
      {
        name: "Per Cap Partners",
        bestFor: "Groups that want show-level P&L done to a consistent, audited method",
        strengths: ["Built around the show P&L and venue data", "Every number traceable to its source row", "Certified by a CPA"],
        limits: ["A paid service, starting with a free snapshot", "Works from exports today; live integrations come later"],
      },
    ],
    verdict:
      "If you have one room and time on Sunday nights, a spreadsheet is fine. If you run several rooms, need the same answer every month and need numbers ownership and lenders trust, use a method that's consistent, auditable and certified.",
    faqs: [
      { q: "Can we keep our spreadsheets?", a: "Yes. Many clients keep their own models and use our show-level data as the input." },
      { q: "Do you replace our accounting system?", a: "No. Your accounting system stays the book of record; we build show-level analysis on top of it." },
    ],
    related: [
      { href: "/show-profitability", label: "How show profitability is measured" },
      { href: "/snapshot", label: "Free show profitability snapshot" },
    ],
  },
  {
    slug: "booking-software-and-per-cap",
    title: "Venue Booking Software and Per Cap Partners: How They Fit Together",
    h1: "Do you need Per Cap if you already have booking software?",
    description: "Booking and settlement platforms, POS and payroll each hold part of a show's P&L. Here's how Per Cap joins them without replacing any of them.",
    answer:
      "Yes, if you want to know what each show earns. Booking and settlement platforms such as Prism.fm manage holds, offers and settlements; your POS holds bar sales; payroll holds labor. Each sees part of the show. Per Cap joins all three per show, so you keep your booking software and gain the full show P&L.",
    whoFor: "Venue groups already using booking, POS and payroll software.",
    options: [
      {
        name: "Booking and settlement software",
        bestFor: "Calendar, holds, offers, deal terms and settlements",
        strengths: ["The source of truth for deals and settlements", "Built for talent buyers"],
        limits: ["Bar sales and labor usually live in other systems"],
      },
      {
        name: "POS and payroll",
        bestFor: "Bar transactions, staffing and payroll",
        strengths: ["Accurate transaction and shift data"],
        limits: ["Not organized by show or deal"],
      },
      {
        name: "Per Cap Partners",
        bestFor: "Joining all three into a show-level P&L and acting on it",
        strengths: ["Works from exports of the tools you already use", "Adds cash forecasting, offer guardrails and lender reporting"],
        limits: ["Not a booking tool; keep yours"],
      },
    ],
    verdict: "Keep your booking software, POS and payroll. Per Cap sits on top and turns their exports into show-level decisions.",
    faqs: [
      { q: "Which booking tools do you work with?", a: "Any that can export settlements and show details, including dedicated booking platforms and spreadsheets." },
      { q: "Do you integrate directly?", a: "Today we work from exports. Direct integrations are on the roadmap." },
    ],
    related: [
      { href: "/show-profitability", label: "Show profitability method" },
      { href: "/playbook/how-to-read-a-show-settlement", label: "How to read a show settlement" },
    ],
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
