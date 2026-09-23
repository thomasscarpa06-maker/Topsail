import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalPage({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <a href="/" className="text-ardoise underline-offset-4 hover:underline">← Retour à l&apos;accueil</a>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-nuit">{titre}</h1>
        <div className="mt-10 space-y-8 text-gris [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-nuit [&_a]:text-ardoise [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
