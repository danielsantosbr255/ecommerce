import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel/carousel";
import { Product } from "@/types";
import ProductCard from "../products/ProdutctCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import Autoplay from "embla-carousel-autoplay";
import { randomInt } from "crypto";

interface Props {
  products: Product[];
}

export const ProductsCarousel = ({ products }: Props) => {
  const isLoading = !products || products.length === 0;
  const placeholder = Array(6).fill({}) as Product[];
  const randomInt = Math.floor(Math.random() * 1000);

  const items = isLoading ? placeholder : products;
  const renderItem = (product: Product, index: number) =>
    isLoading ? <ProductCardSkeleton key={index} /> : <ProductCard product={product} key={index} />;

  return (
    <div className="relative w-full px-4 overflow-hidden group">
      <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#f9fafb] via-[#f9fafb]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#f9fafb] via-[#f9fafb]/80 to-transparent z-10 pointer-events-none" />

      <Carousel
        opts={{ loop: true, align: "center", dragFree: false }}
        plugins={[Autoplay({ delay: 3000 + randomInt })]}
        className="w-full h-full"
      >
        <CarouselContent className="-ml-2 pr-4">
          {items.map((product, index) => (
            <CarouselItem
              key={index}
              className="
                pl-1
                basis-[80%]        // mobile
                sm:basis-[33.3%]   // tablet
                lg:basis-[22.2%]   // notebook                
                2xl:basis-[16.6%]   // desktop 
              "
            >
              {renderItem(product, index)}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Botões estilizados com animação de hover */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 hover:bg-white text-tx-primary rounded-full w-10 h-10 flex items-center justify-center shadow-xs" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 hover:bg-white text-tx-primary rounded-full w-10 h-10 flex items-center justify-center shadow-xs" />
      </Carousel>
    </div>
  );
};
