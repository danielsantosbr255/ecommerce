"use client";

import React from "react";
import { Carousel, CarouselItem } from "@/components/tests/carousel/Carousel";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function page() {
  const items = Array(11).fill(<ProductCardSkeleton />);

  return (
    <div className=" flex flex-col h-screen w-full justify-center items-center mx-auto max-w-10/12">
      <h1 className="text-3xl font-bold">Tests</h1>

      <Carousel options={{ loop: true }}>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="              
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              xl:basis-1/5
              2xl:basis-1/6
              "
          >
            {item}
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}
