import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";

const titre = "Topsail — Dépôt-vente à domicile à Grasse | On vend vos objets pour vous";
const description =
  "Dépôt-vente à domicile dans le Pays de Grasse : estimation gratuite, on vend vos objets, votre déco et votre petit mobilier pour vous. Tri, déménagement, succession.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titre,
  description,
  keywords: [
    "dépôt-vente à domicile Grasse",
    "vendre ses objets Pays de Grasse",
    "estimation objets à domicile 06",
    "dépôt-vente succession Grasse",
    "vendre déco et petit mobilier Grasse",
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
  themeColor: "#F6F1E7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
