import type { PlaybookEntry } from "@/content/playbook";
import { formatUsd } from "@/lib/site";

type Kind = "money" | "count" | "ratio" | "percent" | undefined;

export function formatValue(v: number, kind: Kind): string {
  if (kind === "count") return v.toLocaleString("en-US");
  if (kind === "ratio") return `${v.toFixed(2)}x`;
  if (kind === "percent") return `${v}%`;
  return v < 0 ? `−${formatUsd(Math.abs(v))}` : formatUsd(v);
}

export function WorkedExample({ example }: { example: PlaybookEntry["example"] }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-6">
      <figcaption className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Worked example · {example.title}</figcaption>
      <table className="mt-4 w-full text-left">
        <tbody className="divide-y divide-line">
          {example.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="py-2.5 pr-4 font-normal text-muted">{row.label}</th>
              <td className="py-2.5 text-right font-mono tabular-nums">{formatValue(row.value, row.kind)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="pt-4 pr-4 text-left font-semibold">{example.result.label}</th>
            <td className="pt-4 text-right font-display text-2xl font-bold tabular-nums text-accent-ink">
              {formatValue(example.result.value, example.result.kind)}
            </td>
          </tr>
        </tbody>
      </table>
      {example.note && <p className="mt-4 text-xs text-muted">{example.note}</p>}
    </figure>
  );
}
