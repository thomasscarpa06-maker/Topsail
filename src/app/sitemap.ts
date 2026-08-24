import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Sitemap de la page unique. La page /mentions-legales est volontairement
// exclue : elle est en noindex (voir son export metadata.robots).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-08-24"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
