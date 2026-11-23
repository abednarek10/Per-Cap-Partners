import Link from "next/link";
import { site, primaryCta, primaryCtaShort, founderDisplayName } from "@/lib/site";
import { services } from "@/content/services";
import { Container, ButtonLink } from "./ui";
import { MobileNav } from "./mobile-nav";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label={`${site.name}, home`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <path d="M16 2 L5 28 H27 Z" fill="var(--accent)" opacity="0.22" />
        <circle cx="16" cy="21" r="6.5" fill="var(--accent)" />
        <circle cx="16" cy="3.5" r="2.5" fill="var(--accent)" />
      </svg>
      <span className="font-display text-lg font-bold uppercase tracking-wide [font-stretch:80%]">
        Per Cap <span className="text-muted">Partners</span>
      </span>
    </Link>
  );
}

export const navLinks = [
  { href: "/show-profitability", label: "Show profitability" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/playbook", label: "Playbook" },
  { href: "/team", label: "Team" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <ButtonLink href={primaryCta.href} className="!px-5 !py-2 text-sm">{primaryCtaShort}</ButtonLink>
        </div>
        <MobileNav links={[...navLinks, { href: primaryCta.href, label: primaryCta.label }]} />
      </Container>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}. Every finding certified by {founderDisplayName()}.</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${site.email}`} className="text-accent-ink hover:underline">{site.email}</a>
          </p>
        </div>
        <FooterCol title="Services" links={[{ href: "/snapshot", label: "Free snapshot" }, ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.navLabel }))]} />
        <FooterCol
          title="Company"
          links={[
            { href: "/show-profitability", label: "Show profitability" },
            { href: "/how-it-works", label: "How it works" },
            { href: "/product", label: "Product" },
            { href: "/pricing", label: "Pricing" },
            { href: "/team", label: "Team" },
            { href: "/security", label: "Security & data" },
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            { href: "/playbook", label: "Operator playbook" },
            { href: "/compare", label: "Compare options" },
            { href: "/glossary", label: "Venue finance glossary" },
            { href: "/insights", label: "Insights" },
            { href: "/faq", label: "FAQ" },
          ]}
        />
      </Container>
      <Container className="border-t border-line py-8 text-xs leading-relaxed text-muted">
        <p>
          {site.name} provides financial analytics and fractional CFO services. We do not provide legal or tax advice.
          Tax-related findings are prepared for review by your licensed CPA or tax attorney.
        </p>
        <p className="mt-2">© {year} {site.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-3 text-sm text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
