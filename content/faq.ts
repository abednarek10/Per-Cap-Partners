import { site, monthlyPrice, trialLabel } from "@/lib/site";
import type { Faq } from "./services";

export const generalFaqs: Faq[] = [
  {
    q: "What is a fractional CFO for a music venue?",
    a: `A fractional CFO is a senior finance lead you share rather than hire full-time. For a venue, that means someone who owns the numbers behind every show: per cap, settlements, labor, cash flow, tax planning and reporting to ownership. ${site.name} provides that role as an ongoing engagement, so owners and GMs can focus on booking and servicing talent.`,
  },
  {
    q: "How much does Per Cap Partners cost?",
    a: `Plans start at ${monthlyPrice()}, and your ${trialLabel().toLowerCase()}: we onboard your data and deliver a certified baseline revenue audit before you pay anything. Pricing is reassessed each year against the performance metrics we agree on at kickoff, so what we charge stays tied to the value we create.`,
  },
  {
    q: "Who will we actually work with?",
    a: "The same advisor who reviews and certifies your recommendations. You get one point of contact who knows your room, your calendar and your team, not a rotating cast of analysts.",
  },
  {
    q: "What data do you need from us?",
    a: "Standard exports you already have: ticketing order reports (Ticketmaster, AXS, Eventbrite, DICE, Etix and others), point-of-sale and bar sales (Square, Toast, Clover), show settlements, and your P&L or general ledger. Tax returns and depreciation schedules help with tax-efficiency work. Everything is uploaded through an encrypted client portal.",
  },
  {
    q: "Is our fans' personal data safe?",
    a: "Yes. When a file is processed, fan emails and phone numbers are converted into one-way cryptographic tokens before anything is stored, and names are discarded by default. Raw files are deleted after processing. Each venue's data is isolated so no other client can access it.",
  },
  {
    q: "What does 'human-certified' mean?",
    a: "Software does the heavy lifting on data cleanup and analysis, but no finding reaches you until a person has checked the numbers, tested the reasoning against how your venue actually runs, and signed off on it. You get recommendations, not raw dashboards.",
  },
  {
    q: "How fast will we see results?",
    a: "Your baseline per cap, cost-per-head and settlement review is usually delivered within the first 30 days after your data is uploaded. Many revenue and labor recommendations can be tested on the next weekend's shows.",
  },
  {
    q: "What size venues do you work with?",
    a: "Independent rooms, clubs, theaters and small amphitheaters that run a regular calendar of ticketed shows and have a bar or F&B operation. The work pays for itself fastest at venues with enough shows per year to make small per-head gains add up.",
  },
];
