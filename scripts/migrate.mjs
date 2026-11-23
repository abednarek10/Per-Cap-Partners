// Applies db/migrations/*.sql in order, once each, as the schema owner role.
// Usage: DATABASE_OWNER_URL=postgres://... node scripts/migrate.mjs
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const url = process.env.DATABASE_OWNER_URL;
if (!url) {
  console.error("DATABASE_OWNER_URL is required (the schema owner, not the app role).");
  process.exit(1);
}

const dir = path.join(process.cwd(), "db", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query("create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())");
  const done = new Set((await client.query("select name from schema_migrations")).rows.map((r) => r.name));
  for (const f of files) {
    if (done.has(f)) continue;
    const sql = await readFile(path.join(dir, f), "utf8");
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into schema_migrations (name) values ($1)", [f]);
      await client.query("commit");
      console.log(`applied ${f}`);
    } catch (e) {
      await client.query("rollback");
      throw new Error(`${f}: ${e.message}`);
    }
  }
  console.log("migrations up to date");
} finally {
  await client.end();
}
