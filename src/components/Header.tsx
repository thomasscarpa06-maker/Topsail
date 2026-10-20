import Link from "next/link";
import { Logo } from "./Logo";

const liens = [
  { href: "#probleme", label: "Le problème" },
  { href: "#comment", label: "Comment ça marche" },
  { href: "#offre", label: "L'offre" },
  { href: "#questions", label: "Questions" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-trait bg-creme/90 backdrop-blur supports-[backdrop-filter]:bg-creme/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Topsail, accueil" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-bold text-encre">Topsail</span>
        </Link>
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium text-encre/80">
            {liens.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-bleu">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#audit"
          className="rounded-full bg-or px-4 py-2.5 text-[0.9rem] font-semibold text-encre shadow-sm transition hover:brightness-105 sm:px-5"
        >
          Audit gratuit
        </a>
      </div>
    </header>
  );
}
