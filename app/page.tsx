import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Navigation principale">
        <Link className="brand-mark" href="/" aria-label="Janima Fashion, accueil">
          <img className="brand-symbol" src="/logo-final.jpeg" alt="" />
          <span>Janima Fashion</span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link nav-link-active" href="/">
            L&apos;atelier
          </Link>
          <a className="nav-link" href="/catalogue">
            Le catalogue
          </a>
        </div>
        <a className="nav-contact" href="#contact">
          Prendre contact <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Créations contemporaines · Douala, Cameroun</p>
          <h1 id="hero-title">
            Le tissu raconte
            <span> qui vous êtes.</span>
          </h1>
          <p className="hero-description">
            Janima Fashion imagine des silhouettes singulières où l&apos;héritage textile
            africain rencontre une élégance d&apos;aujourd&apos;hui.
          </p>
          <a className="primary-button" href="/catalogue">
            Découvrir les créations <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div
          className="hero-visual"
          role="img"
          aria-label="Silhouette habillée d'une création Janima Fashion"
        >
          <div className="visual-caption">
            <span>Collection 01</span>
            <span>Éclat brut</span>
          </div>
          <img className="visual-stamp" src="/logo-final.jpeg" alt="Janima Fashion" />
        </div>
      </section>

      <section
        className="intro-strip"
        id="contact"
        aria-label="À propos de l'atelier"
      >
        <p className="intro-label">L&apos;atelier</p>
        <p className="intro-text">
          Des pièces pensées pour celles et ceux qui portent leur histoire avec
          allure.
        </p>
        <a className="text-link" href="mailto:bonjour@janima.studio">
          bonjour@janima.studio <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
