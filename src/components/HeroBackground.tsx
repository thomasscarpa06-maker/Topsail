"use client";

import { useEffect, useRef } from "react";
import type { HeroBg } from "@/lib/heroBg";
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
    let anime = true; // false = rendu statique unique (mobile) ou figé (reduce)
    let start = performance.now();

    // Plafond d'images par seconde. Le shader WebGL (desktop) tourne plein
    // régime ; le canvas 2D (mobile), coûteux à cause du flou, est limité à
    // 24 img/s via un accumulateur de temps dans la boucle rAF.
    const MIN_INTERVALLE_2D = 1000 / 24; // ~41,7 ms
    let minIntervalle = 0;
    let dernierRendu = -Infinity;

    const modeVoulu = (): "shader" | "2d" =>
      window.matchMedia(SEUIL_SHADER).matches && !shaderIndisponible
        ? "shader"
        : "2d";

    const dimensionner = () => {
      if (engine) engine.resize(hero.offsetWidth, hero.offsetHeight);
    };

    const boucle = (now: number) => {
      if (!engine) return;
      // Accumulateur : on ne redessine que si le delta dépasse l'intervalle
      // cible (0 pour le shader = chaque image).
      if (minIntervalle === 0 || now - dernierRendu >= minIntervalle) {
        dernierRendu = now;
        engine.draw(now - start);
      }
      rafRef.current = visible ? requestAnimationFrame(boucle) : null;
    };

    // L'animation ne démarre qu'une fois la page chargée et le fil principal
    // libre : rien ne doit bloquer le chargement initial (TBT).
    let pretAAnimer = false;

    const lancerBoucle = () => {
      if (!anime || !pretAAnimer) return;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(boucle);
    };

    const arreterBoucle = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Sous 768 px : 4 courbes et un pas de 10 px (au lieu de 7 et 6) pour
    // alléger chaque image. Au-dessus (repli si webgl2 échoue), rendu complet.
    const params2D = () =>
      !window.matchMedia(SEUIL_SHADER).matches
        ? { lignes: 4, pas: 10 }
        : undefined;

    // Installe un moteur construit et déclenche le rendu (statique ou animé).
    const installer = (e: HeroBg, m: "shader" | "2d") => {
      engine = e;
      mode = m;
      minIntervalle = m === "2d" ? MIN_INTERVALLE_2D : 0;
      dernierRendu = -Infinity;

      // Rendu statique sur mobile : le canvas 2D (< 768 px) est trop coûteux à
      // animer sous CPU contraint et sature le fil principal (TBT). On dessine
      // une seule image — la texture reste, le mouvement disparaît. Le shader
      // desktop et le repli 2D desktop continuent d'animer.
      const statiqueMobile =
        m === "2d" && !window.matchMedia(SEUIL_SHADER).matches;
      anime = !reduce && !statiqueMobile;

      dimensionner();
      start = performance.now();

      if (!anime) {
        engine.draw(0); // image unique (statique mobile ou mouvement réduit)
      } else if (visible) {
        lancerBoucle();
      }
    };

    // Jeton de génération : invalide le résultat d'un import asynchrone si le
    // moteur a été reconstruit entre-temps (franchissement du seuil au resize).
    let generation = 0;

    const construire = () => {
      arreterBoucle();
      if (engine) {
        engine.destroy();
        engine = null;
      }
      const jeton = ++generation;

      if (modeVoulu() === "shader") {
        // Import paresseux du renderer WebGL : son code ne part pas dans le
        // bundle mobile, il n'est récupéré que côté desktop, quand le shader
        // sert réellement.
        import("@/lib/webglRenderer").then(({ createShaderBg }) => {
          if (jeton !== generation) return; // reconstruit entre-temps
          const e = createShaderBg(canvas);
          if (e) {
            installer(e, "shader");
          } else {
            shaderIndisponible = true; // repli définitif si webgl2 échoue
            installer(create2DBg(canvas, params2D()), "2d");
          }
        });
        return;
      }
      installer(create2DBg(canvas, params2D()), "2d");
    };

    construire();

    // Armement différé : on attend l'événement `load`, puis un créneau
    // d'inactivité du fil principal (requestIdleCallback si disponible) avant
    // de lancer la boucle. Le rendu figé (reduce) est déjà posé par construire.
    const armer = () => {
      pretAAnimer = true;
      if (!reduce && visible) lancerBoucle();
    };
    const differer = () => {
      const ric = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
        }
      ).requestIdleCallback;
      if (ric) ric(armer, { timeout: 2000 });
      else setTimeout(armer, 200);
    };
    if (document.readyState === "complete") differer();
    else window.addEventListener("load", differer, { once: true });

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
      window.removeEventListener("load", differer);
      if (minuteur) clearTimeout(minuteur);
      arreterBoucle();
      io?.disconnect();
      if (engine) engine.destroy();
    };
  }, []);

  return <canvas ref={ref} id="trace" aria-hidden="true" />;
}
