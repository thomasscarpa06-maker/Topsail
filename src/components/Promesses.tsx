// Section « Promesses » — 4 cartes. Section sur fond clair.
// Tous les textes sont repris au mot près de reference.html.

const promesses = [
  {
    titre: "Le prix ne bouge pas",
    texte:
      "1 200 €, annoncés avant de commencer. Si le projet sort du cadre, je vous le dis au premier appel — pas au moment de payer.",
  },
  {
    titre: "Sept jours, à partir de vos contenus",
    texte:
      "Le compte à rebours démarre quand j'ai vos textes et vos photos. Vous savez donc exactement quand votre site sera en ligne.",
  },
  {
    titre: "Pensé pour le téléphone d'abord",
    texte:
      "La plupart de vos clients vous cherchent sur mobile, souvent debout dans la rue. Je construis l'écran du téléphone en premier, l'ordinateur ensuite.",
  },
  {
    titre: "Vous restez maître de votre site",
    texte:
      "Le nom de domaine est à votre nom. Vous changez vos horaires et vos photos vous-même — je vous montre comment en 30 minutes.",
  },
];

function Coche() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Promesses() {
  return (
    <section>
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Ce que je vous garantis</span>
          <h2>Quatre promesses, écrites noir sur blanc.</h2>
          <p>Pas de forfait à tiroirs, pas d&apos;option qui apparaît à la facture.</p>
        </div>
        <div className="promesses">
          {promesses.map((p) => (
            <article className="promesse apparait" key={p.titre}>
              <div className="marqueur">
                <Coche />
              </div>
              <h3>{p.titre}</h3>
              <p>{p.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
