-- Snapshot and service requests submitted from the public site.
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text not null,
  company text not null,
  city text not null,
  rooms text not null,
  interest text not null,
  systems text not null default '',
  message text not null default '',
  source text not null default 'website',
  -- HMAC of the client IP, never the raw IP. Used for abuse analysis only.
  ip_hash text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index leads_created_at_idx on leads (created_at);
create index leads_email_idx on leads (email);
