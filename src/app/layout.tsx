import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";

const titre = "Topsail — Dépôt-vente à domicile à Grasse | On vide, on vend pour vous";
const description =
  "Dépôt-vente à domicile dans le Pays de Grasse : estimation gratuite, on vend vos meubles et objets pour vous. Succession, déménagement, tri.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titre,
  description,
  keywords: [
    "dépôt-vente Grasse",
    "vider maison succession Grasse",
    "débarras Grasse",
    "vendre meubles anciens Grasse",
    "estimation objets à domicile 06",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: titre,
    description,
  },
  twitter: { card: "summary_large_image", title: titre, description },
  icons: { icon: "/topsail_logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0E1A2B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
