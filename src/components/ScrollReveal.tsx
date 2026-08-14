"use client";

import { useEffect } from "react";

/**
 * Apparition au défilement des éléments .apparait. Port du script de
 * reference.html. Respecte prefers-reduced-motion (affichage immédiat) et se
 * replie sur un affichage direct si IntersectionObserver est indisponible.
 * Composant sans rendu, monté une fois pour toute la page.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const cibles = Array.from(
      document.querySelectorAll<HTMLElement>(".apparait"),
    );
    if (!cibles.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      cibles.forEach((c) => c.classList.add("vu"));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e, i) => {
          if (e.isIntersecting) {
            timers.push(
              setTimeout(() => e.target.classList.add("vu"), i * 70),
            );
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    cibles.forEach((c) => obs.observe(c));

    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
