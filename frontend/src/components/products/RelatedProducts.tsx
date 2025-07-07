import { Product } from "@/types";
import ProductCarousel from "./ProductCarousel";
import { productService } from "@/services/products";
import { FaLink } from "react-icons/fa";

export default async function RelatedProducts({ product }: { product: Product }) {
  if (!product.id) {
    return null;
  }

  const relatedProducts = await productService.getRelated(product.id);

  if (!relatedProducts || !relatedProducts.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex items-center gap-2 border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
        <FaLink className="text-primary" /> Produtos Relacionados
      </h2>
      {relatedProducts.length > 0 && <ProductCarousel key={product.id} products={relatedProducts} />}
    </div>
  );
}
