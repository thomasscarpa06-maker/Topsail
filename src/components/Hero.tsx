import { GoogleCards } from "./GoogleCards";
import { Check } from "./Check";

const reassurance = ["Audit gratuit", "Installé en 48 h", "Sans engagement", "Conforme aux règles Google"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-[2rem] font-bold leading-[1.08] text-encre sm:text-5xl">
            Votre note Google vous fait perdre des clients.{" "}
            <span className="text-bleu">On la fait remonter.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-encre-doux">
            Pour les commerces et artisans du Pays de Grasse : plus d&apos;avis, des réponses à chacun, et une note qui
            inspire confiance. Sans que vous ayez à y penser.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#audit"
              className="rounded-full bg-or px-6 py-4 text-center font-semibold text-encre shadow-douce transition hover:brightness-105"
            >
              Recevoir mon audit gratuit
            </a>
            <a
              href="#comment"
              className="rounded-full border border-encre/20 px-6 py-4 text-center font-medium text-encre transition hover:bg-encre/5"
            >
              Comment ça marche
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-encre-doux">
            {reassurance.map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-or" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-4">
          <GoogleCards />
        </div>
      </div>
    </section>
  );
}
