import Link from "next/link";
import { Pagination } from "../components/Pagination";
import { CatalogueGallery } from "../components/CatalogueGallery";
import { getDriveProducts } from "../../lib/drive";

export const metadata = {
  title: "Catalogue | Janima Fashion",
  description: "Découvrez les créations de Janima Fashion, styliste à Douala.",
};

const PAGE_SIZE = 8;

const TABS = {
  tenues: {
    label: "Tenues scolaires",
    folderId: () => process.env.GOOGLE_DRIVE_FOLDER_TENUE,
  },
  collection: {
    label: "Collection 01",
    folderId: () => process.env.GOOGLE_DRIVE_FOLDER_ID,
  },
} as const;

type TabKey = keyof typeof TABS;

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; cat?: string | string[] }>;
}) {
  const params = await searchParams;
  const catParam = Array.isArray(params.cat) ? params.cat[0] : params.cat;
  const activeTab: TabKey = catParam === "collection" ? "collection" : "tenues";

  const allProducts = await getDriveProducts(TABS[activeTab].folderId());

  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const products = allProducts.slice(startIndex, startIndex + PAGE_SIZE);
  const total = allProducts.length;

  return (
    <main className="site-shell catalogue-shell">
      <nav className="site-nav" aria-label="Navigation principale">
        <Link className="brand-mark" href="/" aria-label="Janima Fashion, accueil">
          <img className="brand-symbol" src="/logo-final.jpeg" alt="" />
          <span>Janima Fashion</span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/">
            L&apos;atelier
          </Link>
          <Link className="nav-link" href="/portfolio">
            Portfolio
          </Link>
          <Link className="nav-link nav-link-active" href="/catalogue">
            Le catalogue
          </Link>
        </div>
        <Link className="nav-contact" href="/#contact">
          Prendre contact <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      <div className="catalogue-video-slot">
        <div className="catalogue-video-slot-badge">
          <span className="catalogue-video-slot-icon" aria-hidden="true">
            ▶
          </span>
          Vidéo à venir
        </div>
      </div>

      <header className="catalogue-header">
        <p className="eyebrow">Janima Fashion · Douala, Cameroun</p>
        <h1>Les pièces de la collection.</h1>
        <p className="catalogue-intro">
          Des silhouettes pensées avec caractère, entre gestes traditionnels et
          lignes contemporaines.
        </p>
      </header>

      <section aria-labelledby="collection-title">
        <div className="catalogue-section-heading">
          <div className="catalogue-tabs" role="tablist" aria-label="Catalogues">
            {(Object.keys(TABS) as TabKey[]).map((key) => (
              <Link
                key={key}
                href={`/catalogue?cat=${key}`}
                scroll={false}
                className={`catalogue-tab${key === activeTab ? " catalogue-tab-active" : ""}`}
                role="tab"
                aria-selected={key === activeTab}
                id={key === activeTab ? "collection-title" : undefined}
              >
                {TABS[key].label}
              </Link>
            ))}
          </div>
          <p className="catalogue-count">
            {total === 0
              ? "Aucune création"
              : `${Math.min(total, startIndex + 1)}–${Math.min(total, startIndex + PAGE_SIZE)} sur ${total} créations`}
          </p>
        </div>
        <CatalogueGallery products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/catalogue"
          pageParam="page"
          extraParams={{ cat: activeTab }}
        />
      </section>
    </main>
  );
}
