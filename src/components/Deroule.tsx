// Section « Déroulé J1 → J7 » — fond encre (comme le hero). Rail à défilement
// tactile sous 860 px, grille de 7 colonnes en frise continue au-delà.
// Structure et ton repris de reference.html ; J3 mentionne la maquette sous 48 h.
const jours = [
  {
    num: "J1",
    titre: "On s'appelle",
    texte:
      "Vingt minutes. Votre activité, vos clients, ce qui doit apparaître en premier. Vous n'avez rien à préparer.",
  },
  {
    num: "J2",
    titre: "Vos contenus",
    texte:
      "Je vous envoie une liste courte : textes, photos, horaires. Si vous n'avez pas de photos correctes, on règle ça.",
  },
  {
    num: "J3",
    titre: "La maquette",
    texte:
      "Sous 48 h après notre appel, vous voyez votre page d'accueil. Rien n'est validé sans vous.",
  },
  {
    num: "J4",
    titre: "Vos retours",
    texte:
      "Un tour de modifications compris. Vous dites ce qui ne va pas, je corrige, sans compter les minutes.",
  },
  {
    num: "J5",
    titre: "Construction",
    texte:
      "Les cinq pages sont montées. Écran du téléphone d'abord, ordinateur ensuite.",
  },
  {
    num: "J6",
    titre: "Google",
    texte:
      "Fiche Google Business à jour, site déclaré aux moteurs, vitesse de chargement testée sur mobile.",
  },
  {
    num: "J7",
    titre: "En ligne",
    texte:
      "Domaine, adresses e-mail, et un dernier appel où je vous montre comment modifier vos horaires vous-même.",
    fin: true,
  },
];

export default function Deroule() {
  return (
    <section className="sombre" id="deroule">
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Le déroulé</span>
          <h2>Sept jours, sept étapes.</h2>
          <p>
            Vous savez à chaque instant où en est votre site et ce qu&apos;on
            attend de vous.
          </p>
        </div>

        <div className="rail">
          {jours.map((j) => (
            <article
              className={`jour${j.fin ? " jour--fin" : ""}`}
              key={j.num}
            >
              <span className="num">{j.num}</span>
              <h3>{j.titre}</h3>
              <p>{j.texte}</p>
            </article>
          ))}
        </div>

        <p className="rail-note">
          Les 7 jours courent à partir de la réception de vos contenus.
        </p>
      </div>
    </section>
  );
}
