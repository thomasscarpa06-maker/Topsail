"use client";

import { useEffect, useRef, useState } from "react";
import { MARQUE } from "@/lib/constants";
import Logo from "./Logo";

/**
 * En-tête collant.
 * - Sur le hero (sombre) : fond transparent, texte et bouton en chaux.
 * - Une fois le hero dépassé : fond chaux, texte encre. Transition douce.
 *
 * IntersectionObserver sur la section hero. Le rootMargin négatif (hauteur de
 * l'en-tête) fait basculer vers l'état plein exactement quand le bas du hero
 * atteint le bas de l'en-tête — donc au moment où la section claire suivante
 * arrive sous l'en-tête, jamais recouverte de façon illisible.
 */
export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [solide, setSolide] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const header = ref.current;
    if (!hero || !header) {
      setSolide(true); // pas de hero : en-tête plein par défaut
      return;
    }
    const hauteur = header.offsetHeight || 68;
    const io = new IntersectionObserver(
      ([e]) => setSolide(!e.isIntersecting),
      { rootMargin: `-${hauteur}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header ref={ref} className={solide ? "solide" : undefined}>
      <div className="wrap bar">
        <a className="marque" href="#" aria-label={MARQUE}>
          <Logo className="logo" />
        </a>
        <a className="btn btn--plein" href="#rdv">
          Réserver un appel
        </a>
      </div>
    </header>
  );
}
