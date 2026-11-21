"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions/lead";
import { venueCapacityOptions, showsPerYearOptions } from "@/lib/leads/options";
import type { LeadFormState } from "@/lib/leads/schema";

const initial: LeadFormState = { status: "idle" };

const inputCls =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";

export function AuditForm() {
  const [state, action, pending] = useActionState(submitLead, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent bg-surface p-8">
        <h2 className="text-2xl font-bold">Thanks, we've got it.</h2>
        <p className="mt-3 text-muted">
          We'll reply within two business days to schedule a 30-minute call and explain which exports to pull for your audit.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? state.fieldErrors ?? {} : {};
  const v = state.status === "error" ? state.values ?? {} : {};

  return (
    <form action={action} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8" aria-describedby={state.status === "error" ? "form-error" : undefined}>
      {state.status === "error" && (
        <p id="form-error" role="alert" className="mb-6 rounded-lg border border-danger bg-surface-2 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" defaultValue={v.name} label="Your name" autoComplete="name" error={err.name} />
        <Field name="email" defaultValue={v.email} label="Work email" type="email" autoComplete="email" error={err.email} />
        <Field name="role" defaultValue={v.role} label="Your role" placeholder="Owner, GM, operator…" autoComplete="organization-title" error={err.role} />
        <Field name="venueName" defaultValue={v.venueName} label="Venue name" autoComplete="organization" error={err.venueName} />
        <Field name="city" defaultValue={v.city} label="City" autoComplete="address-level2" error={err.city} />
        <Select name="capacity" value={v.capacity} label="Capacity" options={venueCapacityOptions} error={err.capacity} />
        <Select name="showsPerYear" value={v.showsPerYear} label="Ticketed shows per year" options={showsPerYearOptions} error={err.showsPerYear} />
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">What's the biggest financial headache right now? <span className="text-muted">(optional)</span></label>
          <textarea id="message" name="message" defaultValue={v.message} rows={4} maxLength={2000} className={inputCls} />
        </div>
        {/* Honeypot, hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Start my free month"}
      </button>
      <p className="mt-4 text-xs text-muted">We'll only use these details to reply to your request. No marketing lists.</p>
    </form>
  );
}

function Field({ name, label, error, ...rest }: { name: string; label: string; error?: string } & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} required aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className={inputCls} {...rest} />
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

function Select({ name, label, options, error, value }: { name: string; label: string; options: readonly string[]; error?: string; value?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <select key={value ?? ""} id={name} name={name} required defaultValue={value ?? ""} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className={inputCls}>
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
