import { site, founderDisplayName } from "@/lib/site";
import { getOffer, priceLabel } from "./offers";
import type { Faq } from "./services";

export const generalFaqs: Faq[] = [
  {
    q: "What does Per Cap Partners do?",
    a: `${site.name} shows independent venue groups which shows make money once the bar, labor and security are counted. We join settlement, POS and payroll data for every show, then deliver CPA-certified profitability analysis, cash forecasts built around deposits and guarantees, booking-offer guardrails, and lender reporting.`,
  },
  {
    q: "Who is Per Cap built for?",
    a: "Independent operator groups running 2 to 10 rooms that book their own shows and have CFO-sized questions, like cash tied up in deposits, lender covenants, insurance renewals and expansion, but can't justify a full-time CFO.",
  },
  {
    q: "How much does it cost?",
    a: `The show profitability snapshot is free. The Show Profitability Audit is a fixed fee, ${priceLabel(getOffer("audit").price).toLowerCase()}. Fractional CFO is ${priceLabel(getOffer("cfo").price).toLowerCase()}. Transaction support is priced per deal.`,
  },
  {
    q: "What is show-level profitability?",
    a: "It's what one show earns the venue after every cost that show caused: the venue's share of ticket revenue after the artist settlement, plus bar net of pour cost and other show income, minus that night's labor, security and production.",
  },
  {
    q: "Who certifies the findings?",
    a: `${founderDisplayName()}, formerly of ${site.founder.formerEmployers.join(" and ")}. AI drafts findings from your data, and a CPA reviews each one against how your rooms actually run before it is certified.`,
  },
  {
    q: "What data do you need?",
    a: "Standard exports you already have: settlements from your booking software, POS sales with timestamps, payroll or scheduling for bar, floor and security staff, and your general ledger. For the free snapshot, 90 days of settlements and bar sales for one room is enough.",
  },
  {
    q: "Do we have to change our booking or POS software?",
    a: "No. We work from exports of the tools you already use and join them by show. Your booking software stays the source of truth for deals and settlements.",
  },
  {
    q: "How do you handle fan data?",
    a: "Fan names, emails and phone numbers are stripped when a file arrives, so we never store them. The rest of each file is kept encrypted so every number can be traced to its source row.",
  },
  {
    q: "Do you share our numbers with other clients?",
    a: "Never individually. If you opt in, your data can contribute to anonymized benchmarks that are published only when at least five venues contribute to a figure, and you see how you compare.",
  },
];
