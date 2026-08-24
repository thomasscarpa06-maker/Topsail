import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pourquoi from "@/components/Pourquoi";
import Promesses from "@/components/Promesses";
import Deroule from "@/components/Deroule";
import Prix from "@/components/Prix";
import RendezVous from "@/components/RendezVous";
import Zone from "@/components/Zone";
import Questions, { questions } from "@/components/Questions";
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
  priceRange: "600 € - 2400 €",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grasse",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
  },
  areaServed: [
    "Grasse",
    "Cannes",
    "Mouans-Sartoux",
    "Mougins",
    "Le Cannet",
    "Valbonne",
    "Pégomas",
    "Peymeinade",
  ],
  knowsAbout: "Création de sites web",
};

// FAQPage — reprend les six questions/réponses de la section Questions, seule
// source de vérité, pour permettre l'affichage enrichi dans Google.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Pourquoi />
        <Promesses />
        <Deroule />
        <Prix />
        <RendezVous />
        <Zone />
        <Questions />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
