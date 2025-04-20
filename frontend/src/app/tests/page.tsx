"use client";

import { Carousel, CarouselItem } from "@/components/Carrosel/Carousel";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import React from "react";

export default function page() {
  const items = Array(11).fill({});

  const breakpoints = {
    1024: 5.1,
    768: 4.1,
    640: 3.1,
    480: 2.1,
    320: 1.1,
  };

  return (
    <div className=" flex flex-col h-screen w-full justify-center items-center mx-auto max-w-10/12">
      <h1 className="text-3xl font-bold">Tests</h1>

      <Carousel slidesToShow={5.1} breakpoints={breakpoints} loop className="w-full">
        {items.map((item, index) => (
          <CarouselItem key={index} className="px-0 h-full rounded-lg text-center">
            <ProductCardSkeleton />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
