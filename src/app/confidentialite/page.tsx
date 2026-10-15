import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Topsail",
  description:
    "Politique de confidentialité de Topsail : données collectées via le formulaire d'audit, finalités, durées de conservation et vos droits.",
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
        <p>Lorsque vous demandez un audit, nous recevons :</p>
        <ul className="mt-2">
          <li>votre nom et le nom de votre commerce ;</li>
          <li>votre activité et votre ville ;</li>
          <li>le lien de votre fiche Google, si vous le renseignez ;</li>
          <li>votre e-mail et votre téléphone.</li>
        </ul>
        <p className="mt-3">
          Pour réaliser l&apos;audit, nous consultons les informations publiques de votre fiche Google (note, nombre
          d&apos;avis, avis publiés) ainsi que celles de vos concurrents directs. Ces données sont déjà publiques et
          accessibles à tous.
        </p>
      </section>

      <section>
        <h2>Pourquoi et sur quelle base</h2>
        <p>
          Ces données servent uniquement à réaliser votre audit, vous recontacter et, le cas échéant, mettre en place le
          service. Le traitement repose sur votre consentement, donné en cochant la case du formulaire, puis sur
          l&apos;exécution du contrat si vous décidez de travailler avec nous.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        {/* TODO [À VALIDER] : durée de conservation (3 ans = référence CNIL pour les contacts commerciaux) */}
        <p>
          Les demandes sans suite sont conservées au maximum 3 ans après le dernier contact. Les informations liées à un
          contrat en cours sont conservées pendant la durée imposée par nos obligations légales et comptables.
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
