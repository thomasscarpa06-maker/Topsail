import Image from "next/image";
import { DISPONIBILITE } from "@/lib/constants";
import HeroCanvasMount from "./HeroCanvasMount";

// Captures — textes et fichiers repris de reference.html (dossier public/captures).
const captures = [
  {
    src: "/captures/kepy.webp",
    alt: "Site de l'artiste DJ Kepy",
    legende: "DJ Kepy · Artiste",
    priority: true,
  },
  {
    src: "/captures/fragrancefinder.webp",
    alt: "FragranceFinder, moteur de recherche de parfums",
    legende: "FragranceFinder · Projet perso",
    priority: false,
  },
  {
    src: "/captures/projet-3.webp",
    alt: "",
    legende: "Votre site · Septembre",
    priority: false,
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <HeroCanvasMount />
      <div className="hero-voile" aria-hidden="true" />
      <div className="wrap">
        <p className="pastille">
          <span className="point" aria-hidden="true" />
          <b>{DISPONIBILITE.capacite}</b>
          <span className="pastille-creneau">{DISPONIBILITE.creneau}</span>
        </p>

        <h1>
          Votre site en ligne en <em>7 jours</em>.
        </h1>

        <p className="accroche">
          Cinq pages, impeccables sur téléphone, avec votre fiche Google à jour.
          Maquette sous 48 h, site en ligne en 7 jours. 1 200 € tout compris —
          le prix est sur cette page, pas dans un devis qui arrive trois
          semaines plus tard.
        </p>

        <div className="actions">
          <a className="btn btn--plein" href="#rdv">
            Réserver un appel de 20 min
          </a>
          <a className="btn btn--vide" href="#prix">
            Découvrir les formules
          </a>
        </div>

        <div className="chiffres">
          <div className="chiffre">
            <b>48 h</b>
            <span>Première maquette</span>
          </div>
          <div className="chiffre">
            <b>7 jours</b>
            <span>Mise en ligne</span>
          </div>
          <div className="chiffre">
            <b>1 200 €</b>
            <span>Prix ferme</span>
          </div>
          <div className="chiffre">
            <b>20 min</b>
            <span>De votre temps</span>
          </div>
        </div>

        <div className="vitrine">
          {captures.map((c) => (
            <figure key={c.src}>
              <div className="cadre">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="170px"
                  priority={c.priority}
                />
              </div>
              <figcaption>{c.legende}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
