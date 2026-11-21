// Kept separate from the Zod schema so the client form doesn't bundle Zod.
export const venueCapacityOptions = ["Under 300", "300–750", "750–1,500", "1,500–3,000", "3,000+"] as const;
export const showsPerYearOptions = ["Under 75", "75–150", "150–250", "250+"] as const;
