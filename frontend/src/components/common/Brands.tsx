"use client";
import { useEffect } from "react";
import { useBrands } from "@/hooks/useBrands";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Brand } from "@/types";
import { Group } from "lucide-react";

const BrandCard = ({ brand }: { brand: Brand }) => {
  return (
    <section
      className="flex flex-col gap-2 w-full h-full justify-center items-center font-medium"
      key={brand.slug}
    >
      <div className="relative flex aspect-square border border-lines w-full h-full shadow-xs rounded-2xl items-center justify-center">
        <Image
          src={brand?.image || ""}
          alt={brand?.name || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-contain p-3"
        />
      </div>

      <h3 className="text-tx-primary text-sm md:text-lg leading-5">{brand.name}</h3>
    </section>
  );
};

export default function Brands() {
  const { brands, fetchBrands } = useBrands();

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="flex gap-2 items-center  border-lines text-2xl text-tx-secondary font-bold py-2">
        <Group /> Nossas Marcas
      </h2>

      <Carousel
        className="w-full"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent className="ml-0">
          {brands.map((brand, index) => (
            <CarouselItem
              key={index}
              className="
                p-2 md:p-5
                basis-[28.57%]       // mobile (3.5 colunas)
                sm:basis-[22.22%]    // tablet (4.5 colunas)
                md:basis-[18.18%]    // desktop médio (5.5 colunas)
                lg:basis-[15.38%]    // notebook (6.5 colunas)
                xl:basis-[13.33%]    // laptop (7.5 colunas)
                2xl:basis-[11.76%]   // desktop grande (8.5 colunas)
              "
            >
              <BrandCard brand={brand} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
