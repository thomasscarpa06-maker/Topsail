import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Mentions légales — Topsail",
  description:
    "Mentions légales de Topsail, gestion de la réputation Google des commerces du Pays de Grasse : éditeur et hébergeur du site.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  const m = site.mentionsLegales;
  return (
    <LegalPage titre="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {m.editeur ?? <Todo label="nom et prénom" />}, entrepreneur individuel, exerçant sous le nom commercial Topsail.
          <br />
          SIRET : {m.siret ?? <Todo label="SIRET (après immatriculation)" />}
          <br />
          Adresse : {m.adresse ?? <Todo label="adresse" />}
          <br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phone && (
            <>
              <br />
              Téléphone : {site.phone}
            </>
          )}
        </p>
        <p className="mt-3">Directeur de la publication : {m.editeur ?? <Todo label="nom et prénom" />}</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
          <a href="https://vercel.com" rel="noopener">vercel.com</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, visuels, logo) est la propriété de Topsail, sauf mention
          contraire. Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des informations transmises via le formulaire est décrit dans notre{" "}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>
      </section>
    </LegalPage>
  );
}
