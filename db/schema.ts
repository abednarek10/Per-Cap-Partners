import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

/** Audit requests submitted from the public site. */
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull(),
    venueName: text("venue_name").notNull(),
    city: text("city").notNull(),
    capacity: text("capacity").notNull(),
    showsPerYear: text("shows_per_year").notNull(),
    message: text("message").notNull().default(""),
    source: text("source").notNull().default("website"),
    // HMAC of the client IP, never the raw IP. Used for abuse analysis only.
    ipHash: text("ip_hash"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("leads_created_at_idx").on(t.createdAt), index("leads_email_idx").on(t.email)],
);
