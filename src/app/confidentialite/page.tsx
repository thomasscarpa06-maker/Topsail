import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Topsail",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <LegalPage titre="Politique de confidentialité">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {site.mentionsLegales.editeur ?? <Todo label="nom et prénom" />}, Topsail —{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>Lorsque vous demandez une estimation, nous recevons :</p>
        <ul className="mt-2">
          <li>votre nom, votre téléphone, votre e-mail et votre commune ;</li>
          <li>votre situation et la description des objets ;</li>
          <li>les photos que vous choisissez d&apos;envoyer.</li>
        </ul>
        <p className="mt-3">
          Merci de ne pas envoyer de photos où apparaissent des personnes ou des documents personnels.
        </p>
      </section>

      <section>
        <h2>Pourquoi et sur quelle base</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande, organiser l&apos;estimation et, le cas échéant,
          préparer le mandat de vente. Le traitement repose sur votre consentement, donné en cochant la case du
          formulaire, puis sur l&apos;exécution du mandat si vous nous confiez des objets.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        {/* TODO [À VALIDER] : durée de conservation (3 ans = référence CNIL pour les contacts commerciaux) */}
        <p>
          Les demandes sans suite sont conservées au maximum 3 ans après le dernier contact. Les informations liées à un
          mandat de vente sont conservées pendant la durée imposée par nos obligations légales et comptables.
        </p>
      </section>

      <section>
        <h2>Destinataires</h2>
        <p>
          Vos données ne sont ni vendues ni cédées. Elles sont traitées par Topsail et par nos prestataires techniques :
          Vercel (hébergement du site) et Resend (acheminement des e-mails du formulaire).
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>Ce site ne dépose aucun cookie publicitaire ni de mesure d&apos;audience.</p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les faire rectifier ou supprimer, ou retirer votre consentement à tout
          moment en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également adresser une
          réclamation à la CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).
        </p>
      </section>
    </LegalPage>
  );
}
