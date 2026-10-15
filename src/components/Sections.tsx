import { existsSync } from "node:fs";
import { join } from "node:path";
import { getFaq, pourQui, offre } from "@/config/site";
import { Check } from "./Check";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.14em] text-or-fonce">{children}</p>;
}

/* ───────────── Le problème ───────────── */

const problemes = [
  {
    t: "Une note sous 4 étoiles",
    d: "Beaucoup de clients comparent les notes et choisissent le mieux noté, sans même vous appeler.",
  },
  {
    t: "Des avis négatifs sans réponse",
    d: "Ils restent visibles par tous et donnent l'impression que vous ne vous en souciez pas.",
  },
  {
    t: "Trop peu d'avis",
    d: "Face à un concurrent qui en a dix fois plus, vous paraissez moins fiable.",
  },
  {
    t: "Pas le temps de s'en occuper",
    d: "Vous êtes au travail, pas derrière un écran. Et c'est normal.",
  },
];

export function Probleme() {
  return (
    <section id="probleme" className="bg-section">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Le problème</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">
            Ce que votre fiche Google dit à vos futurs clients
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemes.map((p) => (
            <div key={p.t} className="rounded-card bg-blanc p-6 shadow-douce">
              <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-rouge/10 text-rouge">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6v5M10 14h.01" strokeLinecap="round" />
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-encre">{p.t}</h3>
              <p className="mt-2 text-encre-doux">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 border-l-4 border-rouge pl-4 text-lg font-semibold text-encre">
          Le pire&nbsp;? Ces clients perdus, vous ne les voyez jamais.
        </p>
      </div>
    </section>
  );
}

/* ───────────── Comment ça marche ───────────── */

const etapes = [
  {
    t: "Audit gratuit",
    d: "On analyse votre fiche, on la compare à vos concurrents directs et on vous montre ce qui vous coûte des clients.",
  },
  {
    t: "Installation en 48 h",
    d: "Demande d'avis automatique après chaque client, réponses préparées pour chaque avis, alerte en cas d'avis négatif.",
  },
  {
    t: "Suivi chaque mois",
    d: "Un rapport simple sur l'évolution de votre note et de vos avis face à vos concurrents.",
  },
];

export function CommentCaMarche() {
  return (
    <section id="comment" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-2xl">
        <Eyebrow>Comment ça marche</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Simple, et vous gardez la main</h2>
      </div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {etapes.map((e, i) => (
          <li key={e.t} className="rounded-card bg-blanc p-6 shadow-douce">
            <span className="font-display text-4xl font-bold text-bleu">{i + 1}</span>
            <h3 className="mt-3 text-xl font-bold text-encre">{e.t}</h3>
            <p className="mt-2 text-encre-doux">{e.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────── Ce qui est inclus ───────────── */

const inclus = [
  "Demande d'avis par SMS ou QR code à tous vos clients",
  "Réponses rédigées pour chaque avis, validées par vous en un clic",
  "Alerte immédiate en cas d'avis négatif",
  "Plaque NFC + QR code prête à l'emploi, configurée par nos soins avec le lien d'avis de votre fiche Google",
  "Rapport mensuel sur votre note et vos avis",
  "Un interlocuteur local, à Grasse, qui se déplace",
];

export function Inclus() {
  return (
    <section className="bg-section">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Ce qui est inclus</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Tout est pris en charge</h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {inclus.map((i) => (
            <li key={i} className="flex items-start gap-3 rounded-card bg-blanc p-5 shadow-douce">
              <Check className="mt-0.5 h-6 w-6 shrink-0 text-or" />
              <span className="text-encre">{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── L'offre ───────────── */

const offreInclus = [
  "Audit gratuit de votre fiche",
  "Plaque NFC + QR code offerts",
  "Réponse à chacun de vos avis, validée par vous",
  "Alerte immédiate en cas d'avis négatif",
  "Rapport mensuel face à vos concurrents",
  "Un interlocuteur à Grasse qui se déplace",
];

export function Offre() {
  return (
    <section id="offre" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-2xl">
        <Eyebrow>L&apos;offre</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Une offre simple, sans engagement</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        {/* Carte principale mise en avant (bordure or) */}
        <div className="rounded-card border-2 border-or bg-blanc p-6 shadow-douce sm:p-8">
          <h3 className="text-2xl font-bold text-encre">Tout compris, sans engagement</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-encre">{offre.prixMensuel} €</span>
            <span className="text-lg text-encre-doux">/ mois</span>
          </div>
          <p className="mt-1 text-encre-doux">Sans engagement, résiliable à tout moment.</p>

          <p className="mt-5 rounded-xl bg-or/10 px-4 py-3 text-sm font-medium text-encre">{offre.installation}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {offreInclus.map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-or" />
                <span className="text-encre">{i}</span>
              </li>
            ))}
          </ul>

          <a
            href="#audit"
            className="mt-7 inline-block rounded-full bg-or px-7 py-4 font-semibold text-encre shadow-douce transition hover:brightness-105"
          >
            Recevoir mon audit gratuit
          </a>
        </div>

        {/* Carte secondaire discrète : la plaque seule */}
        <div className="rounded-card border border-trait bg-blanc p-6 shadow-sm sm:p-7">
          <h3 className="text-xl font-bold text-encre">Juste la plaque&nbsp;?</h3>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-3xl font-bold text-encre">{offre.plaquePrix} €</span>
            <span className="text-sm text-encre-doux">paiement unique, sans abonnement</span>
          </div>
          <p className="mt-3 text-encre-doux">{offre.plaqueCarte}</p>
          <a
            href="/?demande=plaque#audit"
            className="mt-6 inline-block rounded-full border border-encre/25 px-6 py-3 font-medium text-encre transition hover:bg-encre/5"
          >
            Commander ma plaque
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Conformité ───────────── */

export function Conformite() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="rounded-card border border-trait bg-blanc p-8 shadow-douce sm:p-10">
        <div className="flex items-start gap-4">
          <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-or/15 text-or-fonce">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h2 className="text-2xl font-bold text-encre sm:text-3xl">100&nbsp;% conforme aux règles de Google</h2>
            <p className="mt-3 max-w-2xl text-lg text-encre-doux">
              Pas de faux avis, pas d&apos;avis achetés, pas de tri des clients. Tous vos clients reçoivent la même
              demande. Votre note monte grâce à de vrais avis, durablement, sans risque pour votre fiche.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Pour qui ───────────── */

export function PourQui() {
  return (
    <section className="bg-section">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>Pour qui</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Pensé pour les commerces de proximité</h2>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {pourQui.map((p) => (
            <li
              key={p}
              className="rounded-full border border-trait bg-blanc px-4 py-2 font-medium text-encre shadow-sm"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-medium text-encre-doux">Grasse et Pays de Grasse, on se déplace chez vous.</p>
      </div>
    </section>
  );
}

/* ───────────── Qui suis-je ───────────── */

export function QuiSuisJe() {
  const photo = existsSync(join(process.cwd(), "public", "thomas.jpg"));
  return (
    <section className="bg-section">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/thomas.jpg"
              alt="Thomas, fondateur de Topsail"
              width={160}
              height={160}
              className="h-40 w-40 shrink-0 rounded-full object-cover shadow-douce"
            />
          ) : (
            <div
              aria-hidden
              className="grid h-40 w-40 shrink-0 place-items-center rounded-full bg-bleu font-display text-6xl font-bold text-creme shadow-douce"
            >
              T
            </div>
          )}
          <div className="max-w-2xl">
            <Eyebrow>Qui suis-je</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Un interlocuteur local, pas une plateforme</h2>
            <p className="mt-4 text-lg text-encre-doux">
              Je m&apos;appelle Thomas, je suis de Grasse. J&apos;aide les commerces du coin à être mieux notés sur
              Google, sans qu&apos;ils aient à y passer du temps. Je me déplace, je vous explique tout simplement, et
              vous gardez toujours la main sur ce qui est publié en votre nom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Questions ───────────── */

export function Questions() {
  const faq = getFaq();
  return (
    <section id="questions" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-2xl">
        <Eyebrow>Questions fréquentes</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold text-encre sm:text-4xl">Vos questions, nos réponses</h2>
      </div>
      <div className="mt-8 space-y-3">
        {faq.map((f) => (
          <details key={f.q} className="group rounded-card border border-trait bg-blanc px-6 py-1 shadow-sm open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-encre [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-section text-xl text-bleu transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-encre-doux">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
