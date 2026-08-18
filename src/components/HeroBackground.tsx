"use client";

import { useEffect, useRef } from "react";
import type { HeroBg } from "@/lib/heroBg";
import { createShaderBg } from "@/lib/webglRenderer";
import { create2DBg } from "@/lib/canvas2d";

// Seuil au-delà duquel le shader WebGL est actif. Sous ce seuil : canvas 2D.
const SEUIL_SHADER = "(min-width: 768px)";

/**
 * Fond animé du hero. Composant client isolé, monté en dynamic(ssr:false)
 * par HeroCanvasMount.
 *
 * - ≥ 768 px + webgl2 disponible → shader WebGL (safran / bleu ardoise sur encre)
 * - sinon → canvas 2D (courbes gaussiennes recolorées)
 *
 * Garde-fous (BRIEF.md) : rAF coupé hors viewport via IntersectionObserver,
 * rendu figé si prefers-reduced-motion, resize débouncé à 180 ms, repli sur
 * le canvas 2D si webgl2 échoue. Plafonds de devicePixelRatio gérés dans
 * chaque moteur (1 pour le shader, 1.5 pour le canvas 2D).
 */
export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const hero = canvas.parentElement;
    if (!hero) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let engine: HeroBg | null = null;
    let mode: "shader" | "2d" | null = null;
    let shaderIndisponible = false;
    let visible = true;
    let start = performance.now();

    const modeVoulu = (): "shader" | "2d" =>
      window.matchMedia(SEUIL_SHADER).matches && !shaderIndisponible
        ? "shader"
        : "2d";

    const dimensionner = () => {
      if (engine) engine.resize(hero.offsetWidth, hero.offsetHeight);
    };

    const boucle = (now: number) => {
      if (!engine) return;
      engine.draw(now - start);
      rafRef.current = visible ? requestAnimationFrame(boucle) : null;
    };

    const lancerBoucle = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(boucle);
    };

    const arreterBoucle = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const construire = () => {
      arreterBoucle();
      if (engine) {
        engine.destroy();
        engine = null;
      }

      let e: HeroBg | null = null;
      if (modeVoulu() === "shader") {
        e = createShaderBg(canvas);
        if (!e) shaderIndisponible = true; // repli définitif si webgl2 échoue
      }
      if (!e) e = create2DBg(canvas);
      engine = e;
      mode = shaderIndisponible ? "2d" : modeVoulu();

      dimensionner();
      start = performance.now();

      if (reduce) {
        engine.draw(0); // rendu figé
      } else if (visible) {
        lancerBoucle();
      }
    };

    construire();

    // Coupe / relance la boucle quand le hero sort du viewport.
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) lancerBoucle();
          else arreterBoucle();
        },
        { threshold: 0 },
      );
      io.observe(hero);
    }

    // Redimensionnement débouncé à 180 ms ; reconstruit le moteur si l'on
    // franchit le seuil des 768 px.
    let minuteur: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (minuteur) clearTimeout(minuteur);
      minuteur = setTimeout(() => {
        if (modeVoulu() !== mode) {
          construire();
        } else {
          dimensionner();
          if (reduce && engine) engine.draw(0);
        }
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (minuteur) clearTimeout(minuteur);
      arreterBoucle();
      io?.disconnect();
      if (engine) engine.destroy();
    };
  }, []);

  return <canvas ref={ref} id="trace" aria-hidden="true" />;
}
