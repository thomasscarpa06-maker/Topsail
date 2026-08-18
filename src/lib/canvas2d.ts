// Fond canvas 2D du hero (< 768 px uniquement, ou repli si webgl2 indisponible).
//
// Sur mobile, l'objectif n'est pas un tracé net mais une texture diffuse et
// brumeuse en bas d'écran, proche de l'ambiance du shader desktop : gaussiennes
// très élargies, amplitude faible, couleurs désaturées, faible opacité et un
// léger flou. Le canvas est transparent — l'encre du hero transparaît derrière.
// devicePixelRatio ≤ 1.5.

import type { HeroBg } from "./heroBg";

const LIGNES = 7;
const FLOU = 1.4; // léger flou (px) pour diffuser les courbes

// Somme de gaussiennes larges et basses : des ondulations douces, pas des pics.
function hauteur(x: number, i: number, temps: number) {
  const pics: [number, number, number][] = [
    [0.18, 0.15, 0.3],
    [0.34, 0.11, 0.5],
    [0.46, 0.1, 0.24],
    [0.61, 0.14, 0.42],
    [0.79, 0.11, 0.32],
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

export function create2DBg(canvas: HTMLCanvasElement): HeroBg {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let l = 0;
  let h = 0;

  function dessiner(temps: number) {
    ctx.clearRect(0, 0, l, h);
    ctx.filter = `blur(${FLOU}px)`;
    const base = h * 0.9;
    // Amplitude fortement réduite : ondulations basses, groupées vers le bas.
    const echelle = h * 0.14;

    for (let i = 0; i < LIGNES; i++) {
      const prof = i / (LIGNES - 1);
      ctx.beginPath();
      for (let px = 0; px <= l; px += 6) {
        const y = base - i * (h * 0.032) - hauteur(px / l, i, temps) * echelle;
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      // Couleurs désaturées et très peu opaques : safran adouci pour la 2e
      // ligne, bleu ardoise éteint pour les autres.
      ctx.strokeStyle =
        i === 1
          ? `rgba(196,158,96,${0.2 - prof * 0.05})`
          : `rgba(88,120,150,${0.16 - prof * 0.1})`;
      ctx.lineWidth = i === 1 ? 1.5 : 1.2;
      ctx.stroke();
    }
    ctx.filter = "none";
  }

  return {
    resize(cssWidth, cssHeight) {
      l = cssWidth;
      h = cssHeight;
      canvas.width = Math.max(1, Math.round(cssWidth * dpr));
      canvas.height = Math.max(1, Math.round(cssHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    draw(timeMs) {
      // Même vitesse que reference.html : t += 0.006 par image (~16,7 ms).
      dessiner(timeMs * 0.00036);
    },
    destroy() {
      /* rien à libérer pour le contexte 2D */
    },
  };
}
