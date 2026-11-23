import { z } from "zod";
import { roomCountOptions, interestOptions } from "./options";
export { roomCountOptions, interestOptions };

const trimmed = (max: number) => z.string().trim().max(max);

export const leadSchema = z.object({
  name: trimmed(120).min(2, "Please enter your name."),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Please enter a valid email address.")),
  role: trimmed(80).min(2, "Please tell us your role."),
  company: trimmed(160).min(2, "Please enter your venue group's name."),
  city: trimmed(120).min(2, "Please enter your city."),
  rooms: z.enum(roomCountOptions, { error: "Please choose how many rooms you run." }),
  interest: z.enum(interestOptions, { error: "Please choose what you're interested in." }),
  systems: trimmed(300).optional().default(""),
  message: trimmed(2000).optional().default(""),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
export const leadFields = ["name", "email", "role", "company", "city", "rooms", "interest", "systems", "message"] as const;

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
    [...leadFields, "website"].map((k) => {
      const v = formData.get(k);
      return [k, typeof v === "string" ? v : undefined];
    }),
  );
  return leadSchema.safeParse(raw);
}
