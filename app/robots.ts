import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { nonIndexedRoutes } from "@/lib/routes";

// Search and AI answer-engine crawlers are explicitly welcome on public pages.
// Private areas (the client portal in Phase 2, plus API routes) are disallowed.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

// Drafts awaiting CPA review are disallowed so crawlers that honor robots.txt never read them.
const disallow = ["/portal/", "/api/", "/app/", "/admin/", ...nonIndexedRoutes()];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
