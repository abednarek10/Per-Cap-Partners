import type { NextConfig } from "next";

// Baseline security headers for every route. Phase 2 tightens this with a
// nonce-based Content-Security-Policy once the authenticated portal exists.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about", destination: "/team", permanent: true },
      { source: "/contact", destination: "/snapshot", permanent: true },
      { source: "/services/revenue", destination: "/show-profitability", permanent: true },
      { source: "/services/cost-reduction", destination: "/show-profitability", permanent: true },
      { source: "/services/tax-efficiency", destination: "/services/fractional-cfo", permanent: true },
      { source: "/services/gtm-strategy", destination: "/services/fractional-cfo", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
