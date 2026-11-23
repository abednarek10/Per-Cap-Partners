import Link from "next/link";
import { offers, priceLabel } from "@/content/offers";
import { site } from "@/lib/site";

export function OfferLadder({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {offers.map((o, i) => (
        <li key={o.id} className={`flex flex-col rounded-2xl border bg-surface p-6 ${o.id === "snapshot" ? "border-accent" : "border-line"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Step {i + 1}</p>
          <h3 className="mt-2 text-xl font-bold">{o.name}</h3>
          {site.showPricing && <p className="mt-2 font-display text-2xl font-bold text-accent-ink [font-stretch:85%]">{priceLabel(o.price)}</p>}
          <p className="mt-1 text-xs text-muted">{o.timeline}</p>
          <p className="mt-4 text-sm text-muted">{o.summary}</p>
          {detailed && (
            <ul className="mt-4 space-y-1.5 text-sm">
              {o.includes.map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden className="text-accent-ink">✓</span>{x}</li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-6">
            <Link href={o.href} className="text-sm font-semibold text-accent-ink hover:underline">{o.cta} →</Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
