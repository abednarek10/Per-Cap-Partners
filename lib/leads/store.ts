import "server-only";
import { createHmac } from "node:crypto";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./schema";

export function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_SALT || "dev-only-salt";
  return createHmac("sha256", salt).update(ip).digest("hex");
}

let dbPromise: Promise<typeof import("./db")> | null = null;

/**
 * Persist a lead. With DATABASE_URL set it goes to Postgres. In local dev
 * without a database it falls back to .data/leads.jsonl (git-ignored). In
 * production a missing database is an error, so leads are never silently lost
 * (LEADS_FILE_FALLBACK=1 re-enables the file for local production builds/tests).
 */
export async function saveLead(lead: Omit<LeadInput, "website">, ipHash: string | null): Promise<void> {
  if (process.env.DATABASE_URL) {
    dbPromise ??= import("./db");
    const { insertLead } = await dbPromise;
    await insertLead(lead, ipHash);
    return;
  }
  if (process.env.NODE_ENV === "production" && process.env.LEADS_FILE_FALLBACK !== "1") {
    throw new Error("DATABASE_URL is not configured; refusing to drop lead.");
  }
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify({ ...lead, ipHash, createdAt: new Date().toISOString() }) + "\n");
}
