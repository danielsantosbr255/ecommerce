import React from "react";
import { Product } from "@/types";
import { Grid2X2Check } from "lucide-react";
import ProductCarousel from "./ProductCarousel";
import { productService } from "@/services/products";

export default async function RelatedProducts({ product }: { product: Product }) {
  if (!product.id) {
    return null;
  }

  const relatedProducts = await productService.getProductsByCategory(product.id);

  if (!relatedProducts || !relatedProducts.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex items-center gap-2 border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
        <Grid2X2Check /> Produtos Relacionados
      </h2>
      {relatedProducts.length > 0 && <ProductCarousel key={product.id} products={relatedProducts} />}
    </div>
  );
}
