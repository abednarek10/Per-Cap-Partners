import { formatUsd, site } from "@/lib/site";

export type OfferPrice =
  | { type: "free" }
  | { type: "from"; amount: number; unit: "fixed" | "month" }
  | { type: "request" };

export type Offer = {
  id: "snapshot" | "audit" | "cfo" | "transaction";
  name: string;
  href: string;
  price: OfferPrice;
  timeline: string;
  summary: string;
  includes: string[];
  bestFor: string;
  cta: string;
};

/** The offer ladder. Prices are "starting at" only, by decision. */
export const offers: Offer[] = [
  {
    id: "snapshot",
    name: "Show Profitability Snapshot",
    href: "/snapshot",
    price: { type: "free" },
    timeline: `Within ${site.snapshotTurnaround} of your upload`,
    summary: "Upload about 90 days of settlements and bar sales for one room. See your most and least profitable shows once the bar is counted.",
    includes: [
      "Top and bottom shows by contribution, after artist costs and bar",
      "Bar per cap by night and genre for that room",
      "Three questions worth answering in a full audit",
    ],
    bestFor: "Seeing the method on your own numbers before committing",
    cta: "Get my free snapshot",
  },
  {
    id: "audit",
    name: "Show Profitability Audit",
    href: "/services/show-profitability-audit",
    price: { type: "from", amount: 10000, unit: "fixed" },
    timeline: "4–6 weeks, fixed fee",
    summary: "We rebuild the last 12 months show by show across every room and deliver the shows that lose money and what to change.",
    includes: [
      "Show-level P&L for every show in the last 12 months",
      "Settlement, bar, merch, facility fees, labor and security joined per show",
      "The shows that lose money, and why",
      "Booking, pricing and staffing changes ranked by dollar impact",
      "Certified by a CPA",
    ],
    bestFor: "Groups that want a definitive baseline and a plan",
    cta: "Talk about an audit",
  },
  {
    id: "cfo",
    name: "Fractional CFO",
    href: "/services/fractional-cfo",
    price: { type: "from", amount: 3000, unit: "month" },
    timeline: "Monthly, ongoing",
    summary: "Monthly show-level P&L across your rooms, a 13-week cash forecast built around deposits and guarantees, booking-offer guardrails, and lender and insurance reporting.",
    includes: [
      "Monthly show-level P&L by room, genre, night and promoter",
      "13-week cash forecast built around artist deposits and guarantees",
      "Booking-offer guardrails your talent buyers can use",
      "Lender covenant and insurance renewal reporting",
      "Monthly review with ownership",
    ],
    bestFor: "Groups that need CFO-level decisions without a full-time CFO",
    cta: "Talk about fractional CFO",
  },
  {
    id: "transaction",
    name: "Transaction support",
    href: "/services/transaction-support",
    price: { type: "request" },
    timeline: "Per transaction",
    summary: "Quality-of-earnings reviews and lender packages when a venue is bought, sold or refinanced.",
    includes: [
      "Show-level quality-of-earnings analysis",
      "Normalized EBITDA and add-back review",
      "Lender-ready financial packages",
    ],
    bestFor: "Acquisitions, sales, refinancing and new rooms",
    cta: "Ask about transaction support",
  },
];

export const getOffer = (id: Offer["id"]) => offers.find((o) => o.id === id)!;

export function priceLabel(p: OfferPrice): string {
  if (p.type === "free") return "Free";
  if (p.type === "request") return "By request";
  return `Starting at ${formatUsd(p.amount)}${p.unit === "month" ? "/mo" : ""}`;
}
