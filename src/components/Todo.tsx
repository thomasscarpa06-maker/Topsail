/**
 * Repère visible pour une information encore à définir.
 * Remplir la valeur correspondante dans src/config/site.ts le fait disparaître.
 */
export function Todo({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-md border border-dashed border-safran-fonce/60 bg-safran/10 px-1.5 py-0.5 font-sans text-[0.8em] font-medium text-safran-fonce"
      title="Information à compléter dans src/config/site.ts"
    >
      À définir : {label}
    </span>
  );
}
