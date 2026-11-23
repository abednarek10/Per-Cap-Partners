import { monogram as m } from "@/lib/brand/monogram";

type Props = {
  /** Letter color. Defaults to the brand accent (Spotlight Amber). */
  fg?: string;
  /** Tile color behind the letters; also used for the knockout where C overlaps P. */
  bg?: string;
  /** Padding around the letters, in font units (the mark is ~721 × 1132 units). */
  pad?: number;
  /** Square tile (icons) instead of the natural portrait shape. */
  square?: boolean;
  className?: string;
  title?: string;
};

/** The Per Cap "PC" monogram as inline SVG. No font loading, identical everywhere. */
export function Monogram({ fg = "var(--accent)", bg = "#0b0b0f", pad = 90, square = false, className, title }: Props) {
  const h = m.height + pad * 2;
  const w = square ? h : m.width + pad * 2;
  const ox = (w - m.width) / 2;
  const oy = pad;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect width={w} height={h} fill={bg} />
      <g transform={`translate(${ox} ${oy})`}>
        <path d={m.p.d} transform={m.p.transform} fill={fg} />
        <path d={m.c.d} transform={m.c.transform} fill={bg} stroke={bg} strokeWidth={m.knockout} strokeLinejoin="round" />
        <path d={m.c.d} transform={m.c.transform} fill={fg} />
      </g>
    </svg>
  );
}

/** Static SVG markup for files that can't render React (favicon). */
export function monogramSvgString({ fg = "#f5a524", bg = "#0b0b0f", pad = 90, square = true, radius = 0 } = {}): string {
  const h = m.height + pad * 2;
  const w = square ? h : m.width + pad * 2;
  const ox = (w - m.width) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" rx="${radius}" fill="${bg}"/><g transform="translate(${ox} ${pad})"><path d="${m.p.d}" transform="${m.p.transform}" fill="${fg}"/><path d="${m.c.d}" transform="${m.c.transform}" fill="${bg}" stroke="${bg}" stroke-width="${m.knockout}" stroke-linejoin="round"/><path d="${m.c.d}" transform="${m.c.transform}" fill="${fg}"/></g></svg>`;
}
