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
import { categories, getCategorie } from "@/config/categories";
import { site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategorie(slug);
  if (!cat) return {};
  const url = `/vendre/${cat.slug}`;
  return {
    title: cat.titre,
    description: cat.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      siteName: site.name,
      title: cat.titre,
      description: cat.description,
    },
    twitter: { card: "summary_large_image", title: cat.titre, description: cat.description },
  };
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategorie(slug);
  if (!cat) notFound();

  const crumbs: Crumb[] = [
    { name: "Accueil", href: "/" },
    { name: "Ce que nous vendons", href: "/#ce-quon-prend" },
    { name: cat.lien, href: `/vendre/${cat.slug}` },
  ];
  const related = cat.related.map(getCategorie).filter(Boolean) as NonNullable<
    ReturnType<typeof getCategorie>
  >[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(cat.faq)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumb items={crumbs} />

        <article className="mt-6">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-nuit sm:text-5xl">{cat.h1}</h1>
          <p className="mt-5 text-lg text-gris">{cat.intro}</p>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Ce que nous vendons dans cette catégorie</h2>
            <p className="mt-3 text-gris">{cat.vendIntro}</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {cat.vendExamples.map((e) => (
                <li key={e} className="flex gap-2.5 text-nuit">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safran" />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Comment nous procédons</h2>
            <div className="mt-4 space-y-4 text-gris">
              {cat.methode.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {cat.nePrendPas && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Ce que nous ne prenons pas</h2>
              <p className="mt-4 text-gris">{cat.nePrendPas}</p>
            </section>
          )}

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Questions fréquentes</h2>
            <FaqList faq={cat.faq} />
          </section>

          <section className="mt-12">
            <TarifsResume />
          </section>

          <section className="mt-10">
            <CtaEstimation titre="Vous avez ce type d'objets à vendre ?" />
          </section>

          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">Autres catégories</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/vendre/${r.slug}`}
                    className="inline-block rounded-full border border-ardoise/25 bg-ardoise-clair/40 px-4 py-2 font-medium text-nuit transition hover:bg-ardoise-clair"
                  >
                    {r.lien}
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
