import { Logo } from "./Logo";

const liens = [
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#ce-quon-prend", label: "Ce qu'on prend" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#questions", label: "Questions" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-nuit/10 bg-sable/90 backdrop-blur supports-[backdrop-filter]:bg-sable/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" aria-label="Topsail, retour en haut de page" className="shrink-0">
          <Logo className="h-8 w-auto sm:h-9" />
        </a>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium text-nuit/80">
            {liens.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ardoise">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="/#estimation"
          className="rounded-full bg-safran px-4 py-2.5 text-[0.9rem] font-semibold text-nuit shadow-sm transition hover:brightness-105 sm:px-5"
        >
          <span className="sm:hidden">Estimation</span>
          <span className="hidden sm:inline">Demander une estimation</span>
        </a>
      </div>
    </header>
  );
}
