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
        <span className="product-number">{product.id}</span>
      </div>
      <div className="product-details">
        <div>
          <h2 className="product-name">{product.name}</h2>
        </div>
        {product.description ? (
          <p className="product-description">{product.description}</p>
        ) : null}
      </div>
    </article>
  );
}
