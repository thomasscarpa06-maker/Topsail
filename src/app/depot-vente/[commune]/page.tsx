import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  faqJsonLd,
  FaqList,
  TarifsResume,
  CtaEstimation,
  type Crumb,
} from "@/components/SeoPage";
import { communes, getCommuneBySlug, communesProches } from "@/config/communes";
import { categories } from "@/config/categories";
import { getFaq, site } from "@/config/site";
import type { FaqItem } from "@/config/categories";

export const dynamicParams = false;

const ETAPES = [
  { t: "Vous nous contactez", d: "Par le formulaire avec quelques photos, ou par e-mail. On vous répond rapidement." },
  { t: "On passe chez vous", d: "On repère ce qui peut se vendre et on fixe ensemble un prix minimum pour chaque objet." },
  { t: "On s'occupe de tout", d: "Photos, annonces, échanges avec les acheteurs et négociation. Vos objets restent chez vous jusqu'à la vente." },
  { t: "Vous êtes payé", d: "L'argent vous est reversé après chaque vente, commission déduite, avec le détail de chaque vente." },
];

export function generateStaticParams() {
  return communes.map((c) => ({ commune: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ commune: string }>;
}): Promise<Metadata> {
  const { commune } = await params;
  const c = getCommuneBySlug(commune);
  if (!c) return {};
  const url = `/depot-vente/${c.slug}`;
  const titre = `Dépôt-vente à domicile à ${c.nom} (06) | Topsail`;
  const description = `Dépôt-vente à domicile à ${c.nom} : estimation gratuite, nous vendons vos objets, votre déco et votre petit mobilier. Vous ne payez qu'à la vente.`;
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: site.name,
      title: titre,
      description,
    },
    twitter: { card: "summary_large_image", title: titre, description },
  };
}

export default async function CommunePage({
  params,
}: {
  params: Promise<{ commune: string }>;
}) {
  const { commune } = await params;
  const c = getCommuneBySlug(commune);
  if (!c) notFound();

  const gen = getFaq();
  const cout = gen.find((f) => f.q.startsWith("Combien"));
  const stock = gen.find((f) => f.q.startsWith("Où"));
  const faq: FaqItem[] = [c.deplacement, ...([cout, stock].filter(Boolean) as FaqItem[])];
  const proches = communesProches(c.slug);

  const crumbs: Crumb[] = [
    { name: "Accueil", href: "/" },
    { name: "Zone d'intervention", href: "/#zone" },
    { name: c.nom, href: `/depot-vente/${c.slug}` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Dépôt-vente à domicile à ${c.nom}`,
    serviceType: "Dépôt-vente à domicile",
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url, email: site.email },
    areaServed: { "@type": "City", name: c.nom },
    url: `${site.url}/depot-vente/${c.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumb items={crumbs} />

        <article className="mt-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-nuit sm:text-5xl">
            Dépôt-vente à domicile à {c.nom}
          </h1>
          <p className="mt-5 text-lg text-gris">{c.intro}</p>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Comment ça se passe à {c.nom}</h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {ETAPES.map((e, i) => (
                <li key={e.t} className="rounded-2xl border border-nuit/10 bg-white p-5 shadow-sm">
                  <span className="font-serif text-4xl font-semibold text-safran">{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold text-nuit">{e.t}</h3>
                  <p className="mt-1.5 text-gris">{e.d}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Ce que nous vendons pour vous</h2>
            <p className="mt-3 text-gris">
              Nous reprenons les petits objets et le petit mobilier — rien de volumineux, et vos objets restent chez vous
              à {c.nom} jusqu&apos;à la vente. Découvrez le détail par catégorie :
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/vendre/${cat.slug}`}
                    className="inline-block rounded-full border border-ardoise/25 bg-ardoise-clair/40 px-4 py-2 font-medium text-nuit transition hover:bg-ardoise-clair"
                  >
                    {cat.lien}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Questions fréquentes</h2>
            <FaqList faq={faq} />
          </section>

          <section className="mt-12">
            <TarifsResume />
          </section>

          <section className="mt-10">
            <CtaEstimation titre={`Des objets à vendre à ${c.nom} ?`} />
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Nous intervenons aussi à proximité</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {proches.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/depot-vente/${p.slug}`}
                    className="inline-block rounded-full border border-ardoise/25 bg-ardoise-clair/40 px-4 py-2 font-medium text-nuit transition hover:bg-ardoise-clair"
                  >
                    {p.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
