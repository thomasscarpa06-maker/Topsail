import Image from "next/image";
import { site } from "@/config/site";

const reassurance = [
  "Estimation gratuite",
  "Mandat écrit",
  "Paiement dès la vente",
  "Grasse et alentours",
];

/* Étiquettes kraft : illustration par défaut tant qu'aucune photo n'est fournie.
   Uniquement des petits objets et du petit mobilier (rien de volumineux). */
const etiquettes = [
  { titre: "Petit mobilier", detail: "Chevets, chaises, tables d'appoint", rot: "-rotate-3" },
  { titre: "Vaisselle & verrerie", detail: "Faïence, cristal, services", rot: "rotate-2 translate-y-10" },
  { titre: "Luminaires", detail: "Lampes, appliques, suspensions", rot: "rotate-2" },
  { titre: "Déco & brocante", detail: "Cadres, miroirs, curiosités", rot: "-rotate-2 translate-y-10" },
];

function Etiquette({ titre, detail, className = "" }: { titre: string; detail: string; className?: string }) {
  return (
    <div className={`relative rounded-xl bg-kraft px-5 pb-4 pt-7 text-nuit shadow-[0_18px_40px_-14px_rgba(14,26,43,0.4)] ${className}`}>
      {/* œillet + ficelle */}
      <span aria-hidden className="absolute left-1/2 top-2.5 h-3 w-3 -translate-x-1/2 rounded-full bg-nuit/70 ring-2 ring-sable" />
      <span aria-hidden className="absolute -top-10 left-1/2 h-12 w-px -translate-x-1/2 bg-nuit/25" />
      <p className="font-serif text-xl font-semibold leading-tight">{titre}</p>
      <p className="mt-1 text-sm text-nuit/70">{detail}</p>
      <div aria-hidden className="mt-3 border-t border-dashed border-nuit/25 pt-2 text-xs uppercase tracking-[0.18em] text-nuit/55">
        Dépôt-vente
      </div>
    </div>
  );
}

export function Hero() {
  const avecPhoto = Boolean(site.heroImage);
  return (
    <section className="relative isolate overflow-hidden bg-sable">
      {avecPhoto ? (
        <>
          <Image src={site.heroImage as string} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          {/* Voile sable pour garder le texte lisible par-dessus la photo */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-sable via-sable/90 to-sable/50" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_85%_10%,#d7e3ea_0%,transparent_55%),radial-gradient(90%_80%_at_5%_100%,#ede4d3_0%,transparent_60%)]"
        />
      )}

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-nuit/15 bg-white/60 px-3 py-1 text-sm font-medium text-nuit/80">
            <span aria-hidden className="h-2 w-2 rounded-full bg-safran" />
            Dépôt-vente à domicile · Pays de Grasse
          </p>
          <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-nuit sm:text-5xl lg:text-[clamp(2.5rem,3.6vw,3.4rem)]">
            Vos objets dorment&nbsp;?
            <br />
            <span className="text-ardoise">On les vend pour vous.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gris sm:text-xl">
            Déco, vaisselle, petit mobilier, objets de collection&nbsp;: nous venons chez vous, nous les mettons en vente
            et vous recevez l&apos;argent.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#estimation"
              className="sm:whitespace-nowrap rounded-full bg-safran px-6 py-4 text-center text-base font-semibold text-nuit shadow-lg shadow-safran/25 transition hover:brightness-105"
            >
              Demander une estimation gratuite
            </a>
            <a
              href="#comment-ca-marche"
              className="sm:whitespace-nowrap rounded-full border border-nuit/25 px-6 py-4 text-center text-base font-medium text-nuit transition hover:bg-nuit/5"
            >
              Comment ça marche
            </a>
          </div>
        </div>

        {!avecPhoto && (
          <div aria-hidden className="hidden grid-cols-2 gap-x-6 gap-y-14 pb-10 pt-8 lg:grid">
            {etiquettes.map((e) => (
              <Etiquette key={e.titre} titre={e.titre} detail={e.detail} className={e.rot} />
            ))}
          </div>
        )}
      </div>

      {/* Bandeau blanc de réassurance */}
      <div className="border-t border-nuit/10 bg-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 text-[0.95rem] font-medium text-nuit sm:px-6 md:grid-cols-4">
          {reassurance.map((r) => (
            <li key={r} className="flex items-center gap-2.5">
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-safran-fonce" fill="currentColor">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
