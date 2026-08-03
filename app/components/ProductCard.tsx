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
      />
    </article>
  );
}
