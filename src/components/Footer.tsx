import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/config/categories";
import { communes } from "@/config/communes";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-nuit/10 bg-sable">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="mt-4 text-gris">Dépôt-vente à domicile dans le Pays de Grasse. On vend vos objets pour vous.</p>
          <p className="mt-4 text-gris">
            <a href={`mailto:${site.email}`} className="text-ardoise underline-offset-4 hover:underline">
              {site.email}
            </a>
            {site.phone && (
              <>
                <br />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-ardoise">
                  {site.phone}
                </a>
              </>
            )}
          </p>
        </div>

        <nav aria-label="Ce que nous vendons">
          <p className="font-semibold text-nuit">Ce que nous vendons</p>
          <ul className="mt-3 space-y-2 text-gris">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/vendre/${c.slug}`} className="hover:text-ardoise">
                  {c.lien}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nos communes">
          <p className="font-semibold text-nuit">Nos communes</p>
          <ul className="mt-3 space-y-2 text-gris">
            {communes.map((c) => (
              <li key={c.slug}>
                <Link href={`/depot-vente/${c.slug}`} className="hover:text-ardoise">
                  {c.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-nuit">Estimation</p>
          <ul className="mt-3 space-y-2 text-gris">
            <li>
              <Link href="/#estimation" className="hover:text-ardoise">
                Demander une estimation
              </Link>
            </li>
            <li>
              <Link href="/#comment-ca-marche" className="hover:text-ardoise">
                Comment ça marche
              </Link>
            </li>
            <li>
              <Link href="/#tarifs" className="hover:text-ardoise">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="/#questions" className="hover:text-ardoise">
                Questions fréquentes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-nuit/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gris sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Topsail</p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-nuit">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-nuit">Confidentialité</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
