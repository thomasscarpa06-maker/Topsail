// Fond canvas 2D du hero (< 768 px, ou repli si webgl2 indisponible).
//
// Les 7 courbes gaussiennes de reference.html, recolorées pour le fond sombre :
// filaments olive clair (#3E8A66) et une ligne safran (#D98C1F). Le canvas est
// transparent — l'encre du hero transparaît derrière. devicePixelRatio ≤ 1.5.

import type { HeroBg } from "./heroBg";

const LIGNES = 7;

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

export function create2DBg(canvas: HTMLCanvasElement): HeroBg {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let l = 0;
  let h = 0;

  function dessiner(temps: number) {
    ctx.clearRect(0, 0, l, h);
    const base = h * 0.9;
    const echelle = h * 0.42;

    for (let i = 0; i < LIGNES; i++) {
      const prof = i / (LIGNES - 1);
      ctx.beginPath();
      for (let px = 0; px <= l; px += 6) {
        const y = base - i * (h * 0.045) - hauteur(px / l, i, temps) * echelle;
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      // Recolorée pour le fond sombre : safran vif pour la 2e ligne,
      // olive clair pour les autres.
      ctx.strokeStyle =
        i === 1
          ? `rgba(217,140,31,${0.72 - prof * 0.15})`
          : `rgba(62,138,102,${0.5 - prof * 0.32})`;
      ctx.lineWidth = i === 1 ? 1.6 : 1.1;
      ctx.stroke();
    }
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
