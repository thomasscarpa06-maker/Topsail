# Cahier des charges — Topsail, site vitrine

## Contexte

Site vitrine de **Topsail**, développeur web indépendant basé à Grasse. Cible :
commerces, artisans et professions libérales du bassin grassois et cannois.
Objectif unique de la page : **faire réserver un appel de 20 minutes**. Tout le
reste est secondaire.

Le fichier `reference.html` fourni à côté de ce brief est la **référence visuelle
et éditoriale**. Reprends sa mise en page, ses couleurs, sa typographie et ses
textes. Ne réinvente pas le design.

## Stack

Aligné sur l'autre projet (fragrancefinder.fr) pour ne pas multiplier les outils :

- Next.js (App Router), TypeScript
- Tailwind CSS
- Déploiement Vercel
- Aucune base de données, aucune authentification, aucun CMS
- Une seule route : `/`

## Tokens de design

Reprendre exactement ceux de `reference.html`, à déclarer dans la config Tailwind :

| Rôle | Valeur |
|---|---|
| Fond | `#EDEAE3` (chaux) |
| Fond secondaire | `#E3DFD5` |
| Blanc cassé (cartes) | `#FBFAF7` |
| Encre (texte, section sombre) | `#15211C` |
| Texte secondaire | `#4A5852` |
| Accent principal | `#2E6B4F` (olive) |
| Accent clair | `#3E8A66` |
| Accent signal | `#D98C1F` (safran) |
| Trait | `rgba(21,33,28,.14)` |

Typographie : **Bricolage Grotesque** (titres, 700/800), **Instrument Sans**
(texte courant), **IBM Plex Mono** (étiquettes, chiffres, numéros de jour).
Charger via `next/font/google`, pas via un `<link>`.

## Sections, dans l'ordre

1. **En-tête collant** — nom + « Sites web · Grasse », bouton « Réserver un appel ».
2. **Hero** — pastille de disponibilité, titre « Votre site en ligne en 7 jours »
   (« 7 jours » en olive souligné de safran), sous-titre, deux boutons,
   trois chiffres (7 jours / 1 200 € / 20 min), bande de captures défilante.
   Fond animé : voir section dédiée plus bas.
3. **Promesses** — 4 cartes.
4. **Déroulé J1 → J7** — section sombre. Élément signature du site.
   Sur mobile : rail horizontal avec `scroll-snap`. À partir de 860 px :
   grille de 7 colonnes formant une frise continue.
5. **Prix** — carte 1 200 € avec liste de ce qui est inclus + mention explicite
   de ce qui n'est pas inclus, à côté d'un encart « preuve » FragranceFinder.
6. **Prise de rendez-vous** — intégration Cal.com (voir plus bas).
7. **Questions** — 6 `<details>`.
8. **Pied de page**.

## Fond animé du hero

Reprendre le canvas 2D de `reference.html` (7 courbes gaussiennes évoquant un
chromatogramme). Contraintes non négociables :

- `devicePixelRatio` plafonné à 1.5
- `requestAnimationFrame` arrêté via `IntersectionObserver` quand le hero
  sort du viewport
- rendu statique si `prefers-reduced-motion: reduce`
- `redimensionnement` débounce à ~180 ms
- composant client isolé, chargé en `dynamic(..., { ssr: false })`

**Interdit** : WebGL, shaders, bibliothèque d'animation tierce.

## Prise de rendez-vous

Intégration Cal.com via `@calcom/embed-react`, type de réservation
« appel-20min ». Le composant ne doit pas bloquer le rendu initial :
chargement différé, et bouton lien direct vers Cal.com en repli si le script
échoue. Le bloc réservé dans `reference.html` indique l'emplacement exact.

## Contenu

**Tous les textes sont déjà écrits dans `reference.html`. Les reprendre au mot
près.** Ne pas paraphraser, ne pas « améliorer », ne rien ajouter. Si un texte
te paraît incomplet, le signaler plutôt que de le compléter toi-même.

Deux valeurs restent à confirmer par le propriétaire du site, à isoler dans un
fichier de constantes plutôt que codées en dur dans le JSX :

- le nom de la marque : **Topsail** (une seule majuscule, jamais « TopSail »)
- le nombre de créneaux annoncés dans la pastille de disponibilité

## Images

Dossier `public/captures/`, format `.webp`, 340 × 424 px, cadrage sur le haut
de la page d'accueil du site présenté. Utiliser `next/image` avec `sizes`
correct et `priority` uniquement sur la première capture visible.

## Critères de recette

Le travail est terminé quand :

- [ ] Lighthouse mobile : performance ≥ 90, accessibilité ≥ 95, SEO = 100
- [ ] Aucun décalage de mise en page (CLS < 0.05) — dimensions réservées pour
      les images et le canvas
- [ ] Navigation clavier complète, focus visible sur tous les éléments actifs
- [ ] `prefers-reduced-motion` respecté partout, y compris sur les apparitions
      au défilement
- [ ] Testé de 320 px à 1440 px sans débordement horizontal
- [ ] Métadonnées : title, description, Open Graph, `lang="fr"`,
      JSON-LD `LocalBusiness` (nom, ville Grasse, zone desservie)
- [ ] Aucune dépendance ajoutée hors Next, Tailwind et l'embed Cal.com

## Hors périmètre

Blog, page « nos valeurs », témoignages inventés, mode sombre, sélecteur de
langue, chat, popup de sortie, bandeau cookies (aucun traceur n'est posé),
animations supplémentaires.
