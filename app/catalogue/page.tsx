import Link from "next/link";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { getDriveProducts } from "../../lib/drive";

export const metadata = {
  title: "Catalogue | Janima Fashion",
  description: "Découvrez les créations de Janima Fashion, styliste à Douala.",
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const allProducts = await getDriveProducts();
  const PAGE_SIZE = 8;
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Number(pageParam) || 1;
  const currentPage = Math.max(1, requestedPage);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const products = allProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const total = allProducts.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return (
    <main className="site-shell catalogue-shell">
      <nav className="site-nav" aria-label="Navigation principale">
        <Link className="brand-mark" href="/" aria-label="Janima Fashion, accueil">
          <span className="brand-symbol">J</span>
          <span>Janima Fashion</span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/">
            L&apos;atelier
          </Link>
          <Link className="nav-link nav-link-active" href="/catalogue">
            Le catalogue
          </Link>
        </div>
        <Link className="nav-contact" href="/#contact">
          Prendre contact <span aria-hidden="true">↗</span>
        </Link>
      </nav>

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
          <p className="intro-label" id="collection-title">
            Collection 01
          </p>
          <p className="catalogue-count">
            {Math.min(total, startIndex + 1)}–{Math.min(total, startIndex + PAGE_SIZE)} sur {total} créations
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/catalogue" />
      </section>
    </main>
  );
}
