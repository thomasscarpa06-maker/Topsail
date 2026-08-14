/**
 * Interface commune aux deux fonds animés du hero (shader WebGL ≥ 768 px,
 * canvas 2D < 768 px). Le composant orchestre la boucle ; chaque moteur ne
 * fait que se redimensionner et dessiner une image pour un instant donné.
 */
export type HeroBg = {
  /** Redimensionne le canvas aux dimensions CSS du hero (le moteur applique
   *  son propre plafond de devicePixelRatio). */
  resize: (cssWidth: number, cssHeight: number) => void;
  /** Dessine une image pour l'instant `timeMs` (millisecondes écoulées). */
  draw: (timeMs: number) => void;
  /** Libère les ressources (contexte, buffers). */
  destroy: () => void;
};
