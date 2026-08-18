// Section « Pourquoi Topsail » — fond clair, entre le hero et les Promesses.
// Texte à gauche, emplacement photo (cadre en attente, dimensions réservées)
// à droite à partir de 900 px ; sous 900 px, le cadre passe au-dessus du texte.
export default function Pourquoi() {
  return (
    <section className="pourquoi" id="pourquoi">
      <div className="wrap">
        <div className="pourquoi-grille">
          <div className="pourquoi-texte apparait">
            <span className="eyebrow">Pourquoi Topsail</span>
            <h2>Je viens des matières premières, pas du marketing.</h2>
            <p>
              Je travaille à Grasse dans les matières premières et les huiles
              essentielles : analyses, sourcing, développement. C&apos;est un
              métier de précision, où l&apos;on ne raconte pas d&apos;histoires —
              un produit est conforme ou il ne l&apos;est pas.
            </p>
            <p>
              En parallèle, j&apos;ai construit FragranceFinder, un moteur de
              recherche de 1 250 parfums en neuf langues. Seul, de la base de
              données à la mise en ligne.
            </p>
            <p>
              Autour de moi, je voyais des commerces avec un site illisible sur
              téléphone, ou des devis à 6 000 € jamais signés. Topsail est né de
              là : un site propre, un prix affiché, un délai tenu.
            </p>
          </div>

          <div className="pourquoi-media" aria-hidden="true">
            <div className="pourquoi-cadre">
              <svg viewBox="0 0 24 24" className="pourquoi-cadre-icone">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
