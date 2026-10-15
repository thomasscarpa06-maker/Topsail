/* Illustration du hero : deux fiches Google côte à côte (HTML/CSS, aucune image).
   Valeurs d'exemple, clairement marquées « Exemple ». */

export function Stars({ note, className = "" }: { note: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (note / 5) * 100));
  return (
    <span className={`relative inline-block whitespace-nowrap align-middle leading-none ${className}`} aria-hidden>
      <span className="text-encre/15">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-or" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

function Fiche({ nom, note, avis, alerte = false }: { nom: string; note: number; avis: number; alerte?: boolean }) {
  return (
    <div className="rounded-card bg-blanc p-4 shadow-douce sm:p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-trait font-display text-sm font-bold text-encre">
          G
        </span>
        <p className="truncate text-sm font-semibold text-encre">{nom}</p>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-encre sm:text-3xl">{note.toLocaleString("fr-FR")}</span>
        <Stars note={note} className="text-base sm:text-lg" />
      </div>
      <p className="mt-1 text-sm text-encre-doux">{avis} avis</p>
      {alerte ? (
        <div className="mt-3 rounded-xl border border-rouge/30 bg-rouge/5 p-3">
          <p className="text-xs italic text-encre-doux">« Service décevant, je ne reviendrai pas. »</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-encre">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rouge" />
            Avis négatif sans réponse
          </p>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-trait bg-section p-3">
          <p className="text-xs text-encre-doux">Avis récents, une réponse à chaque client.</p>
        </div>
      )}
    </div>
  );
}

export function GoogleCards() {
  return (
    <div className="relative">
      <span className="absolute -top-2.5 right-2 z-10 rounded-full bg-encre/80 px-2.5 py-1 text-xs font-medium text-creme">
        Exemple
      </span>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Fiche nom="Votre commerce" note={3.9} avis={27} alerte />
        <Fiche nom="Votre concurrent" note={4.7} avis={184} />
      </div>
    </div>
  );
}
