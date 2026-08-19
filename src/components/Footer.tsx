import Link from "next/link";
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
            <h3>Aller à</h3>
            <ul>
              <li>
                <Link href="/#pourquoi">Pourquoi Topsail</Link>
              </li>
              <li>
                <Link href="/#promesses">Les promesses</Link>
              </li>
              <li>
                <Link href="/#deroule">Le déroulé</Link>
              </li>
              <li>
                <Link href="/#prix">Le prix</Link>
              </li>
              <li>
                <Link href="/#questions">Les questions</Link>
              </li>
              <li>
                <Link href="/#rdv">Prendre rendez-vous</Link>
              </li>
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Me joindre</h3>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <Link href="/#rdv">Réserver un appel de 20 min</Link>
              </li>
              <li className="footer-plain">Réponse sous 48 h</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Ce que je fais</h3>
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
          <Link href="/mentions-legales">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
