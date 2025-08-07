"use client";

import Link from "next/link";
import { Brand } from "@/types";
import Image from "next/image";
import { Group } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel/carousel";

const BrandCard = ({ brand }: { brand: Brand | null }) => {
  const isLoading = !brand;
  if (!brand) brand = {} as Brand;

  const slug = brand.slug || null;

  return (
    <section className="flex flex-col gap-2 w-full h-full justify-center items-center font-medium" key={brand.slug}>
      <Link
        href={slug ? `/brands/${slug}` : "#"}
        className="bg-bg-secondary text-primary flex relative aspect-square border border-lines hover:border-primary/50 w-full h-full hover:shadow-sm hover:shadow-primary/50 rounded-lg items-center justify-center"
      >
        {isLoading ? (
          <span className={`w-full h-full animate-pulse  !bg-gray-200 !text-transparent rounded-md transition-all`} />
        ) : (
          <Image
            src={brand?.image || ""}
            alt={brand?.name || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-contain p-3 transition-all"
          />
        )}
      </Link>

      <h3 className="text-sm md:text-lg leading-5">{brand.name}</h3>
    </section>
  );
};

export default function BrandsCarousel({ brands }: { brands: Brand[] | null }) {
  const isLoading = !brands || brands.length === 0;
  const placeholder = Array(11).fill(null) as Brand[];

  const items = isLoading ? placeholder : brands;

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="flex gap-2 items-center  border-lines text-2xl font-bold py-2">
        <Group className="text-primary" size={24} /> Nossas Marcas
      </h2>

      <Carousel className="w-full" opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent className="ml-0">
          {items.map((item, index) => (
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
              <BrandCard brand={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
