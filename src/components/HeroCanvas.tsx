"use client";

import { useEffect, useRef } from "react";

/**
 * Fond animé du hero : lignes de crête / trace de chromatographie.
 * Canvas 2D, 7 courbes gaussiennes. Port fidèle du script de reference.html.
 *
 * Contraintes (BRIEF.md) :
 *  - devicePixelRatio plafonné à 1.5
 *  - requestAnimationFrame arrêté via IntersectionObserver hors viewport
 *  - rendu statique si prefers-reduced-motion: reduce
 *  - redimensionnement débouncé à ~180 ms
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const hero = cv.parentElement;
    if (!hero) return;

    const doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const LIGNES = 7;
    let l = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    let raf: number | null = null;
    let visible = true;

    function dimensionner() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      l = hero!.offsetWidth;
      h = hero!.offsetHeight;
      cv!.width = l * dpr;
      cv!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Somme de gaussiennes : des pics comme sur un chromatogramme.
    function hauteur(x: number, i: number, temps: number) {
      const pics: [number, number, number][] = [
        [0.18, 0.055, 0.55],
        [0.34, 0.038, 0.95],
        [0.46, 0.03, 0.42],
        [0.61, 0.052, 0.78],
        [0.79, 0.034, 0.6],
      ];
      let y = 0;
      for (let p = 0; p < pics.length; p++) {
        const [c, w, a] = pics[p];
        const derive = Math.sin(temps * 0.25 + p * 1.7 + i * 0.5) * 0.012;
        const amp = a * (1 + Math.sin(temps * 0.4 + p + i * 0.8) * 0.14);
        const d = (x - (c + derive)) / w;
        y += amp * Math.exp(-d * d);
      }
      return y;
    }

    function dessiner(temps: number) {
      ctx!.clearRect(0, 0, l, h);
      const base = h * 0.9;
      const echelle = h * 0.42;

      for (let i = 0; i < LIGNES; i++) {
        const prof = i / (LIGNES - 1);
        ctx!.beginPath();
        for (let px = 0; px <= l; px += 6) {
          const y = base - i * (h * 0.045) - hauteur(px / l, i, temps) * echelle;
          if (px === 0) ctx!.moveTo(px, y);
          else ctx!.lineTo(px, y);
        }
        ctx!.strokeStyle =
          i === 1
            ? `rgba(217,140,31,${0.55 - prof * 0.15})`
            : `rgba(46,107,79,${0.34 - prof * 0.28})`;
        ctx!.lineWidth = i === 1 ? 1.6 : 1.1;
        ctx!.stroke();
      }
    }

    function boucle() {
      t += 0.006;
      dessiner(t);
      raf = visible ? requestAnimationFrame(boucle) : null;
    }

    dimensionner();

    let io: IntersectionObserver | undefined;
    if (doux) {
      dessiner(0);
    } else {
      io = new IntersectionObserver(
        (e) => {
          visible = e[0].isIntersecting;
          if (visible && raf === null) raf = requestAnimationFrame(boucle);
        },
        { threshold: 0 },
      );
      io.observe(hero);
      raf = requestAnimationFrame(boucle);
    }

    let minuteur: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (minuteur) clearTimeout(minuteur);
      minuteur = setTimeout(() => {
        dimensionner();
        dessiner(t);
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (minuteur) clearTimeout(minuteur);
      if (raf !== null) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return <canvas ref={ref} id="trace" aria-hidden="true" />;
}
