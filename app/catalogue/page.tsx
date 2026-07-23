import Link from "next/link";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

export const metadata = {
  title: "Catalogue | Janima Fashion",
  description: "Découvrez les créations de Janima Fashion, styliste à Douala.",
};

export default function CataloguePage() {
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
          <p className="catalogue-count">{products.length} créations</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
