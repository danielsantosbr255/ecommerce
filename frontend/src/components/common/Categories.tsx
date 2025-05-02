"use client";
import { useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Category } from "@/types";
import { ChartArea, Grid, Group, LayoutTemplate } from "lucide-react";
import Link from "next/link";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <section
      className="flex flex-col gap-2 w-full h-full justify-center items-center font-medium"
      key={category.slug}
    >
      <Link href={`/categories/${category.slug}`} className="text-primary flex relative aspect-square border border-lines w-full h-full shadow-xs rounded-lg items-center justify-center">
        <Image
          src={category?.image || "/placeholder.jpg"}
          alt={category?.name || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-contain p-3"
        />
      </Link>

      <h3 className="text-tx-primary text-lg leading-5">{category.name}</h3>
    </section>
  );
};

export default function Categories() {
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-lines text-2xl text-tx-primary font-bold my-2 py-2">
        <LayoutTemplate /> Nossos Departamentos
      </h2>

      <Carousel
        className="w-full"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent className="ml-0">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="
                p-5
                basis-[22%]        // mobile
                sm:basis-1/2   // tablet
                md:basis-1/3
                lg:basis-1/4
                xl:basis-[16.6%]   // notebook                
                2xl:basis-[12.6%]  // desktop 
              "
            >
              <CategoryCard category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
