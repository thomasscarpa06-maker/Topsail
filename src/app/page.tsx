import { site, getFaq, offre } from "@/config/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Probleme, CommentCaMarche, Inclus, Offre, Conformite, PourQui, QuiSuisJe, Questions } from "@/components/Sections";
import { Audit } from "@/components/Audit";
import { Footer } from "@/components/Footer";

const AREA = ["Grasse", "Mouans-Sartoux", "Mougins", "Peymeinade", "Le Rouret", "Châteauneuf", "Cabris"];

function JsonLd() {
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description:
      "Gestion de la réputation Google (avis clients) pour les commerces et artisans du Pays de Grasse.",
    url: site.url,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}), // TODO [À DÉFINIR] : téléphone
    image: `${site.url}/opengraph-image`,
    address: { "@type": "PostalAddress", addressLocality: "Grasse", postalCode: "06130", addressCountry: "FR" },
    areaServed: AREA.map((c) => ({ "@type": "City", name: c })),
    makesOffer: [
      {
        "@type": "Offer",
        name: "Gestion des avis Google — abonnement",
        priceCurrency: "EUR",
        price: String(offre.prixMensuel),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "EUR",
          price: String(offre.prixMensuel),
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      },
      {
        "@type": "Offer",
        name: "Plaque NFC + QR code (paiement unique)",
        priceCurrency: "EUR",
        price: String(offre.plaquePrix),
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "fr-FR",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaq().map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Probleme />
        <CommentCaMarche />
        <Inclus />
        <Offre />
        <Conformite />
        <PourQui />
        <QuiSuisJe />
        <Questions />
        <Audit />
      </main>
      <Footer />
    </>
  );
}
