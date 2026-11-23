"use server";

import { headers } from "next/headers";
import { parseLead, leadFields, type LeadFormState, type LeadInput } from "@/lib/leads/schema";
import { createRateLimiter } from "@/lib/leads/rate-limit";
import { saveLead, hashIp } from "@/lib/leads/store";
import { site } from "@/lib/site";

// Per-instance limit; Step 2 moves this to the database-backed limiter.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function submitRequest(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);

  if (!limiter(ipHash).ok) {
    return { status: "error", message: "Too many requests. Please try again in a few minutes." };
  }

  const parsed = parseLead(formData);
  if (!parsed.success) {
    // Honeypot tripped: report success so bots learn nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { status: "success" };
    const fieldErrors: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    const values: Partial<Record<keyof LeadInput, string>> = {};
    for (const k of leadFields) {
      const v = formData.get(k);
      if (typeof v === "string") values[k] = v.slice(0, 2000);
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const { website: _honeypot, ...lead } = parsed.data;
  try {
    await saveLead(lead, ipHash);
  } catch (err) {
    console.error("[request] failed to save", err instanceof Error ? err.message : err);
    return { status: "error", message: `Something went wrong on our side. Please email ${site.email}.` };
  }
  return { status: "success" };
}
