import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories } from "@/config/categories";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 md:py-28">
        <p className="font-serif text-6xl font-semibold text-safran">404</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-nuit sm:text-4xl">Cette page n&apos;existe pas</h1>
        <p className="mt-4 text-lg text-gris">
          Le lien est peut-être erroné ou la page a été déplacée. Revenez à l&apos;accueil ou choisissez une catégorie
          d&apos;objets ci-dessous.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-safran px-7 py-4 font-semibold text-nuit shadow-md transition hover:brightness-105"
        >
          Retour à l&apos;accueil
        </Link>

        <div className="mt-12">
          <h2 className="font-serif text-xl font-semibold text-nuit">Ce que nous vendons</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/vendre/${c.slug}`}
                  className="inline-block rounded-full border border-ardoise/25 bg-ardoise-clair/40 px-4 py-2 font-medium text-nuit transition hover:bg-ardoise-clair"
                >
                  {c.lien}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
