import Logo from "./Logo";
import { EMAIL } from "@/lib/constants";

// Pied de page — fond encre. Aucune dépendance ; aucune icône de réseau social
// (pas de comptes). Quatre colonnes ≥ 900 px, empilées en dessous.
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-col footer-marque">
            <Logo className="footer-logo" />
            <p>
              Développeur web indépendant à Grasse. Sites vitrines pour
              commerces, artisans et professions libérales du bassin grassois et
              cannois.
            </p>
          </div>

          <nav className="footer-col" aria-label="Aller à">
            <h4>Aller à</h4>
            <ul>
              <li>
                <a href="#pourquoi">Pourquoi Topsail</a>
              </li>
              <li>
                <a href="#promesses">Les promesses</a>
              </li>
              <li>
                <a href="#deroule">Le déroulé</a>
              </li>
              <li>
                <a href="#prix">Le prix</a>
              </li>
              <li>
                <a href="#questions">Les questions</a>
              </li>
              <li>
                <a href="#rdv">Prendre rendez-vous</a>
              </li>
            </ul>
          </nav>

          <div className="footer-col">
            <h4>Me joindre</h4>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href="#rdv">Réserver un appel de 20 min</a>
              </li>
              <li className="footer-plain">Réponse sous 48 h</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Ce que je fais</h4>
            <ul>
              <li className="footer-plain">Sites vitrines</li>
              <li className="footer-plain">Fiches Google Business</li>
              <li className="footer-plain">Refonte de sites anciens</li>
              <li className="footer-plain">Maintenance</li>
            </ul>
          </div>
        </div>

        <div className="footer-bas">
          <p>© 2026 Topsail — Grasse</p>
          <p>Auto-entrepreneur · TVA non applicable, art. 293 B du CGI</p>
          <a href="/mentions-legales">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}
