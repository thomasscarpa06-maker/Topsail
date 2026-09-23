/**
 * Configuration centrale du site Topsail (dépôt-vente à domicile).
 *
 * Toutes les informations encore à décider sont ici, avec la valeur `null`
 * et un commentaire TODO. Tant qu'une valeur est `null`, le site affiche
 * un repère « À définir » à l'endroit concerné : il suffit de remplir
 * la valeur ci-dessous pour qu'elle apparaisse partout.
 */

export const site = {
  name: "Topsail",
  url: "https://topsail-grasse.fr",
  email: "contact@topsail-grasse.fr",

  // TODO [À DÉFINIR] : numéro de téléphone affiché (ex. "06 12 34 56 78")
  phone: null as string | null,

  // TODO [PHOTO] : déposer une photo dans /public (ex. /hero.jpg, objets chinés dans une maison)
  // puis indiquer son chemin ici. Tant que c'est null, le hero affiche les étiquettes illustrées.
  heroImage: null as string | null,

  // Lien de prise de rendez-vous (TODO : renommer l'événement Calendly en « Estimation 15 min »)
  calendly: "https://calendly.com/topsail-grasse/20min",

  tarifs: {
    // Texte libre affiché dans la section Tarifs.
    estimation: "Gratuite" as string | null,

    // Commission en % du prix de vente.
    commissionPct: 30 as number | null,

    // Valeur minimum par objet en euros.
    valeurMinimum: 20 as number | null,

    // Nombre de semaines avant qu'un objet soit considéré comme invendu.
    semainesInvendu: 8 as number | null,
  },

  // TODO [À DÉFINIR] : délai de paiement après une vente (ex. "sous 7 jours")
  delaiPaiement: null as string | null,

  // TODO [À DÉFINIR] : où sont stockés les objets en attente de vente
  stockage: null as string | null,

  // TODO [À CONFIRMER] : passer à true une fois l'assurance RC Pro souscrite
  assuranceSouscrite: false,

  // TODO [À VALIDER] : liste des communes couvertes (exemples repris du cahier des charges)
  communes: [
    "Grasse",
    "Mouans-Sartoux",
    "Mougins",
    "Peymeinade",
    "Le Rouret",
    "Châteauneuf",
    "Cabris",
    "Magagnosc",
    "Plascassier",
  ],
  communesValidees: true,

  mentionsLegales: {
    // TODO [À DÉFINIR] : nom et prénom du porteur de la micro-entreprise
    editeur: null as string | null,
    // TODO [À DÉFINIR après immatriculation]
    siret: null as string | null,
    // TODO [À DÉFINIR] : adresse de l'entreprise
    adresse: null as string | null,
    // TODO [À DÉFINIR] : référence de la déclaration de revendeur d'objets mobiliers (préfecture 06)
    declarationRevendeur: null as string | null,
  },
};

export type Faq = { q: string; a: string };

/** FAQ : utilisée à la fois pour l'affichage et pour le JSON-LD FAQPage. */
export function getFaq(): Faq[] {
  const t = site.tarifs;
  return [
    {
      q: "Combien ça coûte ?",
      a: `Rien à l'avance. Nous prenons une commission${
        t.commissionPct ? ` de ${t.commissionPct} %` : ""
      } uniquement sur ce qui est vendu. Si rien ne se vend, vous ne payez rien.`,
    },
    {
      q: "Comment sont fixés les prix ?",
      a: "Ensemble. Nous vous proposons un prix de vente pour chaque objet et vous validez un prix minimum en dessous duquel nous ne vendons pas.",
    },
    {
      q: "Quand suis-je payé ?",
      a: `Après chaque vente${
        site.delaiPaiement ? `, ${site.delaiPaiement}` : ""
      }, commission déduite, avec le détail de la vente.`,
    },
    {
      q: "Où sont stockés mes objets ?",
      a:
        site.stockage ??
        "Chez vous. Nous n'avons pas d'entrepôt : vos objets restent à leur place jusqu'à la vente, et nous organisons le retrait avec l'acheteur.",
    },
    {
      q: "Et si un objet ne se vend pas ?",
      a: "Il reste chez vous, tout simplement. Nous pouvons baisser le prix avec votre accord, ou le retirer de la vente.",
    },
    {
      q: "Mes objets sont-ils assurés ?",
      a: site.assuranceSouscrite
        ? "Oui, les objets qui nous sont confiés sont couverts par notre assurance professionnelle."
        : "Nous vous précisons les conditions de prise en charge lors de l'estimation et dans le mandat de vente.",
    },
    {
      q: "Intervenez-vous pour une succession ?",
      a: "Oui, avec discrétion. Nous repérons les objets qui ont de la valeur et nous les vendons pour vous.",
    },
  ];
}
