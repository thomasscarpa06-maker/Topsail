# Topsail — dépôt-vente à domicile (topsail-grasse.fr)

Next.js 16 · Tailwind v4 · Vercel

## Mise en place sur le dépôt existant

1. Sur `main`, créer le tag de sauvegarde de l'ancien site : `git tag agence-v1 && git push origin agence-v1`
2. Créer la branche `depot-vente`, supprimer l'ancien contenu (garder `public/topsail_logo.svg`), puis copier ce dossier.
3. `npm install` puis `npm run build` pour vérifier.
4. Pousser la branche : Vercel génère un aperçu. Fusionner dans `main` quand tout est prêt.

## Ce qu'il reste à compléter

Tout est centralisé dans **`src/config/site.ts`** (chercher `TODO`) : téléphone, commission, valeur minimum,
délai avant invendu, délai de paiement, stockage, assurance, communes, mentions légales (nom, SIRET, adresse,
déclaration de revendeur). Tant qu'une valeur est vide, le site affiche un repère « À définir ».

Photo du hero : déposer `public/hero.jpg` puis renseigner `heroImage: "/hero.jpg"`.

## Formulaire d'estimation

Les demandes (avec photos compressées automatiquement) sont envoyées par e-mail via [Resend](https://resend.com) :

1. Créer un compte Resend et vérifier le domaine `topsail-grasse.fr` (enregistrements DNS à ajouter chez IONOS).
2. Dans Vercel → Settings → Environment Variables, ajouter `RESEND_API_KEY`, `ESTIMATION_FROM` et `ESTIMATION_TO`
   (voir `.env.example`).
3. Redéployer. Sans clé, le formulaire affiche un message invitant à écrire à contact@topsail-grasse.fr.
