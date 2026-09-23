import { site, getFaq } from "@/config/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Etapes, Objets, PourQui, Tarifs, Zone, Questions } from "@/components/Sections";
import { Estimation } from "@/components/Estimation";
import { Footer } from "@/components/Footer";

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: "Dépôt-vente à domicile dans le Pays de Grasse : nous vendons vos meubles et objets pour vous.",
    url: site.url,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}), // TODO [À DÉFINIR] : téléphone
    image: `${site.url}/opengraph-image`,
    address: { "@type": "PostalAddress", addressLocality: "Grasse", postalCode: "06130", addressCountry: "FR" },
    areaServed: site.communes.map((c) => ({ "@type": "City", name: c })),
    priceRange: "Commission sur les ventes",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
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
        <Etapes />
        <Objets />
        <PourQui />
        <Tarifs />
        <Zone />
        <Questions />
        <Estimation />
      </main>
      <Footer />
    </>
  );
}
