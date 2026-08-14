import { MARQUE, MARQUE_SOUS_TITRE } from "@/lib/constants";

// En-tête collant. Texte repris au mot près de reference.html.
export default function Header() {
  return (
    <header>
      <div className="wrap bar">
        <a className="marque" href="#">
          {MARQUE}
          <span>{MARQUE_SOUS_TITRE}</span>
        </a>
        <a className="btn btn--plein" href="#rdv">
          Réserver un appel
        </a>
      </div>
    </header>
  );
}
