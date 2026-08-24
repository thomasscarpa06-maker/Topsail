import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// robots.txt : tout est explorable (la page mentions légales reste crawlable
// pour que son noindex soit lu), et le sitemap est déclaré.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
