/**
 * Contenu des pages « objets » (une page par catégorie sous /vendre/[slug]).
 * Chaque page a un contenu réellement distinct : rien n'est dupliqué ni inventé.
 */

export type FaqItem = { q: string; a: string };

export type Categorie = {
  slug: string;
  h1: string;
  /** <title> (< 60 caractères) */
  titre: string;
  /** meta description (< 155 caractères) */
  description: string;
  /** libellé court, réutilisé dans les listes de liens internes */
  lien: string;
  intro: string;
  vendIntro: string;
  vendExamples: string[];
  methode: string[];
  nePrendPas?: string;
  faq: FaqItem[];
  /** slugs de 2-3 autres catégories */
  related: string[];
};

export const categories: Categorie[] = [
  {
    slug: "vendre-vaisselle-ancienne-grasse",
    h1: "Vendre sa vaisselle ancienne à Grasse",
    titre: "Vendre sa vaisselle ancienne à Grasse | Topsail",
    description:
      "Service à domicile pour vendre votre vaisselle ancienne à Grasse : services, cristal, faïence, argenterie. Estimation gratuite, on s'occupe de tout.",
    lien: "Vaisselle ancienne",
    intro:
      "Vous avez hérité d'un service de table complet, de la porcelaine rangée depuis des années ou du cristal qui ne sert plus ? À Grasse et dans les environs, nous estimons votre vaisselle ancienne et nous la vendons pour vous, sans que vous ayez à faire les photos ni à gérer les acheteurs.",
    vendIntro:
      "La vaisselle ancienne se vend bien lorsqu'elle est présentée correctement et proposée aux bons acheteurs. Nous reprenons notamment :",
    vendExamples: [
      "Services de table complets en porcelaine (Limoges, Sèvres et autres fabriques)",
      "Assiettes, plats et soupières en faïence ancienne",
      "Verres, carafes et pièces en cristal (Baccarat, Saint-Louis, etc.)",
      "Services à café et à thé, théières et cafetières",
      "Argenterie de table : couverts, ménagères, plateaux",
      "Pièces dépareillées de belle qualité, vendues à l'unité ou en lot",
    ],
    methode: [
      "Nous commençons par regarder l'état, les marques et les poinçons. Une tasse ébréchée n'a pas la même valeur qu'un service complet et sans défaut : nous vous le disons franchement, pièce par pièce.",
      "Pour chaque lot, nous réalisons des photos soignées à la lumière du jour, nous rédigeons une description précise (fabrique, décor, nombre de pièces, état) et nous fixons avec vous un prix de vente ainsi qu'un prix minimum.",
      "La vaisselle ancienne trouve preneur sur des plateformes comme Leboncoin et Selency, et, pour les pièces signées ou de collection, sur eBay ou auprès de groupes de collectionneurs. Nous choisissons le canal le plus adapté à chaque lot.",
      "Vos pièces restent chez vous jusqu'à la vente. Nous organisons ensuite le retrait ou l'envoi soigné avec l'acheteur, et vous êtes payé après chaque vente, commission déduite.",
    ],
    nePrendPas:
      "Nous laissons de côté la vaisselle très courante et sans valeur de revente (services d'entrée de gamme dépareillés, pièces fortement ébréchées ou fêlées). En cas de doute, une photo suffit pour que l'on vous réponde.",
    faq: [
      {
        q: "Faut-il que le service soit complet ?",
        a: "Non, mais un service complet se vend mieux et plus cher. Les pièces isolées de belle qualité peuvent se vendre à l'unité ou être regroupées en un lot cohérent.",
      },
      {
        q: "Comment reconnaître de la porcelaine de valeur ?",
        a: "La marque sous la pièce, la finesse, le décor peint à la main et l'état sont de bons indices. Vous n'avez pas besoin de le savoir : nous identifions les pièces lors de l'estimation.",
      },
      {
        q: "Reprenez-vous l'argenterie ?",
        a: "Oui. Couverts, ménagères, plateaux et objets de table en métal argenté ou en argent massif font partie de ce que nous vendons régulièrement.",
      },
      {
        q: "Et la vaisselle dépareillée ?",
        a: "Elle peut se vendre en lot. Si sa valeur unitaire est trop faible, nous vous le disons et nous vous proposons de la regrouper pour qu'elle parte plus facilement.",
      },
    ],
    related: ["vendre-objets-deco-grasse", "vendre-objets-collection-grasse", "vendre-petit-mobilier-grasse"],
  },
  {
    slug: "vendre-objets-deco-grasse",
    h1: "Vendre ses objets de déco à Grasse",
    titre: "Vendre ses objets de déco à Grasse | Topsail",
    description:
      "Vendez vos objets de décoration à Grasse sans effort : cadres, miroirs, vases, bibelots. Estimation gratuite à domicile, nous vendons pour vous.",
    lien: "Objets de déco",
    intro:
      "Un intérieur qu'on renouvelle, un grenier qu'on vide, des bibelots qui ne trouvent plus leur place : les objets de décoration se revendent très bien lorsqu'ils sont mis en valeur. À Grasse et alentours, nous nous en chargeons du début à la fin.",
    vendIntro: "La décoration couvre un large éventail d'objets. Nous vendons pour vous, entre autres :",
    vendExamples: [
      "Miroirs anciens, dorés ou biseautés",
      "Cadres, gravures, petites toiles et affiches encadrées",
      "Vases, coupes et objets en verre ou en céramique",
      "Statuettes, bronzes et sujets décoratifs",
      "Horloges, pendules et petites pièces d'horlogerie",
      "Objets régionaux et souvenirs de voyage de qualité",
    ],
    methode: [
      "La décoration est une affaire de présentation. Nous mettons chaque objet en scène, sur un fond neutre et à la bonne lumière, pour donner envie sans jamais tromper l'acheteur sur l'état réel.",
      "Nous fixons un prix cohérent avec ce qui se vend réellement, pas un montant affiché au hasard. Vous validez un prix minimum, et rien n'est bradé sans votre accord.",
      "Selon le style et la valeur, nous publions sur Leboncoin, sur Selency pour la déco vintage et de caractère, ou sur Vinted, et nous répondons aux acheteurs à votre place.",
      "Vous n'avez rien à déplacer : les objets restent chez vous jusqu'à la vente, puis nous organisons le retrait ou l'expédition.",
    ],
    nePrendPas:
      "Nous laissons de côté la décoration très récente sans valeur de revente, ainsi que les objets trop abîmés. Un ensemble de petits objets peut en revanche partir groupé.",
    faq: [
      {
        q: "Mes bibelots ont-ils de la valeur ?",
        a: "Certains oui, d'autres non : cela dépend de la matière, de l'âge, de la signature et de la mode. Nous faisons le tri avec vous, sans vous pousser à vendre ce qui n'en vaut pas la peine.",
      },
      {
        q: "Vendez-vous les tableaux et les cadres ?",
        a: "Oui, les cadres, gravures et petites toiles décoratives. Pour une œuvre signée susceptible d'avoir une réelle valeur artistique, nous vous orientons vers le bon interlocuteur.",
      },
      {
        q: "Et les petits lots d'objets ?",
        a: "Ils se vendent très bien groupés par thème ou par style. C'est souvent la meilleure façon d'écouler de nombreux petits objets.",
      },
      {
        q: "Dois-je nettoyer les objets avant ?",
        a: "Ce n'est pas indispensable. Un dépoussiérage simple suffit ; nous nous occupons de la présentation photo.",
      },
    ],
    related: ["vendre-vaisselle-ancienne-grasse", "vendre-luminaires-vintage-grasse", "vendre-objets-collection-grasse"],
  },
  {
    slug: "vendre-luminaires-vintage-grasse",
    h1: "Vendre ses luminaires et lampes vintage à Grasse",
    titre: "Vendre ses luminaires vintage à Grasse | Topsail",
    description:
      "Lampes, lustres et appliques vintage : vendez vos luminaires à Grasse sans vous déplacer. Estimation gratuite, nous photographions et vendons.",
    lien: "Luminaires vintage",
    intro:
      "Une lampe de créateur oubliée, un lustre en cristal, des appliques des années 60 ou 70 : les luminaires vintage sont très recherchés. À Grasse et dans les environs, nous les estimons et les vendons pour vous.",
    vendIntro: "Le luminaire ancien et vintage a un vrai marché. Nous reprenons par exemple :",
    vendExamples: [
      "Lampes de bureau et de salon, design ou anciennes",
      "Lustres en cristal, en laiton ou en verre de Murano",
      "Appliques murales et plafonniers vintage",
      "Lampadaires des décennies 1950 à 1980",
      "Luminaires de créateurs et pièces signées",
      "Abat-jour et pieds de lampe de qualité",
    ],
    methode: [
      "Nous vérifions d'abord l'état et, dans la mesure du possible, le fonctionnement électrique : un luminaire testé se vend plus facilement. Nous signalons toujours ce qui devra être remis aux normes par l'acheteur.",
      "Nous photographions la pièce allumée et éteinte, sous plusieurs angles, et nous renseignons le style, l'époque et le matériau.",
      "Les luminaires de caractère se vendent bien sur Selency et Leboncoin, et les pièces de designers reconnus sur eBay ou des sites spécialisés. Nous ciblons les acheteurs qui recherchent ce type d'objet.",
      "Comme pour le reste, la pièce reste chez vous jusqu'à la vente, et vous êtes payé après chaque transaction, commission déduite.",
    ],
    nePrendPas:
      "Nous ne reprenons pas les luminaires d'entrée de gamme récents ni les pièces dont le câblage est trop dégradé pour être vendues en l'état sans danger.",
    faq: [
      {
        q: "Faut-il que la lampe fonctionne ?",
        a: "C'est préférable, mais pas toujours indispensable : certaines pièces se vendent pour être restaurées. Nous précisons l'état électrique dans l'annonce.",
      },
      {
        q: "Comment savoir si un luminaire est de créateur ?",
        a: "Une signature, une étiquette ou un modèle reconnaissable sont des indices. Nous identifions les pièces intéressantes lors de l'estimation.",
      },
      {
        q: "Reprenez-vous les lustres à pampilles ?",
        a: "Oui, les lustres en cristal et à pampilles se vendent bien, à condition d'être complets ou presque. Nous vous conseillons sur la mise en vente.",
      },
      {
        q: "Vous occupez-vous de l'emballage ?",
        a: "Oui. Les luminaires étant fragiles, nous organisons un retrait soigné ou un emballage adapté pour l'expédition.",
      },
    ],
    related: ["vendre-objets-deco-grasse", "vendre-petit-mobilier-grasse", "vendre-objets-collection-grasse"],
  },
  {
    slug: "vendre-petit-mobilier-grasse",
    h1: "Vendre son petit mobilier à Grasse",
    titre: "Vendre son petit mobilier à Grasse | Topsail",
    description:
      "Chevets, chaises, guéridons, tables d'appoint : vendez votre petit mobilier à Grasse. Estimation gratuite à domicile, nous vendons pour vous.",
    lien: "Petit mobilier",
    intro:
      "Le petit mobilier — celui qui tient dans une voiture — se revend facilement quand il est bien présenté. À Grasse et alentours, nous estimons et vendons vos petites pièces sans que vous ayez à publier d'annonce ni à recevoir d'inconnus chez vous.",
    vendIntro: "Nous nous concentrons sur le petit mobilier et les pièces transportables, notamment :",
    vendExamples: [
      "Chevets, bouts de canapé et tables d'appoint",
      "Chaises, tabourets et petits fauteuils",
      "Guéridons, sellettes et petites consoles",
      "Étagères, petites bibliothèques et casiers",
      "Petits meubles d'appoint vintage ou de style",
      "Miroirs sur pied et petits meubles à tiroirs",
    ],
    methode: [
      "Nous évaluons le style, l'état et la solidité. Une pièce vintage recherchée n'a pas la même valeur qu'un meuble courant : nous vous donnons un prix réaliste, pas une estimation flatteuse.",
      "Nous soignons les photos (angles, détails, défauts éventuels montrés honnêtement) et nous indiquons des dimensions précises, car c'est ce que demandent les acheteurs de mobilier.",
      "Le petit mobilier se vend surtout sur Leboncoin et Selency. Nous gérons les échanges, les questions sur les dimensions et l'organisation de l'enlèvement.",
      "Nous ne prenons que ce qui tient dans une voiture. Les pièces restent chez vous jusqu'à la vente ; l'acheteur vient ensuite les récupérer ou nous organisons le transport.",
    ],
    nePrendPas:
      "Nous ne prenons pas les gros meubles (armoires, buffets, canapés, grandes tables) ni les meubles très abîmés. Pour ces pièces volumineuses, notre service n'est pas adapté.",
    faq: [
      {
        q: "Qu'entendez-vous par petit mobilier ?",
        a: "Des pièces transportables dans une voiture : chevets, chaises, guéridons, petites étagères. Tout ce qui est volumineux ou lourd ne relève pas de notre service.",
      },
      {
        q: "Reprenez-vous les gros meubles ?",
        a: "Non. Nous sommes spécialisés dans les petits objets et le petit mobilier. Pour une armoire ou un canapé, mieux vaut vous tourner vers un autre professionnel.",
      },
      {
        q: "Faut-il restaurer le meuble avant ?",
        a: "Non. Une pièce en jus, honnêtement décrite, trouve souvent preneur. Nous montrons les défauts plutôt que de les cacher.",
      },
      {
        q: "Comment se passe l'enlèvement ?",
        a: "Le meuble reste chez vous jusqu'à la vente. Ensuite, l'acheteur vient le chercher ou nous organisons le transport avec lui.",
      },
    ],
    related: ["vendre-objets-deco-grasse", "vendre-luminaires-vintage-grasse", "vendre-vaisselle-ancienne-grasse"],
  },
  {
    slug: "vendre-objets-collection-grasse",
    h1: "Vendre ses objets de collection et de brocante à Grasse",
    titre: "Vendre ses objets de collection à Grasse | Topsail",
    description:
      "Pièces de collection et brocante à Grasse : monnaies, cartes, jouets anciens, curiosités. Estimation gratuite, nous vendons aux bons acheteurs.",
    lien: "Objets de collection & brocante",
    intro:
      "Les objets de collection et de brocante demandent de savoir à qui les proposer : c'est souvent là que se joue le prix. À Grasse et dans les environs, nous identifions vos pièces et nous les vendons aux acheteurs qui les recherchent vraiment.",
    vendIntro: "La brocante et la collection couvrent des univers très variés. Nous vendons notamment :",
    vendExamples: [
      "Monnaies, billets et médailles",
      "Cartes postales anciennes, timbres et vieux papiers",
      "Jouets et jeux anciens, figurines, trains électriques",
      "Objets publicitaires, plaques émaillées et réclames",
      "Petits objets de marine et de curiosité (hors armes)",
      "Livres anciens et pièces insolites",
    ],
    methode: [
      "La valeur d'une pièce de collection tient à des détails que l'amateur connaît : année, tirage, variante, état de conservation. Nous prenons le temps d'identifier ce que vous avez avant d'annoncer un prix.",
      "Nous photographions les pièces avec les détails qui comptent (revers d'une monnaie, dos d'une carte, marquages) et nous décrivons précisément chaque lot.",
      "Pour ce type d'objets, les meilleurs canaux sont souvent spécialisés : eBay, Delcampe, Catawiki ou des groupes de collectionneurs, en plus de Leboncoin. Nous choisissons celui qui touchera le bon public.",
      "Les pièces restent chez vous jusqu'à la vente. Pour les petits objets de valeur, nous soignons particulièrement l'emballage et le suivi de l'envoi.",
    ],
    nePrendPas:
      "Nous ne vendons pas les armes ni les objets dangereux ou réglementés. Pour tout ce qui relève d'une réglementation particulière, nous vous orientons vers l'interlocuteur adéquat.",
    faq: [
      {
        q: "Comment savez-vous ce que vaut une pièce ?",
        a: "Par comparaison avec les ventes réelles récentes et, si besoin, l'avis de collectionneurs. Nous restons prudents : mieux vaut un prix juste qu'une promesse intenable.",
      },
      {
        q: "Vendez-vous les petites collections en lot ?",
        a: "Oui. Selon les cas, un lot complet se vend mieux qu'une multitude de petites annonces. Nous choisissons la formule la plus efficace.",
      },
      {
        q: "Reprenez-vous les vieux papiers et cartes postales ?",
        a: "Oui, ils ont un vrai marché auprès des collectionneurs, notamment sur les plateformes spécialisées.",
      },
      {
        q: "Et si je ne connais pas l'origine d'un objet ?",
        a: "Ce n'est pas un problème. Notre travail commence justement par l'identification, à partir des marquages et des indices présents sur la pièce.",
      },
    ],
    related: ["vendre-vaisselle-ancienne-grasse", "vendre-objets-deco-grasse", "vendre-objets-succession-grasse"],
  },
  {
    slug: "vendre-objets-succession-grasse",
    h1: "Vendre les objets d'une succession à Grasse",
    titre: "Vendre les objets d'une succession à Grasse | Topsail",
    description:
      "Succession à Grasse : nous estimons et vendons les objets de valeur avec discrétion. Estimation gratuite à domicile, à votre rythme.",
    lien: "Objets de succession",
    intro:
      "Vider la maison d'un proche est une étape délicate, où le temps et l'énergie manquent souvent. À Grasse et alentours, nous vous aidons à repérer ce qui a de la valeur et à le vendre, avec discrétion et sans précipitation.",
    vendIntro: "Dans une succession, beaucoup d'objets peuvent trouver acquéreur. Nous nous chargeons par exemple de :",
    vendExamples: [
      "La vaisselle, le cristal et l'argenterie de famille",
      "Les objets de décoration, miroirs, cadres et bibelots",
      "Les luminaires et le petit mobilier transportable",
      "Les collections (monnaies, timbres, cartes, curiosités)",
      "Les objets de valeur oubliés dans les placards et le grenier",
      "Les lots d'objets divers, vendus groupés",
    ],
    methode: [
      "Nous intervenons à votre rythme, en lien avec vous et, si vous le souhaitez, avec les autres héritiers. Rien n'est emporté ni vendu sans votre accord écrit.",
      "Nous faisons le tri entre ce qui a une réelle valeur de revente et le reste. Nous vous le disons honnêtement, pour que vous décidiez en connaissance de cause.",
      "Chaque objet retenu est photographié, décrit et mis en vente sur le canal le plus adapté (Leboncoin, Selency, eBay ou sites spécialisés selon la pièce).",
      "Les objets restent sur place jusqu'à leur vente. Vous recevez le produit des ventes après chaque transaction, commission déduite, avec le détail de ce qui a été vendu.",
    ],
    nePrendPas:
      "Nous ne faisons pas de débarras : notre métier est de vendre ce qui a de la valeur, pas de vider entièrement un logement. Nous ne prenons pas non plus les gros meubles.",
    faq: [
      {
        q: "Intervenez-vous en présence des héritiers ?",
        a: "Oui, autant que vous le souhaitez. Nous avançons avec votre accord et celui des personnes concernées, à chaque étape.",
      },
      {
        q: "Est-ce discret ?",
        a: "Oui. Nous savons que ces moments sont sensibles et nous travaillons avec discrétion, sans jugement et sans pression.",
      },
      {
        q: "Combien de temps cela prend-il ?",
        a: "Cela dépend du nombre d'objets et de la rapidité des ventes. Il n'y a pas d'échéance imposée : nous avançons à votre rythme.",
      },
      {
        q: "Que deviennent les objets invendus ?",
        a: "Ils restent chez vous. Nous pouvons baisser un prix avec votre accord ou retirer une pièce de la vente ; nous ne faisons pas de débarras.",
      },
    ],
    related: ["vendre-vaisselle-ancienne-grasse", "vendre-objets-collection-grasse", "vendre-objets-deco-grasse"],
  },
];

export function getCategorie(slug: string): Categorie | undefined {
  return categories.find((c) => c.slug === slug);
}
