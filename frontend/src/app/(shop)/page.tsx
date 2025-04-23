import ProductList from "@/components/layout/ProductList";
import { ImageCarousel } from "@/components/products/ImageCarousel";

export default function Home() {
  return (
    <main className="flex flex-col my-6 mx-auto w-full px-4 lg:max-w-10/12 h-full gap-6 items-center">
      <ImageCarousel />
      <ProductList />
    </main>
  );
}
