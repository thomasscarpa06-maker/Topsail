import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Réputation Google pour les commerces du Pays de Grasse.",
    start_url: "/",
    display: "standalone",
    lang: "fr",
    theme_color: "#0B1220",
    background_color: "#FAFAF7",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
