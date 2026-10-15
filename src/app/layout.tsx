import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

// Polices auto-hébergées via next/font (téléchargées au build, servies depuis
// le domaine). Repli aux métriques ajustées → pas de décalage (CLS) au swap.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--nf-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--nf-sans", display: "swap" });

const titre = "Améliorer sa note Google à Grasse | Topsail";
const description =
  "Plus d'avis Google, des réponses à chacun, une note qui inspire confiance. Pour les commerces et artisans du Pays de Grasse. Audit gratuit.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titre,
  description,
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
  themeColor: "#FAFAF7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
