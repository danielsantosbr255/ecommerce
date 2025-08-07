"use client";

import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "../products/ProdutctCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel/carousel";

const ProductCarousel = ({ products }: { products: Product[] | null }) => {
  const isLoading = !products || products.length === 0;
  const placeholder = Array(11).fill(null) as Product[];

  const items = isLoading ? placeholder : products;

  return (
    <div className="flex flex-col w-full">
      <Carousel className="w-full" opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
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
              <ProductCard key={index} product={item} />
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
