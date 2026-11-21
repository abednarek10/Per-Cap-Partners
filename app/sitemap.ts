import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { publicRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    ...(r.lastModified ? { lastModified: r.lastModified } : {}),
    priority: r.priority,
  }));
}
