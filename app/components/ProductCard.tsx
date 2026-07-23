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
          <p className="product-category">{product.category}</p>
          <h2 className="product-name">{product.name}</h2>
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  );
}
