export const steps = [
  {
    title: "Upload",
    summary: "Export reports from your ticketing, POS and accounting systems and upload them through the encrypted client portal.",
    detail: [
      "We send a checklist of exactly which reports to pull from each system: ticketing order exports, POS item and hourly sales, show settlements, P&L or general ledger, and recent tax filings.",
      "Files go straight to private, encrypted storage. Fan emails and phone numbers are tokenized during processing, and raw files are deleted afterwards.",
    ],
  },
  {
    title: "Analyze",
    summary: "Your data is cleaned, matched across systems and measured per attendee, show by show.",
    detail: [
      "Software standardizes formats from different platforms, matches ticket buyers to bar and merch spend using privacy-safe tokens, and builds per cap, cost-per-head and margin views by show, genre, night and promoter.",
    ],
  },
  {
    title: "Certify",
    summary: "A person reviews every finding against how your venue really runs, then signs off.",
    detail: [
      "Nothing is sent to you automatically. Every finding is checked for data quality, tested against your operating reality, and either certified, revised or discarded. Tax-related items are prepared for your CPA to confirm.",
    ],
  },
  {
    title: "Act",
    summary: "You get a short list of prioritized, dollar-sized recommendations and a monthly KPI pack.",
    detail: [
      "Each recommendation states the expected impact, the effort, who owns it and how we'll measure it. We review results monthly and reassess the plan, and the engagement, against the metrics agreed at kickoff.",
    ],
  },
] as const;
