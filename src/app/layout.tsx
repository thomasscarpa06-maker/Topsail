import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

// Polices auto-hébergées via next/font (téléchargées au build, servies depuis
// le domaine — aucun CDN Google à l'exécution). next/font génère une police de
// repli aux métriques ajustées, ce qui supprime le décalage de mise en page
// (CLS) au chargement de la police.
const serif = Fraunces({ subsets: ["latin"], variable: "--nf-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--nf-sans", display: "swap" });

const titre = "Dépôt-vente à domicile à Grasse | Topsail";
const description =
  "Dépôt-vente à domicile à Grasse : on vend vos objets, votre déco et votre petit mobilier pour vous. Estimation gratuite, commission sur les ventes.";

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
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
