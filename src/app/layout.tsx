import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

// Bricolage Grotesque — titres (700 / 800). Police variable : plage complète.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

// Instrument Sans — texte courant. Police variable : plage complète.
const texte = Instrument_Sans({
  subsets: ["latin"],
  variable: "--ff-texte",
  display: "swap",
});

// IBM Plex Mono — étiquettes, chiffres, numéros de jour.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Topsail — Sites web à Grasse | En ligne en 7 jours, 1 200 €",
  description:
    "Site vitrine 5 pages pour les commerces et artisans de Grasse. En ligne en 7 jours, impeccable sur téléphone, fiche Google incluse. 1 200 € tout compris.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${texte.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          {/* Sans JavaScript : contenu visible d'emblée, et en-tête plein
              (lisible au-dessus de toutes les sections). */}
          <style>{`.apparait{opacity:1 !important;transform:none !important}
header{background:rgba(238,234,226,.9) !important;backdrop-filter:blur(10px);border-bottom-color:var(--trait) !important}
header .marque{color:var(--encre) !important}
header .marque span{color:var(--encre-doux) !important}
header .btn--plein{background:var(--encre) !important;color:var(--blanc) !important;border-color:var(--encre) !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
