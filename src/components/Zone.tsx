// Section « Zone desservie » — fond clair. Ajout SEO local : texte lisible,
// aucune liste de mots-clés. Placée juste avant les Questions.
export default function Zone() {
  return (
    <section className="zone" id="zone">
      <div className="wrap">
        <div className="section-tete apparait">
          <span className="eyebrow">Zone desservie</span>
          <h2>Création de site internet à Grasse et alentours.</h2>
        </div>

        <div className="zone-texte apparait">
          <p>
            Topsail conçoit des sites internet pour les professionnels de Grasse
            et des communes voisines : Cannes, Mouans-Sartoux, Mougins, Le
            Cannet, Valbonne, Pégomas et Peymeinade. Que vous teniez un
            restaurant, une entreprise du bâtiment, un cabinet de thérapeute, un
            commerce de centre-ville ou une profession libérale, votre site est
            pensé pour être trouvé par les habitants du secteur et pour
            convaincre en quelques secondes.
          </p>
          <p>
            Travailler avec quelqu&apos;un de la région a ses avantages : le
            déplacement sur place reste possible dans tout ce périmètre, pour
            faire le point autour d&apos;un café plutôt qu&apos;au téléphone.
            Vous parlez à un interlocuteur unique, qui connaît le bassin
            grassois et cannois et reste joignable après la mise en ligne.
          </p>
        </div>
      </div>
    </section>
  );
}
