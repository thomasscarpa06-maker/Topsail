import { site } from "@/config/site";
import { Logo } from "./Logo";
import { Todo } from "./Todo";

export function Footer() {
  return (
    <footer className="border-t border-nuit/10 bg-sable">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="mt-4 text-gris">Dépôt-vente à domicile dans le Pays de Grasse. On vide, on vend, vous encaissez.</p>
        </div>
        <div>
          <p className="font-semibold text-nuit">Zone d&apos;intervention</p>
          <p className="mt-3 text-gris">{site.communes.join(", ")}.</p>
        </div>
        <div>
          <p className="font-semibold text-nuit">Contact</p>
          <ul className="mt-3 space-y-2 text-gris">
            <li>
              <a href={`mailto:${site.email}`} className="text-ardoise underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              {site.phone ? (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ardoise">
                  {site.phone}
                </a>
              ) : (
                <Todo label="téléphone" />
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-nuit/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gris sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Topsail</p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <a href="/mentions-legales" className="hover:text-nuit">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-nuit">Confidentialité</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
