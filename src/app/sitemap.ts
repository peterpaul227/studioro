import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const SITE = "https://studioro.com";

/**
 * Static sitemap — includes every route + every project detail page.
 * Next rebuilds this file on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = ["", "/work", "/about", "/services", "/prints", "/contact"].map(
    (path) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const projectPages = projects.map((p) => ({
    url: `${SITE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
