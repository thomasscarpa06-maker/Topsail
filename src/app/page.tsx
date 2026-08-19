import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pourquoi from "@/components/Pourquoi";
import Promesses from "@/components/Promesses";
import Deroule from "@/components/Deroule";
import Prix from "@/components/Prix";
import RendezVous from "@/components/RendezVous";
import Questions from "@/components/Questions";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL, EMAIL } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Topsail",
  description:
    "Création de sites web pour les commerces, artisans et professions libérales du bassin grassois et cannois.",
  url: SITE_URL,
  email: EMAIL,
  image: `${SITE_URL}/og.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grasse",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
  },
  areaServed: ["Grasse", "Bassin cannois"],
  knowsAbout: "Création de sites web",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Pourquoi />
        <Promesses />
        <Deroule />
        <Prix />
        <RendezVous />
        <Questions />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
