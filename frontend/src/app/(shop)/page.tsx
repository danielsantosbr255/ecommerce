import ProductList from "@/components/layout/ProductList";
import { ImageCarousel } from "@/components/products/ImageCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <main className="flex flex-1 flex-col my-10 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6 items-center">
        <ImageCarousel />
        {/* <Brands /> */}
        <ProductList />
      </main>
    </div>
  );
}
