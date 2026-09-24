import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Dépôt-vente à domicile dans le Pays de Grasse.",
    start_url: "/",
    display: "standalone",
    lang: "fr",
    theme_color: "#0E1A2B",
    background_color: "#F6F1E7",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
