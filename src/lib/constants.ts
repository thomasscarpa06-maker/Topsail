/**
 * Valeurs à confirmer par le propriétaire du site, isolées ici plutôt que
 * codées en dur dans le JSX (voir BRIEF.md § Contenu).
 */

// Nom de la marque : une seule majuscule, jamais « TopSail ».
export const MARQUE = "Topsail";

// Sous-titre de la marque (en-tête / pied de page).
export const MARQUE_SOUS_TITRE = "Sites web · Grasse";

/**
 * Pastille de disponibilité du hero.
 * Le nombre de créneaux annoncés reste à confirmer par le propriétaire.
 * Textes repris au mot près depuis reference.html.
 */
export const DISPONIBILITE = {
  capacite: "Deux sites par mois",
  creneau: "· un créneau libre en septembre",
} as const;
