// Section « Prix » — fond clair. Trois formules + tableau comparatif (desktop)
// qui devient trois blocs successifs sous 900 px. Aucune dépendance : icônes en
// SVG inline (coche pour oui, tiret pour non).

const formules = [
  {
    nom: "Lancement",
    mention: "3 places, jusqu'au 30 septembre",
    prix: "600 €",
    phare: false,
  },
  {
    nom: "Essentiel",
    mention: "Le plus choisi",
    prix: "1 200 €",
    phare: true,
  },
  {
    nom: "Sur mesure",
    mention: "Projets spécifiques",
    prefixe: "à partir de",
    prix: "2 400 €",
    phare: false,
  },
] as const;

// Valeur par colonne (Lancement · Essentiel · Sur mesure).
// true -> oui (coche), false -> non (tiret), chaîne -> texte.
const lignes: { label: string; valeurs: (string | boolean)[] }[] = [
  { label: "Pages", valeurs: ["5", "5", "10 et plus"] },
  { label: "Maquette", valeurs: ["48 h", "48 h", "5 jours"] },
  { label: "Mise en ligne", valeurs: ["7 jours", "7 jours", "3 semaines"] },
  { label: "Rédaction des textes", valeurs: [true, true, true] },
  { label: "Fiche Google Business", valeurs: [true, true, true] },
  { label: "Formulaire de contact", valeurs: [true, true, true] },
  { label: "Tours de modifications", valeurs: ["1", "1", "2"] },
  { label: "Prise en main", valeurs: ["30 min", "30 min", "1 h"] },
  { label: "Réservation en ligne", valeurs: [false, false, true] },
  { label: "Multilingue ou blog", valeurs: [false, false, true] },
  { label: "Contrepartie", valeurs: ["Avis Google + captures", "—", "—"] },
];

function Coche() {
  return (
    <svg className="prix-icone" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Tiret() {
  return (
    <svg className="prix-icone" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12h12" />
    </svg>
  );
}

function Valeur({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="prix-oui">
        <Coche />
        <span className="sr-only">oui</span>
      </span>
    );
  if (v === false)
    return (
      <span className="prix-non">
        <Tiret />
        <span className="sr-only">non</span>
      </span>
    );
  return <>{v}</>;
}

export default function Prix() {
  return (
    <section className="prix" id="prix">
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Le prix</span>
          <h2>Trois formules, un prix affiché.</h2>
          <p>
            Le tarif est sur cette page. Vous savez ce que vous payez avant de
            m&apos;appeler.
          </p>
        </div>

        {/* Cartes de formules */}
        <div className="prix-cartes">
          {formules.map((f) => (
            <article
              key={f.nom}
              className={`prix-carte apparait${f.phare ? " prix-carte--phare" : ""}`}
            >
              <span className="prix-mention">{f.mention}</span>
              <h3>{f.nom}</h3>
              <div className="prix-montant">
                {"prefixe" in f && f.prefixe ? (
                  <span className="prix-prefixe">{f.prefixe} </span>
                ) : null}
                {f.prix}
              </div>
              <a className="btn btn--plein" href="#rdv">
                Réserver un appel
              </a>
            </article>
          ))}
        </div>

        {/* Tableau comparatif — desktop (≥ 900 px) */}
        <div className="prix-table-wrap">
          <table className="prix-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Caractéristique</span>
                </th>
                {formules.map((f, i) => (
                  <th
                    scope="col"
                    key={f.nom}
                    className={i === 1 ? "est-phare" : undefined}
                  >
                    {f.nom}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lignes.map((l) => (
                <tr key={l.label}>
                  <th scope="row">{l.label}</th>
                  {l.valeurs.map((v, i) => (
                    <td key={i} className={i === 1 ? "est-phare" : undefined}>
                      <Valeur v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tableau comparatif — mobile (< 900 px) : trois blocs successifs */}
        <div className="prix-blocs">
          {formules.map((f, col) => (
            <div
              key={f.nom}
              className={`prix-bloc${f.phare ? " prix-bloc--phare" : ""}`}
            >
              <h4>{f.nom}</h4>
              <dl>
                {lignes.map((l) => (
                  <div className="prix-bloc-ligne" key={l.label}>
                    <dt>{l.label}</dt>
                    <dd>
                      <Valeur v={l.valeurs[col]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Mentions sous le tableau */}
        <div className="prix-notes">
          <p>
            Maintenance en option, 39 €/mois — hébergement géré, mises à jour de
            sécurité, sauvegardes, une modification par mois, réponse sous 48 h.
          </p>
          <p>Lancement et Essentiel payables en trois fois, sans frais.</p>
        </div>

        {/* Transparence — texte repris de reference.html */}
        <p className="prix-franc">
          <b>Ce qui n&apos;est pas dedans :</b> le nom de domaine et
          l&apos;hébergement, entre 15 et 60 € par an selon ce que vous
          choisissez, payés directement par vous. Je vous dis quoi prendre, vous
          restez propriétaire.
        </p>
      </div>
    </section>
  );
}
