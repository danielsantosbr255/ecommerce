import { Suspense } from "react";
import { brandService } from "@/services/brands";
import { productService } from "@/services/products";
import { categoryService } from "@/services/categories";
import LoadingState from "@/components/ui/LoadingState";
import BrandsCarousel from "@/components/common/BrandsCarousel";
import ProductSession from "@/components/products/ProductSession";
import ProductCarousel from "@/components/products/ProductCarousel";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { FaBullhorn, FaChartLine, FaStarHalfAlt } from "react-icons/fa";
import { PromotionBanner } from "@/components/promotions/PromotionBanner";

export const revalidate = 1800;

const Brands = async () => {
  const brands = await brandService.getAll();
  if (!brands) return null;
  return <BrandsCarousel brands={brands} />;
};

const Categories = async () => {
  const categories = await categoryService.getAll();
  if (!categories) return null;
  return <CategoriesCarousel categories={categories} />;
};

const fetchProducts = async () => {
  const products = await productService.getAll();
  return products;
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col my-5 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6 items-center">
      <PromotionBanner />

      <Suspense fallback={<ProductCarousel products={null} />}>
        <ProductSession callback={fetchProducts} label="Destaques" icon={<FaStarHalfAlt size={25} />} />
      </Suspense>

      <Suspense fallback={<LoadingState />}>
        <Brands />
      </Suspense>

      <Suspense fallback={<ProductCarousel products={null} />}>
        <ProductSession callback={fetchProducts} label="Novidades" icon={<FaBullhorn size={25} />} />
      </Suspense>

      <Suspense fallback={<LoadingState />}>
        <Categories />
      </Suspense>

      <Suspense fallback={<ProductCarousel products={null} />}>
        <ProductSession callback={fetchProducts} label="Mais Vendidos" icon={<FaChartLine size={25} />} />
      </Suspense>
    </main>
  );
}
