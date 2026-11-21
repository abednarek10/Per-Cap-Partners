"use server";

import { headers } from "next/headers";
import { parseLead, type LeadFormState, type LeadInput } from "@/lib/leads/schema";
import { createRateLimiter } from "@/lib/leads/rate-limit";
import { saveLead, hashIp } from "@/lib/leads/store";
import { site } from "@/lib/site";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);

  if (!limiter(ipHash).ok) {
    return { status: "error", message: "Too many requests. Please try again in a few minutes." };
  }

  const parsed = parseLead(formData);
  if (!parsed.success) {
    // Honeypot tripped: pretend success so bots learn nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { status: "success" };

    const fieldErrors: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    const values: Partial<Record<keyof LeadInput, string>> = {};
    for (const k of ["name", "email", "role", "venueName", "city", "capacity", "showsPerYear", "message"] as const) {
      const val = formData.get(k);
      if (typeof val === "string") values[k] = val.slice(0, 2000);
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const { website: _honeypot, ...lead } = parsed.data;
  try {
    await saveLead(lead, ipHash);
  } catch (err) {
    console.error("[lead] failed to save", err instanceof Error ? err.message : err);
    return { status: "error", message: `Something went wrong on our side. Please email us at ${site.email}.` };
  }
  return { status: "success" };
}
