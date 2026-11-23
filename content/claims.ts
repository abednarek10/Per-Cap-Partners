/**
 * Claims registry. Every specific number, benchmark or comparison used in site copy is
 * registered here with its kind and evidence. Tests enforce:
 *  - every claim was verified within the last 12 months,
 *  - illustrative math actually adds up (the `check` function),
 *  - external claims carry a source URL.
 * Rule of thumb: if a sentence contains a number, it should map to a claim here.
 */
export type Claim = {
  id: string;
  statement: string;
  kind: "illustrative" | "internal" | "external";
  verified: string; // ISO date the claim was last checked
  source?: { label: string; url: string }; // required for external claims
  check?: () => boolean; // required for illustrative math
};

export const claims: Claim[] = [
  {
    id: "bar-night-50k",
    statement: "At a $25 bar per cap, a 2,000-person sold-out night is about $50,000 in bar sales.",
    kind: "illustrative",
    verified: "2026-11-23",
    check: () => 25 * 2000 === 50000,
  },
  {
    id: "two-dollar-lift",
    statement: "A $2 per cap gain across 150 shows at 400 attendees is $120,000 a year.",
    kind: "illustrative",
    verified: "2026-11-23",
    check: () => 2 * 150 * 400 === 120000,
  },
  {
    id: "audit-timeline",
    statement: "A Show Profitability Audit takes four to six weeks for a fixed fee.",
    kind: "internal",
    verified: "2026-11-23",
  },
  {
    id: "snapshot-scope",
    statement: "The free snapshot uses about 90 days of settlements and bar sales for one room.",
    kind: "internal",
    verified: "2026-11-23",
  },
  {
    id: "benchmark-minimum",
    statement: "Benchmarks are published only when at least five venues contribute to a figure.",
    kind: "internal",
    verified: "2026-11-23",
  },
];

export const getClaim = (id: string) => claims.find((c) => c.id === id);
