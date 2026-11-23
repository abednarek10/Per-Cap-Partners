import "server-only";
import { Pool } from "pg";
import type { LeadInput } from "./schema";

// The app role (percap_app) is subject to row-level security; leads allow insert only.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  ssl: process.env.DATABASE_SSL === "disable" ? false : process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
});

export async function insertLead(lead: Omit<LeadInput, "website">, ipHash: string | null) {
  await pool.query(
    `insert into leads (name, email, role, company, city, rooms, interest, systems, message, ip_hash)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [lead.name, lead.email, lead.role, lead.company, lead.city, lead.rooms, lead.interest, lead.systems, lead.message, ipHash],
  );
}
