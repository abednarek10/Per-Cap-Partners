-- Least-privilege grants and row-level security.
--
-- The app connects as percap_app (NOSUPERUSER, NOBYPASSRLS, not a table owner), so every
-- policy below applies to it. Each request runs in a transaction that sets:
--   app.user_id   the signed-in user's id
--   app.org_id    the organization the user is acting in (verified membership)
--   app.is_staff  'true' only for users whose user.role = 'staff' (checked server-side)
-- Missing settings read as NULL, which matches nothing: the default is deny.

create or replace function app_user() returns text language sql stable as
  $$ select nullif(current_setting('app.user_id', true), '') $$;
create or replace function app_org() returns uuid language sql stable as
  $$ select nullif(current_setting('app.org_id', true), '')::uuid $$;
create or replace function app_is_staff() returns boolean language sql stable as
  $$ select coalesce(current_setting('app.is_staff', true), '') = 'true' $$;

grant usage on schema public to percap_app;
grant execute on function app_user(), app_org(), app_is_staff() to percap_app;

-- Identity tables are managed by Better Auth, which needs full access; they hold no tenant data.
grant select, insert, update, delete on "user", "session", "account", "verification", "twoFactor", "rateLimit" to percap_app;

-- Tenant data.
grant select, insert, update, delete on organizations, memberships, venues, invitations to percap_app;
grant select, insert, update, delete on notifications, push_subscriptions to percap_app;
grant select, insert, update on notification_preferences to percap_app;
grant select, insert, update on email_outbox, app_settings, rate_limits to percap_app;
grant delete on rate_limits to percap_app;
grant select, insert on waitlist, leads to percap_app;
-- The audit log is append-only for the app: no update or delete.
grant select, insert on audit_log to percap_app;

alter table organizations enable row level security;
alter table organizations force row level security;
create policy org_access on organizations
  using (id = app_org() or app_is_staff())
  with check (id = app_org() or app_is_staff());

alter table memberships enable row level security;
alter table memberships force row level security;
-- A user may list their own memberships (to pick an organization) without an org context.
create policy membership_read on memberships for select
  using (user_id = app_user() or org_id = app_org() or app_is_staff());
create policy membership_write on memberships for insert
  with check (org_id = app_org() or app_is_staff());
create policy membership_update on memberships for update
  using (org_id = app_org() or app_is_staff()) with check (org_id = app_org() or app_is_staff());
create policy membership_delete on memberships for delete
  using (org_id = app_org() or app_is_staff());

alter table venues enable row level security;
alter table venues force row level security;
create policy venue_access on venues
  using (org_id = app_org() or app_is_staff())
  with check (org_id = app_org() or app_is_staff());

alter table invitations enable row level security;
alter table invitations force row level security;
create policy invitation_access on invitations
  using (org_id = app_org() or app_is_staff())
  with check (org_id = app_org() or app_is_staff());
-- Invite acceptance looks up a single row by token hash through a security definer function
-- (below), so invitees never need broad read access.

alter table notifications enable row level security;
alter table notifications force row level security;
create policy notification_owner on notifications for select using (user_id = app_user() or app_is_staff());
create policy notification_update on notifications for update using (user_id = app_user()) with check (user_id = app_user());
create policy notification_delete on notifications for delete using (user_id = app_user());
-- Notifications are created by the server for any recipient (e.g. staff publishing to a client).
create policy notification_insert on notifications for insert with check (true);

alter table notification_preferences enable row level security;
alter table notification_preferences force row level security;
create policy pref_owner on notification_preferences
  using (user_id = app_user() or app_is_staff()) with check (user_id = app_user());

alter table push_subscriptions enable row level security;
alter table push_subscriptions force row level security;
create policy push_owner on push_subscriptions
  using (user_id = app_user() or app_is_staff()) with check (user_id = app_user());

alter table email_outbox enable row level security;
alter table email_outbox force row level security;
create policy outbox_insert on email_outbox for insert with check (true);
create policy outbox_staff on email_outbox for select using (app_is_staff());
create policy outbox_update on email_outbox for update using (true) with check (true);

alter table audit_log enable row level security;
alter table audit_log force row level security;
create policy audit_insert on audit_log for insert with check (true);
create policy audit_read on audit_log for select using (app_is_staff() or (org_id is not null and org_id = app_org()));

alter table app_settings enable row level security;
alter table app_settings force row level security;
create policy settings_read on app_settings for select using (true);
create policy settings_write on app_settings for update using (app_is_staff()) with check (app_is_staff());
create policy settings_insert on app_settings for insert with check (app_is_staff());

alter table waitlist enable row level security;
alter table waitlist force row level security;
create policy waitlist_insert on waitlist for insert with check (true);
create policy waitlist_staff on waitlist for select using (app_is_staff());

alter table leads enable row level security;
alter table leads force row level security;
create policy leads_insert on leads for insert with check (true);
create policy leads_staff on leads for select using (app_is_staff());

-- Rate limits are infrastructure, not tenant data; RLS off but only reachable via the app role.

-- Invite lookup: returns one invitation by token hash, bypassing RLS in a narrow, audited way.
create or replace function find_invitation(p_token_hash text)
returns table (id uuid, org_id uuid, org_name text, email text, role text, expires_at timestamptz, accepted_at timestamptz)
language sql stable security definer set search_path = public as $$
  select i.id, i.org_id, o.name, i.email, i.role, i.expires_at, i.accepted_at
  from invitations i join organizations o on o.id = i.org_id
  where i.token_hash = p_token_hash
$$;
revoke all on function find_invitation(text) from public;
grant execute on function find_invitation(text) to percap_app;

-- Pending invitations for a verified email address (shown during onboarding).
create or replace function pending_invitations_for(p_email text)
returns table (org_name text, role text, expires_at timestamptz)
language sql stable security definer set search_path = public as $$
  select o.name, i.role, i.expires_at
  from invitations i join organizations o on o.id = i.org_id
  where lower(i.email) = lower(p_email) and i.accepted_at is null and i.expires_at > now()
$$;
revoke all on function pending_invitations_for(text) from public;
grant execute on function pending_invitations_for(text) to percap_app;

-- Staff membership lookups for notifications (members of an org) go through the app with is_staff.
