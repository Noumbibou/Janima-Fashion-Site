"use client";

import { useState } from "react";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

type CatalogueGalleryProps = {
  products: Product[];
};

export function CatalogueGallery({ products }: CatalogueGalleryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="product-card-button"
            onClick={() => setSelectedProduct(product)}
            aria-label={`Voir le détail de ${product.name}`}
          >
            <ProductCard product={product} />
          </button>
        ))}
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
