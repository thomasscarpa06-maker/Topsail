"use client";

import { useState } from "react";
import { site, activites } from "@/config/site";

type Etat = "idle" | "envoi" | "ok" | "erreur";

const champCls =
  "mt-1.5 block w-full rounded-xl border border-encre/20 bg-blanc px-4 py-3 text-[1rem] text-encre placeholder:text-encre/40 focus:border-bleu focus:outline-none focus:ring-2 focus:ring-bleu/30";
const labelCls = "block font-semibold text-encre";

export function Audit() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [message, setMessage] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEtat("envoi");
    setMessage("");
    try {
      const res = await fetch("/api/audit", { method: "POST", body: new FormData(form) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Envoi impossible");
      setEtat("ok");
      form.reset();
    } catch (err) {
      setEtat("erreur");
      setMessage(err instanceof Error ? err.message : "Envoi impossible");
    }
  }

  return (
    <section id="audit" className="bg-encre">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.4fr]">
        <div className="text-creme">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-or">Audit gratuit</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Recevez votre audit gratuit</h2>
          <p className="mt-4 text-lg text-creme/80">
            On compare votre fiche Google à celles de vos concurrents et on vous montre ce qui vous fait perdre des
            clients. Réponse sous 48&nbsp;h.
          </p>
        </div>

        <div className="rounded-card border border-white/10 bg-blanc p-6 shadow-douce sm:p-9">
          {etat === "ok" ? (
            <div role="status" className="py-10 text-center">
              <p className="text-2xl font-bold text-encre">Merci, c&apos;est bien reçu&nbsp;!</p>
              <p className="mt-3 text-lg text-encre-doux">
                On analyse votre fiche et on revient vers vous sous 48&nbsp;h avec votre audit.
              </p>
              <button
                type="button"
                onClick={() => setEtat("idle")}
                className="mt-8 rounded-full bg-bleu px-6 py-3 font-semibold text-blanc"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={envoyer} className="grid gap-5 sm:grid-cols-2">
              {/* Anti-spam : champ invisible que seuls les robots remplissent */}
              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="site-web">Ne pas remplir</label>
                <input id="site-web" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="nom" className={labelCls}>Nom</label>
                <input id="nom" name="nom" required autoComplete="name" className={champCls} />
              </div>
              <div>
                <label htmlFor="commerce" className={labelCls}>Nom du commerce</label>
                <input id="commerce" name="commerce" required autoComplete="organization" className={champCls} />
              </div>
              <div>
                <label htmlFor="activite" className={labelCls}>Activité</label>
                <select id="activite" name="activite" required defaultValue="" className={champCls}>
                  <option value="" disabled>Choisir…</option>
                  {activites.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ville" className={labelCls}>Ville</label>
                <input id="ville" name="ville" required autoComplete="address-level2" className={champCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="fiche" className={labelCls}>
                  Lien de votre fiche Google <span className="font-normal text-encre-doux">(facultatif)</span>
                </label>
                <input
                  id="fiche"
                  name="fiche"
                  type="url"
                  inputMode="url"
                  placeholder="https://…"
                  className={champCls}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>E-mail</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={champCls} />
              </div>
              <div>
                <label htmlFor="telephone" className={labelCls}>Téléphone</label>
                <input id="telephone" name="telephone" type="tel" required autoComplete="tel" className={champCls} />
              </div>

              <label className="flex items-start gap-3 text-[0.95rem] text-encre-doux sm:col-span-2">
                <input type="checkbox" name="consentement" required className="mt-1 h-5 w-5 shrink-0 accent-bleu" />
                <span>
                  J&apos;accepte que mes informations soient utilisées pour réaliser mon audit et me recontacter.{" "}
                  <a href="/confidentialite" className="font-medium text-bleu underline underline-offset-2">
                    Politique de confidentialité
                  </a>
                </span>
              </label>

              {etat === "erreur" && (
                <p role="alert" className="rounded-xl bg-rouge/10 px-4 py-3 text-rouge sm:col-span-2">
                  {message} Vous pouvez aussi nous écrire à{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={etat === "envoi"}
                className="rounded-full bg-or px-7 py-4 text-lg font-semibold text-encre shadow-md transition hover:brightness-105 disabled:opacity-60 sm:col-span-2"
              >
                {etat === "envoi" ? "Envoi en cours…" : "Recevoir mon audit gratuit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
