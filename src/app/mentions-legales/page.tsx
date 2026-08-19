import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MENTIONS, EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales — Topsail",
  description: "Mentions légales du site Topsail.",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="legal">
        <div className="wrap">
          <h1>Mentions légales</h1>

          <section className="legal-bloc">
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par {MENTIONS.nomComplet}, entrepreneur
              individuel sous le régime de l&apos;auto-entrepreneur, exerçant
              sous la dénomination «&nbsp;Topsail&nbsp;».
            </p>
            <p>
              SIREN : {MENTIONS.siren}.
              <br />
              Adresse : {MENTIONS.adresse}.
              <br />
              Contact : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </section>

          <section className="legal-bloc">
            <h2>Directeur de la publication</h2>
            <p>{MENTIONS.nomComplet}.</p>
          </section>

          <section className="legal-bloc">
            <h2>Hébergeur</h2>
            <p>
              Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section className="legal-bloc">
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus de ce site — textes, images, code et
              identité visuelle — est la propriété de Topsail, sauf mention
              contraire. Toute reproduction, représentation ou réutilisation,
              totale ou partielle, sans autorisation écrite préalable est
              interdite.
            </p>
          </section>

          <section className="legal-bloc">
            <h2>Données et cookies</h2>
            <p>
              Ce site ne dépose aucun cookie de suivi ni traceur publicitaire et
              n&apos;utilise aucun outil de mesure d&apos;audience tiers.
            </p>
            <p>
              Le module de prise de rendez-vous (Calendly) n&apos;est chargé
              qu&apos;au moment où vous atteignez la section correspondante ; il
              peut alors déposer ses propres cookies, nécessaires à son
              fonctionnement. En dehors de ce cas, aucune donnée personnelle
              n&apos;est collectée sans une action de votre part — envoi
              d&apos;un e-mail ou réservation d&apos;un créneau.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
