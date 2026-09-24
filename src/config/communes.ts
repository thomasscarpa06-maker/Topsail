/**
 * Contenu des pages « communes » (/depot-vente/[commune]).
 * Le nom des communes vient de src/config/site.ts ; ici on ajoute, pour chaque
 * commune, une introduction formulée différemment et une question de FAQ propre
 * au déplacement. Aucun fait local n'est inventé (ni distance, ni population,
 * ni anecdote) : uniquement l'appartenance au Pays de Grasse, qui est réelle.
 */
import { site } from "./site";
import { slugify } from "@/lib/slug";
import type { FaqItem } from "./categories";

type ContenuCommune = { intro: string; deplacement: FaqItem };

const contenu: Record<string, ContenuCommune> = {
  Grasse: {
    intro:
      "Grasse est notre point d'ancrage : c'est ici que nous nous déplaçons le plus souvent pour estimer et vendre les objets des habitants. Quel que soit votre quartier, nous venons chez vous, gratuitement, regarder ce qui peut se vendre.",
    deplacement: {
      q: "Vous déplacez-vous partout à Grasse ?",
      a: "Oui, dans tous les quartiers de Grasse. Nous convenons ensemble d'un créneau et nous venons chez vous pour l'estimation, sans engagement.",
    },
  },
  "Mouans-Sartoux": {
    intro:
      "Vous habitez Mouans-Sartoux et vous souhaitez vendre des objets sans y passer vos week-ends ? Nous nous déplaçons chez vous pour estimer votre vaisselle, votre déco, vos luminaires ou votre petit mobilier, puis nous nous occupons de la vente de bout en bout.",
    deplacement: {
      q: "Intervenez-vous à Mouans-Sartoux sans frais de déplacement ?",
      a: "Oui, l'estimation à domicile à Mouans-Sartoux est gratuite et sans engagement. Vous ne payez qu'une commission sur ce qui est effectivement vendu.",
    },
  },
  Mougins: {
    intro:
      "À Mougins, nous proposons un service simple : vous nous montrez ce dont vous voulez vous séparer, nous l'estimons sur place et nous le vendons pour vous. Vous n'avez ni annonce à rédiger, ni acheteur à recevoir chez vous.",
    deplacement: {
      q: "Comment se passe un rendez-vous à Mougins ?",
      a: "Nous convenons d'un créneau, nous venons chez vous à Mougins, nous regardons les objets ensemble et nous fixons les prix. Tout part de là, à votre rythme.",
    },
  },
  Peymeinade: {
    intro:
      "Peymeinade fait partie des communes où nous intervenons régulièrement. Si vous avez des objets, de la déco ou du petit mobilier à vendre, nous venons les estimer chez vous et nous prenons en charge toute la vente.",
    deplacement: {
      q: "Faut-il apporter les objets ou venez-vous à Peymeinade ?",
      a: "Nous venons à vous. Vos objets restent chez vous à Peymeinade jusqu'à la vente ; vous n'avez rien à transporter.",
    },
  },
  "Le Rouret": {
    intro:
      "Au Rouret, vendre soi-même ses objets peut vite devenir chronophage entre les photos, les annonces et les rendez-vous. Nous faisons tout cela à votre place, après une estimation gratuite à domicile.",
    deplacement: {
      q: "Le Rouret est-il bien dans votre zone ?",
      a: "Oui, Le Rouret fait partie des communes que nous desservons. Contactez-nous et nous conviendrons d'un passage.",
    },
  },
  "Châteauneuf": {
    intro:
      "Vous résidez à Châteauneuf et vous avez des objets de valeur qui ne servent plus ? Nous nous déplaçons chez vous pour les estimer, puis nous les mettons en vente et nous vous reversons l'argent, commission déduite.",
    deplacement: {
      q: "Vous déplacez-vous jusqu'à Châteauneuf ?",
      a: "Oui. Nous convenons d'un rendez-vous et nous venons chez vous à Châteauneuf pour l'estimation, gratuitement et sans engagement.",
    },
  },
  Cabris: {
    intro:
      "Cabris fait partie de notre secteur d'intervention. Que vous vidiez un placard, prépariez un déménagement ou gériez une succession, nous venons estimer vos objets sur place et nous nous occupons de les vendre.",
    deplacement: {
      q: "Intervenez-vous à Cabris ?",
      a: "Oui, Cabris fait partie des communes où nous nous rendons. Il suffit de convenir d'un créneau ensemble.",
    },
  },
  Magagnosc: {
    intro:
      "À Magagnosc, nous proposons le même service que partout ailleurs dans le Pays de Grasse : une estimation gratuite chez vous, puis la vente de vos objets, de votre déco ou de votre petit mobilier, sans que vous ayez à vous en occuper.",
    deplacement: {
      q: "Comment prendre rendez-vous à Magagnosc ?",
      a: "Envoyez-nous quelques photos ou un message via le formulaire : nous vous répondons et nous fixons un passage à Magagnosc.",
    },
  },
  Plascassier: {
    intro:
      "Vous habitez Plascassier et vous préférez confier la vente de vos objets plutôt que de gérer les annonces vous-même ? Nous venons les estimer chez vous et nous prenons tout en charge jusqu'au paiement.",
    deplacement: {
      q: "Le déplacement à Plascassier est-il gratuit ?",
      a: "Oui, l'estimation à domicile à Plascassier est gratuite. Vous ne réglez qu'une commission sur les objets réellement vendus.",
    },
  },
};

export type Commune = {
  nom: string;
  slug: string;
  intro: string;
  deplacement: FaqItem;
};

/** Repli neutre si une commune de site.communes n'a pas encore de contenu dédié. */
function repli(nom: string): ContenuCommune {
  return {
    intro: `Vous habitez ${nom} et vous avez des objets à vendre ? Nous venons les estimer chez vous, gratuitement, puis nous nous occupons de toute la vente dans le Pays de Grasse.`,
    deplacement: {
      q: `Vous déplacez-vous à ${nom} ?`,
      a: `Oui, ${nom} fait partie des communes que nous desservons. Nous convenons ensemble d'un créneau pour l'estimation à domicile.`,
    },
  };
}

export const communes: Commune[] = site.communes.map((nom) => {
  const c = contenu[nom] ?? repli(nom);
  return { nom, slug: slugify(nom), intro: c.intro, deplacement: c.deplacement };
});

export function getCommuneBySlug(slug: string): Commune | undefined {
  return communes.find((c) => c.slug === slug);
}

/** Trois autres communes de la liste, à titre de liens internes de proximité. */
export function communesProches(slug: string, n = 3): Commune[] {
  const i = communes.findIndex((c) => c.slug === slug);
  if (i < 0) return [];
  const out: Commune[] = [];
  for (let k = 1; k <= communes.length && out.length < n; k++) {
    out.push(communes[(i + k) % communes.length]);
  }
  return out;
}
