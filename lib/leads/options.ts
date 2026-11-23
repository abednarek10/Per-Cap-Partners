// Kept separate from the Zod schema so the client form doesn't bundle Zod.
export const roomCountOptions = ["1 room", "2 rooms", "3–5 rooms", "6–10 rooms", "More than 10 rooms"] as const;
export const interestOptions = ["Free snapshot", "Show Profitability Audit", "Fractional CFO", "Transaction support"] as const;
