import Link from "next/link";
import { HeroCarousel, type HeroSlide } from "./components/HeroCarousel";
import { getDriveProducts } from "../lib/drive";

export default async function Home() {
  const driveProducts = await getDriveProducts();
  const womenDressId = "10S9xf-7HzAicgSlm5B3rR-seOYhxflXz";
  const womenDress = driveProducts.find((product) =>
    product.imageUrl.includes(womenDressId)
  );
  const otherDriveProducts = driveProducts.filter(
    (product) => product !== womenDress
  );
  const driveShowcase = [womenDress, otherDriveProducts[0]].filter(
    (product): product is (typeof driveProducts)[number] => Boolean(product)
  );
  const driveSlides: HeroSlide[] = driveShowcase.map((product) => ({
    src: product.imageUrl,
    alt: product.imageAlt,
    heading: `Collection 01 — ${product.name || "Création exclusive"}`,
    ctaLabel: "Découvrir la collection",
    ctaHref: "/catalogue?cat=collection",
  }));

  const slides: HeroSlide[] = [
    {
      src: "/mum.jpeg",
      alt: "Silhouette habillée d'une création Janima Fashion",
      heading: "L'élégance qui porte votre histoire",
      ctaLabel: "Voir le portfolio",
      ctaHref: "/portfolio",
    },
    {
      src: "/basson.jpeg",
      alt: "Tenues scolaires Les Bassons par Janima Fashion",
      heading: "Tenues scolaires",
      ctaLabel: "Voir les tenues scolaires",
      ctaHref: "/catalogue?cat=tenues",
    },
    ...driveSlides,
  ];

  return (
    <main className="site-shell">
      <div className="hero-shell">
        <nav className="site-nav site-nav-overlay" aria-label="Navigation principale">
          <Link className="brand-mark" href="/" aria-label="Janima Fashion, accueil">
            <img className="brand-symbol" src="/logo-final.jpeg" alt="" />
            <span>Janima Fashion</span>
          </Link>
          <div className="nav-links">
            <Link className="nav-link nav-link-active" href="/">
              L&apos;atelier
            </Link>
            <Link className="nav-link" href="/portfolio">
              Portfolio
            </Link>
            <a className="nav-link" href="/catalogue">
              Le catalogue
            </a>
          </div>
          <a className="nav-contact" href="#contact">
            Prendre contact <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <HeroCarousel slides={slides} />
      </div>

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
