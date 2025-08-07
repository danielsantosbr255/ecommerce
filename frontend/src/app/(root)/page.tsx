import { Suspense } from "react";
import { brandService } from "@/services/brands";
import { productService } from "@/services/products";
import { categoryService } from "@/services/categories";
import LoadingState from "@/components/ui/LoadingState";
import BrandsCarousel from "@/components/common/BrandsCarousel";
import ProductSession from "@/components/products/ProductSession";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { FaBullhorn, FaChartLine, FaStarHalfAlt } from "react-icons/fa";
import { PromotionBanner } from "@/components/promotions/PromotionBanner";

export const revalidate = 1800;

const Brands = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const brands = await brandService.getAll();
  return <BrandsCarousel brands={brands} />;
};

const Categories = async () => {
  const categories = await categoryService.getAll();
  if (!categories) return null;
  return <CategoriesCarousel categories={categories} />;
};

const fetchProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await productService.getAll();
  return products;
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col my-5 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6 items-center">
      <PromotionBanner />

      <ProductSession callback={fetchProducts} label="Destaques" icon={<FaStarHalfAlt size={25} />} />

      <Suspense fallback={<BrandsCarousel brands={null} />}>
        <Brands />
      </Suspense>

      <ProductSession callback={fetchProducts} label="Novidades" icon={<FaBullhorn size={25} />} />

      <Suspense fallback={<LoadingState />}>
        <Categories />
      </Suspense>

      <ProductSession callback={fetchProducts} label="Mais Vendidos" icon={<FaChartLine size={25} />} />
    </main>
  );
}
