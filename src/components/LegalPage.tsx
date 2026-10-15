import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalPage({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <a href="/" className="text-bleu underline-offset-4 hover:underline">← Retour à l&apos;accueil</a>
        <h1 className="mt-6 text-4xl font-bold text-encre">{titre}</h1>
        <div className="mt-10 space-y-8 text-encre-doux [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-encre [&_a]:text-bleu [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
