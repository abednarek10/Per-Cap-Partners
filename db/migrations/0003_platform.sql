-- Platform tables: tenancy, onboarding, notifications, audit trail and settings.
-- Every client-owned row carries org_id so row-level security (0004) can isolate venues.

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 2 and 160),
  -- Pipeline stage, visible to staff and to the client as their audit status.
  stage text not null default 'signed_up'
    check (stage in ('signed_up', 'data_received', 'audit_in_progress', 'audit_delivered', 'active', 'paused')),
  created_by text references "user" ("id") on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  user_id text not null references "user" ("id") on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);
create index memberships_user_idx on memberships (user_id);

create table venues (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  name text not null check (length(name) between 2 and 160),
  city text not null,
  region text not null default '',
  capacity_range text not null,
  shows_per_year text not null,
  ticketing_platform text not null default '',
  pos_platform text not null default '',
  created_at timestamptz not null default now()
);
create index venues_org_idx on venues (org_id);

create table invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  email text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  -- Only a SHA-256 of the invite token is stored; the token itself exists only in the link.
  token_hash text not null unique,
  invited_by text references "user" ("id") on delete set null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);
create index invitations_org_idx on invitations (org_id);
create index invitations_email_idx on invitations (lower(email));

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" ("id") on delete cascade,
  org_id uuid references organizations (id) on delete cascade,
  kind text not null,
  title text not null,
  body text not null default '',
  link text not null default '/app',
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on notifications (user_id, created_at desc);

create table notification_preferences (
  user_id text primary key references "user" ("id") on delete cascade,
  email boolean not null default true,
  push boolean not null default true,
  updated_at timestamptz not null default now()
);

create table push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" ("id") on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text not null default '',
  created_at timestamptz not null default now()
);
create index push_subscriptions_user_idx on push_subscriptions (user_id);

-- Every outgoing email is recorded. In development nothing is sent; this table is the outbox.
create table email_outbox (
  id uuid primary key default gen_random_uuid(),
  to_address text not null,
  subject text not null,
  text_body text not null,
  link text not null default '',
  template text not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed', 'dev')),
  provider_id text,
  error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
create index email_outbox_to_idx on email_outbox (lower(to_address), created_at desc);

-- Append-only trail of sensitive actions.
create table audit_log (
  id bigint generated always as identity primary key,
  org_id uuid references organizations (id) on delete set null,
  actor_user_id text references "user" ("id") on delete set null,
  action text not null,
  target text not null default '',
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_log_org_idx on audit_log (org_id, created_at desc);

create table app_settings (
  key text primary key,
  value jsonb not null,
  updated_by text references "user" ("id") on delete set null,
  updated_at timestamptz not null default now()
);
insert into app_settings (key, value) values ('signups_open', 'true'::jsonb);

-- Used when signups are paused. Internal only.
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  venue_name text not null,
  city text not null default '',
  created_at timestamptz not null default now()
);

-- Fixed-window rate limits shared across server instances.
create table rate_limits (
  key text primary key,
  window_start timestamptz not null,
  count integer not null
);
