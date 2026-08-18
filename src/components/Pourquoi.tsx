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
            <h2>Un site, ce n&apos;est pas une plaquette. C&apos;est un outil.</h2>
            <p>
              Je m&apos;appelle Thomas, je suis développeur web et je vis à
              Grasse. Je construis des sites pour les commerces et les
              indépendants d&apos;ici, un par un, à la main.
            </p>
            <p>
              Ma référence, c&apos;est FragranceFinder : un moteur de recherche
              de 1 250 parfums, en neuf langues, que j&apos;ai conçu et développé
              seul — de la base de données au référencement. À côté de ça, un
              site vitrine de cinq pages ne me fait pas peur.
            </p>
            <p>
              Autour de moi, je vois des commerces avec un site illisible sur
              téléphone, ou des devis à 6 000 € jamais signés. Topsail est né de
              là : un site propre, un prix affiché, un délai tenu. Rien de plus,
              mais rien de moins.
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
