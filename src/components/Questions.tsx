// Section « Questions » — fond clair. Les 6 <details> repris de reference.html ;
// la réponse sur les délais est mise à jour pour les deux jalons.
const questions = [
  {
    q: "Je n'ai ni textes ni photos, c'est bloquant ?",
    r: "Non. J'écris les textes à partir de notre appel de vingt minutes, vous validez. Pour les photos, on utilise les vôtres même prises au téléphone si elles sont bonnes, sinon je vous oriente vers une solution simple.",
  },
  {
    q: "Et si ça déborde des sept jours ?",
    r: "La maquette arrive sous 48 h après notre appel. Les sept jours jusqu'à la mise en ligne courent à partir du moment où j'ai vos contenus, et le délai dépend aussi de la rapidité de vos retours. Si le retard vient de moi, je vous le dis et je ne facture pas l'attente.",
  },
  {
    q: "Qu'est-ce que je paie après la mise en ligne ?",
    r: "Le domaine et l'hébergement, entre 15 et 60 € par an, réglés directement par vous auprès du fournisseur. Aucun abonnement obligatoire chez moi.",
  },
  {
    q: "Je peux modifier mon site moi-même ?",
    r: "Oui, c'est prévu. Horaires, textes, photos, actualités : je vous montre comment faire pendant la prise en main de trente minutes. Pour les changements plus lourds, vous m'appelez.",
  },
  {
    q: "Est-ce que je vais apparaître sur Google ?",
    r: "Votre fiche Google Business est créée ou remise à jour, ce qui est le levier principal pour un commerce local. Le site est construit pour être lu correctement par les moteurs. Personne ne peut vous promettre la première position sur une recherche large — méfiez-vous de ceux qui le font.",
  },
  {
    q: "Vous travaillez seul ?",
    r: "Oui. C'est précisément pour ça que le prix tient et que le délai est court : vous parlez à la personne qui construit votre site, pas à un commercial qui transmet.",
  },
];

export default function Questions() {
  return (
    <section className="questions" id="questions">
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Questions</span>
          <h2>Ce qu&apos;on me demande à chaque fois.</h2>
        </div>

        {questions.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.r}</p>
          </details>
        ))}

        <div className="actions">
          <a className="btn btn--plein" href="#rdv">
            Réserver un appel de 20 min
          </a>
        </div>
      </div>
    </section>
  );
}
