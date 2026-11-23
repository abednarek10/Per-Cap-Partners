import { site } from "@/lib/site";

/** How an engagement runs, from the free snapshot to monthly CFO work. */
export const steps = [
  {
    title: "Snapshot",
    summary: `Send about 90 days of settlements and bar sales for one room. Within ${site.snapshotTurnaround} you see your most and least profitable shows. Free.`,
    detail: [
      "The snapshot shows the method on your own numbers: contribution by show after the artist settlement and bar, plus bar per cap by night and genre for that room.",
    ],
  },
  {
    title: "Collect",
    summary: "For an audit, export 12 months of settlements, POS sales, payroll or scheduling, and your general ledger. No integrations required.",
    detail: [
      "We send a checklist of the exact reports to pull from your booking, POS, payroll and accounting systems. Files are encrypted on arrival, and fan names, emails and phone numbers are stripped at intake.",
    ],
  },
  {
    title: "Rebuild",
    summary: "Every show is rebuilt: settlement, bar, merch, facility fees, labor and security joined to the night they belong to.",
    detail: [
      "POS sales are matched to each show's doors-to-close window. Shifts and security are allocated by the hours they worked each show, using rules you approve. Every figure traces back to the row it came from.",
    ],
  },
  {
    title: "Certify",
    summary: "A CPA reviews every finding against how your rooms actually run, then signs off. Nothing reaches you unchecked.",
    detail: [
      "AI drafts findings from the show-level data. Each one is checked for data quality and tested against your operating reality before it is certified, revised or discarded.",
    ],
  },
  {
    title: "Decide",
    summary: "You get the shows that lose money, why, and what to change. With Fractional CFO, the same view updates every month.",
    detail: [
      "Recommendations cover booking offers, pricing, staffing and which nights to sell as private rentals, each with a dollar estimate and an owner. Fractional CFO clients also get a 13-week cash forecast and lender reporting.",
    ],
  },
] as const;
