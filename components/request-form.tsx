"use client";

import { useActionState } from "react";
import { submitRequest } from "@/app/actions/request";
import { roomCountOptions, interestOptions } from "@/lib/leads/options";
import type { LeadFormState } from "@/lib/leads/schema";

const initial: LeadFormState = { status: "idle" };

const inputCls =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";

export function RequestForm({ defaultInterest = "Free snapshot", turnaround }: { defaultInterest?: (typeof interestOptions)[number]; turnaround: string }) {
  const [state, action, pending] = useActionState(submitRequest, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent bg-surface p-8">
        <h2 className="text-2xl font-bold">Thanks, we&apos;ve got your request.</h2>
        <p className="mt-3 text-muted">
          We&apos;ll reply with a secure way to send your exports and the exact reports to pull. Your snapshot
          arrives within {turnaround} of receiving the data.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? state.fieldErrors ?? {} : {};
  const v = state.status === "error" ? state.values ?? {} : {};

  return (
    <form action={action} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8" aria-describedby={state.status === "error" ? "form-error" : undefined}>
      {state.status === "error" && (
        <p id="form-error" role="alert" className="mb-6 rounded-lg border border-danger bg-surface-2 px-4 py-3 text-sm">{state.message}</p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" autoComplete="name" defaultValue={v.name} error={err.name} />
        <Field name="email" label="Work email" type="email" autoComplete="email" defaultValue={v.email} error={err.email} />
        <Field name="role" label="Your role" placeholder="Owner, CEO, finance lead, GM…" autoComplete="organization-title" defaultValue={v.role} error={err.role} />
        <Field name="company" label="Venue group" autoComplete="organization" defaultValue={v.company} error={err.company} />
        <Field name="city" label="Main city" autoComplete="address-level2" defaultValue={v.city} error={err.city} />
        <Select name="rooms" label="Rooms you operate" options={roomCountOptions} value={v.rooms} error={err.rooms} />
        <Select name="interest" label="Interested in" options={interestOptions} value={v.interest ?? defaultInterest} error={err.interest} />
        <Field name="systems" label="Booking and POS systems (optional)" placeholder="e.g. Prism.fm, Toast" required={false} defaultValue={v.systems} error={err.systems} />
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">What do you most want to know about your shows? <span className="text-muted">(optional)</span></label>
          <textarea id="message" name="message" rows={4} maxLength={2000} defaultValue={v.message} className={inputCls} />
        </div>
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button type="submit" disabled={pending} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-on-accent hover:brightness-110 disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Request my snapshot"}
      </button>
      <p className="mt-4 text-xs text-muted">We use these details only to reply to your request.</p>
    </form>
  );
}

function Field({ name, label, error, required = true, ...rest }: { name: string; label: string; error?: string; required?: boolean } & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} required={required} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className={inputCls} {...rest} />
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
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
