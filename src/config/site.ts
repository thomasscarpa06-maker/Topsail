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
    // TODO [À DÉFINIR] : nom et prénom du porteur de la micro-entreprise
    editeur: null as string | null,
    // TODO [À DÉFINIR après immatriculation]
    siret: null as string | null,
    // TODO [À DÉFINIR] : adresse de l'entreprise
    adresse: null as string | null,
  },
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
      a: "Le tarif dépend de votre activité et de votre volume de clients. On vous le présente après l'audit gratuit, sans engagement.",
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
