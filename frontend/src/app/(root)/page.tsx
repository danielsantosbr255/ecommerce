import { Suspense } from "react";
import { brandService } from "@/services/brands";
import { productService } from "@/services/products";
import { categoryService } from "@/services/categories";
import BrandsCarousel from "@/components/common/BrandsCarousel";
import ProductSession from "@/components/products/ProductSession";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { FaBullhorn, FaChartLine, FaStarHalfAlt } from "react-icons/fa";
import { PromotionBanner } from "@/components/promotions/PromotionBanner";

export const revalidate = 3600;

const Brands = async () => {
  const result = await brandService.getMany();
  if (!result) return <BrandsCarousel brands={null} />;
  return <BrandsCarousel brands={result.data} />;
};

const Categories = async () => {
  const categories = await categoryService.getAll();
  return <CategoriesCarousel categories={categories} />;
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col my-5 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6 items-center">
      <PromotionBanner />

      <ProductSession callback={productService.getMany} label="Destaques" icon={<FaStarHalfAlt size={25} />} />

      <Suspense fallback={<BrandsCarousel brands={null} />}>
        <Brands />
      </Suspense>

      <ProductSession callback={productService.getMany} label="Novidades" icon={<FaBullhorn size={25} />} />

      <Suspense fallback={<CategoriesCarousel categories={null} />}>
        <Categories />
      </Suspense>

      <ProductSession callback={productService.getMany} label="Mais Vendidos" icon={<FaChartLine size={25} />} />
    </main>
  );
}
