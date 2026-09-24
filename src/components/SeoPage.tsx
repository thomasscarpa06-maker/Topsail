import Link from "next/link";
import { site } from "@/config/site";
import type { FaqItem } from "@/config/categories";

export type Crumb = { name: string; href: string };

/* ───────── Fil d'Ariane (visible) ───────── */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-gris">
        {items.map((it, i) => {
          const dernier = i === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-nuit/30">/</span>}
              {dernier ? (
                <span aria-current="page" className="text-nuit/70">{it.name}</span>
              ) : (
                <Link href={it.href} className="text-ardoise underline-offset-4 hover:underline">
                  {it.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** JSON-LD BreadcrumbList à partir des mêmes items (URLs absolues). */
export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.href === "/" ? "" : it.href}`,
    })),
  };
}

/** JSON-LD FAQPage réutilisable. */
export function faqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ───────── Liste FAQ (accordéon natif, sans JS) ───────── */
export function FaqList({ faq }: { faq: FaqItem[] }) {
  return (
    <div className="mt-6 space-y-3">
      {faq.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-nuit/10 bg-white px-6 py-1 shadow-sm open:pb-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-nuit [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sable-2 text-xl text-ardoise transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="text-gris">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ───────── Bloc tarifs résumé (repris de src/config/site.ts) ───────── */
export function TarifsResume() {
  const t = site.tarifs;
  const lignes: [string, string][] = [
    ["Estimation à domicile", t.estimation ?? "—"],
    ["Commission sur les ventes", t.commissionPct ? `${t.commissionPct} % du prix de vente` : "—"],
    ["Valeur minimum par objet", t.valeurMinimum ? `${t.valeurMinimum} €` : "—"],
    ["Objets invendus", t.semainesInvendu ? `Après ${t.semainesInvendu} semaines` : "—"],
  ];
  return (
    <div className="rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-nuit">Nos tarifs en bref</h2>
      <dl className="mt-4 divide-y divide-nuit/10">
        {lignes.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-gris">{k}</dt>
            <dd className="font-serif font-semibold text-ardoise">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-gris">Rien à payer si rien ne se vend. Tout est écrit dans le mandat de vente.</p>
    </div>
  );
}

/* ───────── Appel à l'action vers /#estimation ───────── */
export function CtaEstimation({ titre }: { titre?: string }) {
  return (
    <div className="rounded-3xl bg-ardoise-clair p-8 text-center sm:p-10">
      <h2 className="font-serif text-2xl font-semibold text-nuit sm:text-3xl">
        {titre ?? "Envie d'une estimation gratuite ?"}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-gris">
        Envoyez-nous quelques photos : nous vous répondons rapidement et nous convenons d&apos;un passage chez vous.
      </p>
      <Link
        href="/#estimation"
        className="mt-6 inline-block rounded-full bg-safran px-7 py-4 font-semibold text-nuit shadow-md transition hover:brightness-105"
      >
        Demander une estimation
      </Link>
    </div>
  );
}
