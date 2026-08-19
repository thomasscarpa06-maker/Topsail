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
  capacite: "Quatre sites par mois",
  creneau: "· un créneau libre en septembre",
} as const;

/** Lien Calendly réel de l'appel de 20 min. */
export const CALENDLY_URL = "https://calendly.com/topsail-grasse/20min";

/** Adresse de contact (reprise de reference.html). */
export const EMAIL = "contact@topsail.fr";

/** URL canonique du site (à confirmer par le propriétaire). */
export const SITE_URL = "https://topsail.fr";

/**
 * Mentions légales — valeurs à renseigner par le propriétaire.
 */
export const MENTIONS = {
  nomComplet: "[Nom complet à renseigner]",
  siren: "[SIREN à renseigner]",
  adresse: "[Adresse à renseigner]",
} as const;

/**
 * Scores PageSpeed Insights (mobile) affichés dans « Pourquoi Topsail ».
 * Valeurs à confirmer / mettre à jour par le propriétaire.
 */
export const PERF_INDICATEURS = [
  { label: "Performance", valeur: 88 },
  { label: "Accessibilité", valeur: 96 },
  { label: "SEO", valeur: 100 },
] as const;
