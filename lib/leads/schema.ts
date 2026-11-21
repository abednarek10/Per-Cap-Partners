import { z } from "zod";

import { venueCapacityOptions, showsPerYearOptions } from "./options";
export { venueCapacityOptions, showsPerYearOptions };

const trimmed = (max: number) => z.string().trim().max(max);

export const leadSchema = z.object({
  name: trimmed(120).min(2, "Please enter your name."),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Please enter a valid email address.")),
  role: trimmed(80).min(2, "Please tell us your role."),
  venueName: trimmed(160).min(2, "Please enter your venue's name."),
  city: trimmed(120).min(2, "Please enter your city."),
  capacity: z.enum(venueCapacityOptions, { error: "Please choose a capacity range." }),
  showsPerYear: z.enum(showsPerYearOptions, { error: "Please choose how many shows you run." }),
  message: trimmed(2000).optional().default(""),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof LeadInput, string>>;
      values?: Partial<Record<keyof LeadInput, string>>;
    };

export function parseLead(formData: FormData) {
  const raw = Object.fromEntries(
    ["name", "email", "role", "venueName", "city", "capacity", "showsPerYear", "message", "website"].map((k) => [
      k,
      typeof formData.get(k) === "string" ? (formData.get(k) as string) : undefined,
    ]),
  );
  return leadSchema.safeParse(raw);
}
