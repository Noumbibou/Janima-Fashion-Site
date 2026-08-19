import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div
        className="product-image"
        role="img"
        aria-label={product.imageAlt}
        style={{ backgroundImage: `url("${product.imageUrl}")` }}
      >
        <span className="product-view-cue" aria-hidden="true">
          Voir la pièce
        </span>
      </div>
      {product.name ? <p className="product-name">{product.name}</p> : null}
    </article>
  );
}
