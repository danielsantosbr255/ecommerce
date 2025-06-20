import { Suspense } from "react";
import LoadingState from "../ui/LoadingState";
import { brandService } from "@/services/brands";
import { productService } from "@/services/products";
import BrandsCarousel from "../common/BrandsCarousel";
import ProductSession from "../products/ProductSession";
import { categoryService } from "@/services/categories";
import ProductCarousel from "../products/ProductCarousel";
import CategoriesCarousel from "../common/CategoriesCarousel";
import { FaBullhorn, FaChartLine, FaStarHalfAlt } from "react-icons/fa";

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

export default function ProductList() {
  return (
    <section className="w-full h-full gap-10 flex flex-col">
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
    </section>
  );
}
