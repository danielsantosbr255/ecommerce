import { Suspense } from "react";
import Brands from "../common/Brands";
import LoadingState from "../LoadingState";
import Categories from "../common/Categories";
import { Crown, Grid2x2Plus } from "lucide-react";
import { productService } from "@/services/products";
import ProductCarousel from "../products/ProductCarousel";
import ProductSession from "../products/ProductSession";

export default function ProductList() {
  const fetchProducts = async () => {
    const products = await productService.getAll();
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return products;
  };

  const highlightedProducts = { label: "Destaque", icon: <Crown size={20} /> };
  const newProducts = { label: "Novidades", icon: <Grid2x2Plus size={20} /> };
  const popularProducts = { label: "Mais Vendidos", icon: <Crown size={20} /> };

  return (
    <section className="w-full h-full gap-10 flex flex-col">
      <Suspense fallback={<ProductCarousel products={null} {...highlightedProducts} />}>
        <ProductSession callback={fetchProducts} {...highlightedProducts} />
      </Suspense>

      <Suspense fallback={<LoadingState />}>
        <Brands />
      </Suspense>

      <Suspense fallback={<ProductCarousel products={null} {...newProducts} />}>
        <ProductSession callback={fetchProducts} {...newProducts} />
      </Suspense>

      <Suspense fallback={<LoadingState />}>
        <Categories />
      </Suspense>

      <Suspense fallback={<ProductCarousel products={null} {...popularProducts} />}>
        <ProductSession callback={fetchProducts} {...popularProducts} />
      </Suspense>
    </section>
  );
}
