import { site, getFaq } from "@/config/site";
import { categories } from "@/config/categories";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AccrocheSeo, Etapes, Objets, PourQui, Tarifs, Zone, Questions } from "@/components/Sections";
import { Estimation } from "@/components/Estimation";
import { Footer } from "@/components/Footer";

function JsonLd() {
  const commissionTxt = site.tarifs.commissionPct
    ? `Nous vendons vos objets pour vous et prélevons une commission de ${site.tarifs.commissionPct} % uniquement sur les ventes réalisées.`
    : "Nous vendons vos objets pour vous et prélevons une commission uniquement sur les ventes réalisées.";

  const localBusiness = {
    "@context": "https://schema.org",
    // Service de revente pour le compte de tiers : LocalBusiness + Store.
    "@type": ["LocalBusiness", "Store"],
    name: site.name,
    description:
      "Dépôt-vente à domicile dans le Pays de Grasse : nous vendons vos objets, votre déco et votre petit mobilier pour vous.",
    url: site.url,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}), // TODO [À DÉFINIR] : téléphone
    image: `${site.url}/opengraph-image`,
    address: { "@type": "PostalAddress", addressLocality: "Grasse", postalCode: "06130", addressCountry: "FR" },
    areaServed: site.communes.map((c) => ({ "@type": "City", name: c })),
    serviceArea: site.communes.map((c) => ({ "@type": "City", name: c })),
    priceRange: "Commission sur les ventes",
    // TODO : ajouter ici la fiche Google Business et la page Facebook une fois créées.
    sameAs: [] as string[],
    makesOffer: {
      "@type": "Offer",
      name: "Dépôt-vente à domicile",
      description: commissionTxt,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ce que nous vendons pour vous",
      itemListElement: categories.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.h1, url: `${site.url}/vendre/${c.slug}` },
      })),
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
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
        <AccrocheSeo />
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
