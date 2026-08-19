import type { CSSProperties } from "react";
import { PERF_INDICATEURS } from "@/lib/constants";

// Section « Pourquoi Topsail » — fond clair, entre le hero et les Promesses.
// Texte à gauche, bloc de démonstration technique (trois cadrans SVG) à droite
// à partir de 900 px ; sous 900 px, le bloc passe au-dessus du texte.
const RAYON = 52;
const CIRC = 2 * Math.PI * RAYON; // circonférence de l'arc

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

          <div className="pourquoi-media">
            <div className="perf apparait">
              <h3 className="perf-titre">
                Mesuré par Google, pas promis par moi.
              </h3>
              <div className="cadrans">
                {PERF_INDICATEURS.map((ind) => {
                  const fin = CIRC * (1 - ind.valeur / 100);
                  return (
                    <div className="cadran" key={ind.label}>
                      <svg
                        className="cadran-svg"
                        viewBox="0 0 120 120"
                        role="img"
                        aria-label={`${ind.label} : ${ind.valeur} sur 100`}
                      >
                        <circle
                          className="cadran-piste"
                          cx="60"
                          cy="60"
                          r={RAYON}
                        />
                        <g transform="rotate(-90 60 60)">
                          <circle
                            className="cadran-arc"
                            cx="60"
                            cy="60"
                            r={RAYON}
                            style={
                              {
                                strokeDasharray: CIRC,
                                "--vide": CIRC,
                                "--fin": fin,
                              } as CSSProperties
                            }
                          />
                        </g>
                        <text className="cadran-valeur" x="60" y="60">
                          {ind.valeur}
                        </text>
                      </svg>
                      <span className="cadran-label" aria-hidden="true">
                        {ind.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="perf-legende">
                Google PageSpeed Insights, mobile — fragrancefinder.fr, le site
                que j&apos;ai construit. Août 2026.
              </p>
              <p className="perf-note">
                Zéro décalage de mise en page. Serveur qui répond en 0,5
                seconde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
