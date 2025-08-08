"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { FaTags, FaThList } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel/carousel";

const CategoryCard = ({ category }: { category: Category | null }) => {
  const isLoading = !category;
  if (!category) category = {} as Category;

  const slug = category.slug || null;
  const skeleton = <span className={`w-full h-full animate-pulse  !bg-gray-200 !text-transparent rounded-md transition-all`} />;

  const image = category.image ? (
    <Image
      src={category.image || "/placeholder.jpg"}
      alt={category.name || ""}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      className="object-contain p-3"
    />
  ) : (
    <FaTags size={50} />
  );

  return (
    <section className="flex flex-col gap-2 w-full h-full justify-center items-center font-medium" key={slug}>
      <Link
        href={slug ? `/categories/${slug}` : "#"}
        className="bg-bg-secondary text-primary flex relative aspect-square border border-lines hover:border-primary/50 w-full h-full hover:shadow-sm hover:shadow-primary/50 rounded-lg items-center justify-center"
      >
        {isLoading ? skeleton : image}
      </Link>

      <h3 className="text-tx-primary text-lg leading-5">{category.name}</h3>
    </section>
  );
};

export default function CategoriesCarousel({ categories }: { categories: Category[] | null }) {
  const isLoading = !categories || categories.length === 0;
  const placeholder = Array(11).fill(null) as Category[];
  const items = isLoading ? placeholder : categories;

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="flex gap-3 items-center text-3xl uppercase font-bold my-2 py-2">
        <FaThList className="text-primary" size={30} /> Nossos Departamentos
      </h2>

      <Carousel className="w-full" opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent className="ml-0">
          {items.map((category, index) => (
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
