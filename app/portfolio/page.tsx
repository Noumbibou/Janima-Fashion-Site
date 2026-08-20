import Link from "next/link";
import { getDriveProducts } from "../../lib/drive";

export const metadata = {
  title: "Portfolio | Janima Fashion",
  description:
    "Le portfolio de Janima Fashion : silhouettes, savoir-faire et réalisations",
};

export default async function PortfolioPage() {
  const products = await getDriveProducts();
  const showcase = products.slice(0, 5);

  return (
    <main className="site-shell portfolio-shell">
      <nav className="site-nav" aria-label="Navigation principale">
        <Link className="brand-mark" href="/" aria-label="Janima Fashion, accueil">
          <img className="brand-symbol" src="/logo-final.jpeg" alt="" />
          <span>Janima Fashion</span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/">
            L&apos;atelier
          </Link>
          <Link className="nav-link nav-link-active" href="/portfolio">
            Portfolio
          </Link>
          <Link className="nav-link" href="/catalogue">
            Le catalogue
          </Link>
        </div>
        <Link className="nav-contact" href="/#contact">
          Prendre contact <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      <header className="catalogue-header">
        <p className="eyebrow">Portfolio · Janima Fashion</p>
        <h1>Le style prend forme.</h1>
        <p className="catalogue-intro">
          Chaque pièce Janima Fashion est pensée comme une histoire : un dialogue
          entre héritage textile africain et lignes contemporaines. Voici un aperçu
          de notre univers créatif.
        </p>
      </header>

      <section className="portfolio-showcase" aria-label="Aperçu de nos créations">
        <div
          className="portfolio-tile portfolio-tile-feature"
          role="img"
          aria-label="Silhouette habillée d'une création Janima Fashion"
          style={{ backgroundImage: `url("/mum.jpeg")` }}
        />
        {showcase.map((product) => (
          <div
            key={product.id}
            className="portfolio-tile"
            role="img"
            aria-label={product.imageAlt}
            style={{ backgroundImage: `url("${product.imageUrl}")` }}
          />
        ))}
        <div
          className="portfolio-tile"
          role="img"
          aria-label="Tenues scolaires Les Bassons par Janima Fashion"
          style={{ backgroundImage: `url("/basson.jpeg")` }}
        />
      </section>

      <section className="portfolio-features" aria-label="Notre savoir-faire">
        <div className="portfolio-feature">
          <p className="portfolio-feature-index">01</p>
          <h3 className="portfolio-feature-title">Sur-mesure</h3>
          <p className="portfolio-feature-text">
            Chaque silhouette est ajustée à la personne qui la porte, sans
            compromis sur le confort ni sur l&apos;allure.
          </p>
        </div>
        <div className="portfolio-feature">
          <p className="portfolio-feature-index">02</p>
          <h3 className="portfolio-feature-title">Tissus choisis avec soin</h3>
          <p className="portfolio-feature-text">
            Wax, bazin, soie : une sélection rigoureuse de matières qui
            subliment chaque création, du croquis à la dernière couture.
          </p>
        </div>
        <div className="portfolio-feature">
          <p className="portfolio-feature-index">03</p>
          <h3 className="portfolio-feature-title">Finitions artisanales</h3>
          <p className="portfolio-feature-text">
            Un geste précis, hérité du savoir-faire traditionnel, pour des
            pièces qui traversent le temps avec élégance.
          </p>
        </div>
      </section>

      <section className="intro-strip" aria-label="Nous contacter">
        <p className="intro-label">Collaborer</p>
        <p className="intro-text">
          Envie d&apos;une création sur-mesure ou d&apos;habiller votre
          établissement ? Parlons-en.
        </p>
        <Link className="text-link" href="/catalogue">
          Découvrir le catalogue <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
