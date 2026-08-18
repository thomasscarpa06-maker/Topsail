"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL } from "@/lib/constants";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const DELAI_REPLI = 12000; // ms : si rien n'a chargé, on bascule sur le repli

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

// URL de l'embed : masque les détails d'événement, harmonise les couleurs
// avec les tokens du site (blanc / encre / accent).
function urlEmbed(): string {
  const params = new URLSearchParams({
    hide_event_type_details: "1",
    hide_gdpr_banner: "1",
    background_color: "fcfaf6", // --blanc
    text_color: "0e1a2b", // --encre
    primary_color: "1f4e6b", // --accent
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}

type Etat = "attente" | "pret" | "erreur";

export default function RendezVous() {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [etat, setEtat] = useState<Etat>("attente");

  // Chargement paresseux : on n'injecte le script que lorsque la section
  // approche du viewport (jamais au chargement initial de la page).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lance = false;
    let repli: ReturnType<typeof setTimeout> | undefined;

    const surMessage = (e: MessageEvent) => {
      // Calendly signale l'affichage du widget via postMessage.
      if (String(e.origin).includes("calendly.com")) {
        if (repli) clearTimeout(repli);
        setEtat("pret");
      }
    };

    const initWidget = () => {
      if (window.Calendly && widgetRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url: urlEmbed(),
            parentElement: widgetRef.current,
          });
        } catch {
          setEtat("erreur");
        }
      } else {
        setEtat("erreur");
      }
    };

    const charger = () => {
      if (lance) return;
      lance = true;
      window.addEventListener("message", surMessage);
      repli = setTimeout(() => setEtat("erreur"), DELAI_REPLI);

      if (window.Calendly) {
        initWidget();
        return;
      }
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = initWidget;
      s.onerror = () => {
        if (repli) clearTimeout(repli);
        setEtat("erreur");
      };
      document.body.appendChild(s);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          charger();
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0 },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      window.removeEventListener("message", surMessage);
      if (repli) clearTimeout(repli);
    };
  }, []);

  return (
    <section className="rdv" id="rdv" ref={sectionRef}>
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Prendre rendez-vous</span>
          <h2>Vingt minutes, et vous saurez si c&apos;est jouable.</h2>
          <p>
            Choisissez un créneau. Pas de présentation commerciale : on regarde
            votre situation, et je vous dis franchement si j&apos;y arrive en
            sept jours.
          </p>
        </div>

        <div className="rdv-grille">
          {/* À gauche (≥ 900 px), au-dessus (< 900 px) : réassurance. */}
          <div className="rdv-reassurance apparait">
            <h3>Ce qu&apos;on fait pendant ces 20 minutes</h3>
            <ul className="rdv-liste">
              <li>
                Vous me racontez votre activité et ce que vos clients cherchent
              </li>
              <li>Je regarde votre présence actuelle, site et fiche Google</li>
              <li>Je vous dis si c&apos;est jouable en 7 jours, et à quel prix</li>
            </ul>

            <h3>Ce dont j&apos;ai besoin de vous</h3>
            <ul className="rdv-liste">
              <li>Vos horaires et vos coordonnées</li>
              <li>Quelques photos, même prises au téléphone</li>
              <li>Vos textes si vous en avez, sinon je les écris</li>
            </ul>

            <p className="rdv-note">
              Par téléphone si vous préférez. Sans engagement.
            </p>
            <p className="rdv-note">
              Si on avance, vous recevez une maquette sous 48 h.
            </p>
          </div>

          <div className="rdv-boite">
            {/* Conteneur de l'embed Calendly (hauteur réservée par la CSS). */}
            <div
              className="rdv-widget"
              ref={widgetRef}
              aria-hidden={etat !== "pret"}
            />

          {etat !== "pret" && (
            <div className="rdv-etat">
              {etat === "erreur" ? (
                <div>
                  <h3>Le calendrier n&apos;a pas pu se charger.</h3>
                  <p>
                    Ouvrez la page de réservation directement pour choisir un
                    créneau.
                  </p>
                  <a
                    className="btn btn--plein"
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir les créneaux
                  </a>
                </div>
              ) : (
                <div className="rdv-attente">
                  <span className="rdv-spinner" aria-hidden="true" />
                  <p>Chargement du calendrier…</p>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
