import Link from "next/link";
import { HeroCarousel, type HeroSlide } from "./components/HeroCarousel";
import { getDriveProducts } from "../lib/drive";

export default async function Home() {
  const driveProducts = await getDriveProducts();
  const driveSlides: HeroSlide[] = driveProducts.slice(0, 2).map((product) => ({
    src: product.imageUrl,
    alt: product.imageAlt,
    eyebrow: "Collection 01",
    title: product.name || "Création exclusive",
  }));

  const slides: HeroSlide[] = [
    {
      src: "/mum.jpeg",
      alt: "Silhouette habillée d'une création Janima Fashion",
      eyebrow: "Collection 01",
      title: "Éclat brut",
    },
    {
      src: "/basson.jpeg",
      alt: "Tenues scolaires Les Bassons par Janima Fashion",
      eyebrow: "Tenues scolaires",
      title: "Les Bassons",
    },
    ...driveSlides,
  ];

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

        <HeroCarousel slides={slides} />
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
