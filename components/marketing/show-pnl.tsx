import { formatUsd } from "@/lib/site";

/** Illustrative show P&Ls for a two-room group. Figures are computed, so every row adds up. */
const POUR_COST = 0.22;
const raw = [
  { show: "Sat · Indie rock headliner", room: "Main Room", att: 1150, ticket: 6200, bar: 26400, other: 3400, labor: 7900, prod: 3200 },
  { show: "Fri · DJ night", room: "The Annex", att: 380, ticket: 1900, bar: 11800, other: 300, labor: 2400, prod: 900 },
  { show: "Thu · Hip-hop", room: "Main Room", att: 900, ticket: 2800, bar: 15300, other: 2100, labor: 6800, prod: 2900 },
  { show: "Mon · Private rental", room: "The Annex", att: 150, ticket: 0, bar: 3300, other: 2500, labor: 900, prod: 200 },
  { show: "Wed · Comedy", room: "Main Room", att: 600, ticket: 3500, bar: 6000, other: 900, labor: 4200, prod: 1500 },
  { show: "Tue · Singer-songwriter", room: "The Annex", att: 140, ticket: -450, bar: 1900, other: 120, labor: 1350, prod: 400 },
  { show: "Sat · Tribute act", room: "Main Room", att: 980, ticket: -1800, bar: 9800, other: 1200, labor: 6900, prod: 3100 },
];

export const sampleShows = raw
  .map((r) => {
    const barNet = Math.round(r.bar * (1 - POUR_COST));
    const contribution = r.ticket + barNet + r.other - r.labor - r.prod;
    return { ...r, barNet, contribution, perHead: contribution / r.att };
  })
  .sort((a, b) => b.contribution - a.contribution);

const money = (v: number) => (v < 0 ? `−${formatUsd(Math.abs(v))}` : formatUsd(v));

export function ShowPnlSample({ caption = "Sample show-level P&L, two rooms, one week" }: { caption?: string }) {
  return (
    <figure className="min-w-0 rounded-2xl border border-line bg-surface">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4">
        <span className="font-semibold">{caption}</span>
        <span className="text-xs text-muted">Illustrative data · bar shown net of 22% pour cost</span>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm tabular-nums">
          <thead className="text-xs text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Show</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Attendance</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Ticket share</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Bar net</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Other</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Labor &amp; security</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Production</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sampleShows.map((r) => (
              <tr key={r.show} className={r.contribution < 0 ? "bg-surface-2" : undefined}>
                <th scope="row" className="px-5 py-3 font-normal">
                  <span className="block font-medium">{r.show}</span>
                  <span className="text-xs text-muted">{r.room}</span>
                </th>
                <td className="px-3 py-3 text-right">{r.att.toLocaleString("en-US")}</td>
                <td className="px-3 py-3 text-right">{money(r.ticket)}</td>
                <td className="px-3 py-3 text-right">{money(r.barNet)}</td>
                <td className="px-3 py-3 text-right">{money(r.other)}</td>
                <td className="px-3 py-3 text-right">{money(-r.labor)}</td>
                <td className="px-3 py-3 text-right">{money(-r.prod)}</td>
                <td className={`px-5 py-3 text-right font-semibold ${r.contribution < 0 ? "text-danger" : "text-accent-ink"}`}>
                  {money(r.contribution)}
                  {r.contribution < 0 && <span className="sr-only"> (loses money)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-muted">
        A 980-person Saturday tribute act loses money once its guarantee and staffing are counted, while a 380-person DJ night is the week&apos;s second-best show.
      </p>
    </figure>
  );
}

export function ThreeSystems() {
  const sources = [
    { t: "Settlement", s: "Booking software", d: "Deal, guarantee, deposits, show expenses, artist payout" },
    { t: "Bar sales", s: "POS", d: "Every transaction, timestamped, matched to the show window" },
    { t: "Labor & security", s: "Scheduling and payroll", d: "Shifts and contracted security, allocated by hours worked" },
  ];
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
      <ul className="grid gap-3">
        {sources.map((x) => (
          <li key={x.t} className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{x.s}</p>
            <p className="mt-1 text-lg font-bold">{x.t}</p>
            <p className="mt-1 text-sm text-muted">{x.d}</p>
          </li>
        ))}
      </ul>
      <div aria-hidden className="grid place-items-center text-3xl text-accent-ink lg:px-2">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </div>
      <div className="grid content-center rounded-2xl border border-accent/60 bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">Per Cap joins them per show</p>
        <p className="mt-2 font-display text-3xl font-bold [font-stretch:85%]">One P&amp;L for every show</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>Which shows make money once the bar is counted?</li>
          <li>Which genres and nights drink?</li>
          <li>Are our offers too high for the per cap we get?</li>
          <li>Should slow weeknights be private rentals?</li>
        </ul>
      </div>
    </div>
  );
}
