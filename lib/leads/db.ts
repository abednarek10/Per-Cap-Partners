import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { leads } from "@/db/schema";
import type { LeadInput } from "./schema";

const client = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false, ssl: "require" });
const db = drizzle(client);

export async function insertLead(lead: Omit<LeadInput, "website">, ipHash: string | null) {
  await db.insert(leads).values({ ...lead, ipHash });
}
