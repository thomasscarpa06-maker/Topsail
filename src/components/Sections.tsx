import { site, getFaq } from "@/config/site";
import { Todo } from "./Todo";

function Titre({ sur, titre, intro }: { sur: string; titre: string; intro?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-safran-fonce">{sur}</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-nuit sm:text-[2.6rem]">{titre}</h2>
      {intro && <p className="mt-4 text-lg text-gris">{intro}</p>}
    </div>
  );
}

/* ───────────── Comment ça marche ───────────── */

const etapes = [
  { titre: "Vous nous contactez", texte: "Par le formulaire avec quelques photos, ou par téléphone. On vous répond rapidement." },
  { titre: "On passe chez vous", texte: "On repère ce qui peut se vendre et on fixe ensemble un prix minimum pour chaque objet." },
  { titre: "On s'occupe de tout", texte: "Photos, annonces, échanges avec les acheteurs et négociation. Vos objets restent chez vous jusqu'à la vente." },
  { titre: "Vous êtes payé", texte: "L'argent vous est reversé après chaque vente, commission déduite, avec le détail de chaque vente." },
];

export function Etapes() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Titre sur="Comment ça marche" titre="Quatre étapes, et vous n'avez rien à gérer" />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {etapes.map((e, i) => (
          <li key={e.titre} className="relative rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
            <span className="font-serif text-5xl font-semibold text-safran">{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold text-nuit">{e.titre}</h3>
            <p className="mt-2 text-gris">{e.texte}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 flex items-start gap-3 rounded-xl bg-ardoise-clair/60 px-5 py-4 text-nuit">
        <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-ardoise" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h6" />
        </svg>
        <span>
          <strong>Un mandat de vente écrit est signé avant toute prise en charge.</strong> Vous savez exactement ce qui est vendu, à quel prix minimum et ce que vous touchez.
        </span>
      </p>
    </section>
  );
}

/* ───────────── Ce qu'on prend ───────────── */

const oui = [
  "Petit mobilier (chevets, chaises, tables d'appoint…)",
  "Luminaires",
  "Vaisselle et verrerie",
  "Objets de décoration",
  "Brocante et objets de collection",
  "Petit électroménager en bon état",
  "Outillage",
  "Vélos",
  "Instruments de musique",
];

const non = [
  "Gros meubles (armoires, buffets, canapés…)",
  "Objets cassés ou très abîmés",
  "Literie",
  "Vêtements courants",
  "Objets de faible valeur à l'unité (sauf en lot)",
  "Armes",
  "Produits dangereux",
];

export function Objets() {
  return (
    <section id="ce-quon-prend" className="bg-sable-2/70">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Titre sur="Ce qu'on prend" titre="Ce que nous vendons pour vous" />
        <div className="mt-12 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-nuit">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-ardoise text-sable">✓</span>
              Oui, avec plaisir
            </h3>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {oui.map((o) => (
                <li key={o} className="flex gap-2.5">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-safran" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-nuit/10 bg-white/50 p-7">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-nuit">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-nuit/10 text-nuit">✕</span>
              Non, désolés
            </h3>
            <ul className="mt-5 space-y-2.5 text-gris">
              {non.map((o) => (
                <li key={o} className="flex gap-2.5">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nuit/30" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-lg">
          Un doute ?{" "}
          <a href="#estimation" className="font-semibold text-ardoise underline decoration-safran decoration-2 underline-offset-4">
            Envoyez-nous une photo, on vous répond.
          </a>
        </p>
      </div>
    </section>
  );
}

/* ───────────── Pour qui ───────────── */

const situations = [
  { titre: "Grand tri", texte: "Placards, grenier, garage : vous triez, nous vendons ce qui a de la valeur." },
  { titre: "Déménagement", texte: "Tout ne rentrera pas dans le nouveau logement. Ce qui part vous rapporte." },
  { titre: "Succession", texte: "Les objets d'un proche à vendre, avec respect et discrétion." },
];

export function PourQui() {
  return (
    <section id="pour-qui" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Titre sur="Pour qui" titre="Pour les moments où il faut faire de la place" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {situations.map((s) => (
          <div key={s.titre} className="rounded-2xl border border-nuit/10 border-t-4 border-t-safran bg-white p-7 shadow-sm">
            <h3 className="font-serif text-2xl font-semibold text-ardoise">{s.titre}</h3>
            <p className="mt-3 text-gris">{s.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Tarifs ───────────── */

export function Tarifs() {
  const t = site.tarifs;
  const lignes: { titre: string; valeur: React.ReactNode; note?: React.ReactNode }[] = [
    {
      titre: "Estimation à domicile",
      valeur: t.estimation ?? <Todo label="gratuite ou frais de déplacement" />,
    },
    {
      titre: "Commission sur les ventes",
      valeur: t.commissionPct ? `${t.commissionPct} % du prix de vente` : <Todo label="% de commission" />,
      note: "Rien à payer si rien ne se vend.",
    },
    {
      titre: "Valeur minimum par objet",
      valeur: t.valeurMinimum ? `${t.valeurMinimum} €` : <Todo label="montant en €" />,
      note: "En dessous, possibilité de vente en lot.",
    },
    {
      titre: "Objets invendus",
      valeur: t.semainesInvendu ? `Après ${t.semainesInvendu} semaines` : <Todo label="nombre de semaines" />,
      note: "Ils restent simplement chez vous, ou sont retirés de la vente selon votre choix.",
    },
  ];

  return (
    <section id="tarifs" className="bg-ardoise-clair">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-safran-fonce">Tarifs</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-nuit sm:text-[2.6rem]">
            Vous ne payez que si ça se vend
          </h2>
          <p className="mt-4 text-lg text-gris">
            Pas de frais cachés, pas d&apos;avance. Tout est écrit noir sur blanc dans le mandat de vente.
          </p>
        </div>
        <dl className="divide-y divide-nuit/10 rounded-2xl border border-nuit/10 bg-white shadow-sm">
          {lignes.map((l) => (
            <div key={l.titre} className="grid gap-1 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <dt>
                <span className="font-semibold text-nuit">{l.titre}</span>
                {l.note && <span className="mt-0.5 block text-[0.95rem] text-gris">{l.note}</span>}
              </dt>
              <dd className="font-serif text-xl font-semibold text-ardoise sm:text-right">{l.valeur}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────────── Zone d'intervention ───────────── */

export function Zone() {
  return (
    <section id="zone" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <div className="grid gap-10 rounded-3xl border border-nuit/10 bg-white p-8 shadow-sm md:grid-cols-[1fr_1.4fr] md:p-12">
        <Titre sur="Zone d'intervention" titre="Grasse et alentours" intro="Nous nous déplaçons chez vous dans les communes suivantes." />
        <div>
          <ul className="flex flex-wrap gap-2.5">
            {site.communes.map((c) => (
              <li key={c} className="rounded-full border border-ardoise/25 bg-ardoise-clair/40 px-4 py-2 font-medium text-nuit">
                {c}
              </li>
            ))}
          </ul>
          {!site.communesValidees && (
            <p className="mt-4">
              <Todo label="valider la liste des communes" />
            </p>
          )}
          <p className="mt-5 text-gris">Votre commune n&apos;est pas dans la liste ? Demandez quand même, on regarde ensemble.</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Questions fréquentes ───────────── */

export function Questions() {
  const faq = getFaq();
  return (
    <section id="questions" className="bg-sable-2/70">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
        <Titre sur="Questions fréquentes" titre="Vos questions, nos réponses" />
        <div className="mt-10 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white px-6 py-1 shadow-sm open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-nuit [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sable-2 text-xl text-ardoise transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gris">{f.a}</p>
            </details>
          ))}
        </div>
        {(!site.delaiPaiement || !site.assuranceSouscrite) && (
          <p className="mt-5 flex flex-wrap gap-2">
            {!site.delaiPaiement && <Todo label="délai de paiement" />}
            {!site.assuranceSouscrite && <Todo label="assurance RC Pro à confirmer" />}
          </p>
        )}
      </div>
    </section>
  );
}
