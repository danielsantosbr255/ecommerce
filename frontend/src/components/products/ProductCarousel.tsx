"use client";

import { Product } from "@/types";
import ProductCard from "../products/ProdutctCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  products: Product[] | null;
}

const ProductCarousel: React.FC<Props> = ({ products }) => {
  const isLoading = !products || products.length === 0;
  const placeholder = Array(11).fill({}) as Product[];
  const randomInt = Math.floor(Math.random() * 1000);

  const items = isLoading ? placeholder : products;
  const renderItem = (product: Product, index: number) =>
    isLoading ? <ProductCardSkeleton key={index} /> : <ProductCard product={product} />;

  return (
    <div className="flex flex-col w-full">
      <Carousel
        className="w-full"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 + randomInt })]}
      >
        <CarouselContent className="ml-0">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="
              p-0
              basis-[83.33%]       // mobile (1 coluna)              
              sm:basis-[45.45%]    // médio (2.2 colunas)
              lg:basis-[31.25%]    // notebook (3.2 colunas)
              xl:basis-[23.81%]    // laptop (4.2 colunas)
              2xl:basis-[19.23%]   // desktop grande (5.2 colunas)
            "
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
