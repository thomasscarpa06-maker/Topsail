import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 md:py-28">
        <p className="font-display text-6xl font-bold text-or-fonce">404</p>
        <h1 className="mt-4 text-3xl font-bold text-encre sm:text-4xl">Cette page n&apos;existe pas</h1>
        <p className="mt-4 text-lg text-encre-doux">
          Le lien est peut-être erroné ou la page a été déplacée. Revenez à l&apos;accueil pour découvrir comment faire
          remonter votre note Google.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-or px-7 py-4 font-semibold text-encre shadow-md transition hover:brightness-105"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <Footer />
    </>
  );
}
