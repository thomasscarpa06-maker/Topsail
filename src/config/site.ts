/**
 * Configuration centrale du site Topsail (réputation Google des commerces
 * du Pays de Grasse). Les informations à confirmer par le propriétaire sont
 * en `null` avec un commentaire TODO ; le composant <Todo> affiche alors un
 * repère « À définir » à l'endroit concerné.
 */

export const site = {
  name: "Topsail",
  url: "https://topsail-grasse.fr",
  email: "contact@topsail-grasse.fr",

  // TODO [À DÉFINIR] : numéro de téléphone affiché (ex. "06 12 34 56 78")
  phone: null as string | null,

  mentionsLegales: {
    // Nom et prénom du porteur de la micro-entreprise (éditeur + directeur de publication).
    editeur: "Thomas Scarpa" as string | null,
    // SIRET : laisser null tant que l'immatriculation n'est pas finalisée
    // (les pages légales affichent alors « Immatriculation en cours »).
    siret: null as string | null,
    // Adresse de l'entreprise.
    adresse: "24 avenue Sidi Brahim, 06130 GRASSE" as string | null,
  },
};

/** Formulation unique de la plaque, réutilisée partout (offre, inclus, FAQ). */
const PLAQUE_DESCRIPTION =
  "plaque NFC + QR code prête à l'emploi, configurée par nos soins avec le lien d'avis de votre fiche Google";

/** Offre commerciale (section « L'offre »). */
export const offre = {
  /** Prix de l'abonnement mensuel, en euros. */
  prixMensuel: 49,
  /** Prix de la plaque seule (paiement unique), en euros. */
  plaquePrix: 29,
  /** Description courte de la plaque, réutilisable. */
  plaqueDescription: PLAQUE_DESCRIPTION,
  /** Texte complet de la carte « Juste la plaque ? ». */
  plaqueCarte:
    "Prête à l'emploi : configurée par nos soins avec le lien d'avis de votre fiche Google, vous n'avez qu'à la poser. Grasse et alentours.",
  /** Bandeau d'installation offerte (carte principale). */
  installation: `Installation offerte (plaque d'une valeur de 29 €) : ${PLAQUE_DESCRIPTION}.`,
};

/** Secteurs d'activité (liste du formulaire d'audit). */
export const activites = [
  "Restaurant",
  "Café-bar",
  "Coiffeur-institut",
  "Garage",
  "Artisan",
  "Hébergement",
  "Commerce",
  "Santé",
  "Autre",
] as const;

/** « Pour qui » — pastilles affichées sur l'accueil. */
export const pourQui = [
  "Restaurants",
  "Cafés & bars",
  "Coiffeurs & instituts",
  "Garages",
  "Artisans du bâtiment",
  "Hébergements & gîtes",
  "Commerces de proximité",
  "Professions de santé",
] as const;

export type Faq = { q: string; a: string };

/** FAQ : affichage ET JSON-LD FAQPage. */
export function getFaq(): Faq[] {
  return [
    {
      q: "Combien ça coûte ?",
      a: `${offre.prixMensuel} € par mois, sans engagement. L'installation est offerte : ${offre.plaqueDescription}.`,
    },
    {
      q: "Est-ce que c'est légal ?",
      a: "Oui. On ne crée aucun faux avis et on sollicite tous vos clients, comme Google le demande.",
    },
    {
      q: "Je dois faire quoi, moi ?",
      a: "Presque rien : valider les réponses proposées en un clic, quand vous avez un moment.",
    },
    {
      q: "Et si je reçois un avis négatif ?",
      a: "Vous êtes alerté tout de suite et on vous propose une réponse calme et professionnelle.",
    },
    {
      q: "Je peux arrêter quand je veux ?",
      a: "Oui, sans engagement.",
    },
    {
      q: "Combien de temps avant de voir des résultats ?",
      a: "Les premiers avis arrivent dès les premières semaines ; la note évolue au rythme de vos clients.",
    },
  ];
}
