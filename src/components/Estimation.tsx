"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";

const MAX_PHOTOS = 5;
const MAX_COTE = 1600; // px, côté le plus long après compression
const MAX_TOTAL = 4 * 1024 * 1024; // limite d'envoi (Vercel : 4,5 Mo par requête)

const situations = ["Tri", "Déménagement", "Succession", "Autre"];

type Photo = { file: File; url: string };
type Etat = "idle" | "envoi" | "ok" | "erreur";

/** Réduit une photo (souvent 5-10 Mo sur smartphone) en JPEG léger. */
async function compresser(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, MAX_COTE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * ratio);
    canvas.height = Math.round(bitmap.height * ratio);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.78));
    if (!blob) return file;
    const nom = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], nom, { type: "image/jpeg" });
  } catch {
    return file; // format non lu par le navigateur (ex. HEIC sur certains appareils) : envoyé tel quel
  }
}

const champ =
  "mt-1.5 block w-full rounded-xl border border-nuit/20 bg-white px-4 py-3 text-[1rem] text-nuit placeholder:text-nuit/40 focus:border-ardoise focus:outline-none focus:ring-2 focus:ring-ardoise/30";
const label = "block font-semibold text-nuit";

export function Estimation() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [etat, setEtat] = useState<Etat>("idle");
  const [message, setMessage] = useState("");
  const [preparation, setPreparation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function ajouterPhotos(files: FileList | null) {
    if (!files) return;
    setPreparation(true);
    const place = MAX_PHOTOS - photos.length;
    const choisies = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, place);
    const compressees = await Promise.all(choisies.map(compresser));
    setPhotos((p) => [...p, ...compressees.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    setPreparation(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function retirer(i: number) {
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, j) => j !== i);
    });
  }

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("photos");
    const total = photos.reduce((s, p) => s + p.file.size, 0);
    if (total > MAX_TOTAL) {
      setEtat("erreur");
      setMessage("Les photos sont trop lourdes. Retirez-en une ou deux, puis réessayez.");
      return;
    }
    photos.forEach((p) => data.append("photos", p.file));

    setEtat("envoi");
    setMessage("");
    try {
      const res = await fetch("/api/estimation", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Envoi impossible");
      setEtat("ok");
      form.reset();
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
    } catch (err) {
      setEtat("erreur");
      setMessage(err instanceof Error ? err.message : "Envoi impossible");
    }
  }

  return (
    <section id="estimation" className="bg-sable-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-safran-fonce">Demande d&apos;estimation</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-nuit sm:text-[2.6rem]">
            Montrez-nous ce que vous voulez vendre
          </h2>
          <p className="mt-4 text-lg text-gris">
            Quelques photos suffisent pour une première idée. On vous rappelle pour convenir d&apos;un passage chez vous.
          </p>

          <div className="mt-10 rounded-2xl border border-nuit/10 bg-white p-6 shadow-sm">
            <p className="font-semibold text-nuit">Vous préférez en parler&nbsp;?</p>
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block rounded-full border border-nuit/25 px-5 py-2.5 font-medium text-nuit transition hover:bg-nuit/5"
            >
              Réserver un appel
            </a>
            <p className="mt-4 text-gris">
              {site.phone ? (
                <>
                  Ou appelez-nous au{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-ardoise">
                    {site.phone}
                  </a>
                </>
              ) : (
                <span className="rounded-md border border-dashed border-safran-fonce/60 bg-safran/10 px-1.5 py-0.5 text-sm font-medium text-safran-fonce">
                  À définir : numéro de téléphone
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-nuit/10 bg-white p-6 shadow-xl sm:p-9">
          {etat === "ok" ? (
            <div role="status" className="py-10 text-center">
              <p className="font-serif text-3xl font-semibold text-nuit">Merci, c&apos;est bien reçu&nbsp;!</p>
              <p className="mt-3 text-lg text-gris">Nous revenons vers vous très vite pour convenir d&apos;un passage.</p>
              <button
                type="button"
                onClick={() => setEtat("idle")}
                className="mt-8 rounded-full bg-ardoise px-6 py-3 font-semibold text-sable"
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
                <label htmlFor="nom" className={label}>Nom</label>
                <input id="nom" name="nom" required autoComplete="name" className={champ} />
              </div>
              <div>
                <label htmlFor="telephone" className={label}>Téléphone</label>
                <input id="telephone" name="telephone" type="tel" required autoComplete="tel" className={champ} />
              </div>
              <div>
                <label htmlFor="email" className={label}>E-mail</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={champ} />
              </div>
              <div>
                <label htmlFor="commune" className={label}>Commune</label>
                <input id="commune" name="commune" required autoComplete="address-level2" className={champ} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="situation" className={label}>Votre situation</label>
                <select id="situation" name="situation" required defaultValue="" className={champ}>
                  <option value="" disabled>Choisir…</option>
                  {situations.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className={label}>Qu&apos;aimeriez-vous vendre&nbsp;?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  placeholder="Ex. : une commode ancienne, un service de table, deux lampes…"
                  className={champ}
                />
              </div>

              <div className="sm:col-span-2">
                <span className={label}>
                  Photos <span className="font-normal text-gris">(jusqu&apos;à {MAX_PHOTOS}, facultatif)</span>
                </span>
                <div className="mt-2 flex flex-wrap gap-3">
                  {photos.map((p, i) => (
                    <div key={p.url} className="relative h-20 w-20 overflow-hidden rounded-xl border border-nuit/15">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => retirer(i)}
                        aria-label={`Retirer la photo ${i + 1}`}
                        className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-nuit/80 text-sm text-sable"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {photos.length < MAX_PHOTOS && (
                    <label className="grid h-20 w-20 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-ardoise/40 text-center text-xs font-semibold text-ardoise hover:bg-ardoise-clair/40">
                      {preparation ? "…" : (<span><span className="block text-2xl leading-none">+</span>Ajouter</span>)}
                      <input
                        ref={inputRef}
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={(e) => ajouterPhotos(e.target.files)}
                      />
                    </label>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-3 text-[0.95rem] text-gris sm:col-span-2">
                <input type="checkbox" name="consentement" required className="mt-1 h-5 w-5 shrink-0 accent-ardoise" />
                <span>
                  J&apos;accepte que mes informations et mes photos soient utilisées pour traiter ma demande d&apos;estimation.{" "}
                  <a href="/confidentialite" className="font-medium text-ardoise underline underline-offset-2">
                    Politique de confidentialité
                  </a>
                </span>
              </label>

              {etat === "erreur" && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-red-800 sm:col-span-2">
                  {message} Vous pouvez aussi nous écrire à{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={etat === "envoi" || preparation}
                className="rounded-full bg-safran px-7 py-4 text-lg font-semibold text-nuit shadow-md transition hover:brightness-105 disabled:opacity-60 sm:col-span-2"
              >
                {etat === "envoi" ? "Envoi en cours…" : "Envoyer ma demande d'estimation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
