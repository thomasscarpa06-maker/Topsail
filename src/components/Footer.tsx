import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-trait bg-section">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr]">
        <div>
          <Link href="/" aria-label="Topsail, accueil" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-bold text-encre">Topsail</span>
          </Link>
          <p className="mt-4 max-w-sm text-encre-doux">
            Réputation Google pour les commerces du Pays de Grasse.
          </p>
        </div>
        <div>
          <p className="font-semibold text-encre">Contact</p>
          <ul className="mt-3 space-y-2 text-encre-doux">
            <li>
              <a href={`mailto:${site.email}`} className="text-bleu underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-bleu">
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href="#audit" className="hover:text-encre">Audit gratuit</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-trait">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-encre-doux sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Topsail</p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-encre">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-encre">Confidentialité</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
