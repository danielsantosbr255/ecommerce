"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface BannerImage {
  id: number;
  url: string;
  alt?: string;
}

const images: BannerImage[] = [
  { id: 0, url: "/images/banner1.jpg", alt: "Banner Promocional 1" },
  { id: 1, url: "/images/banner2.jpg", alt: "Banner Promocional 2" },
  { id: 2, url: "/images/banner3.jpg", alt: "Banner Promocional 3" },
  { id: 3, url: "/images/banner4.jpg", alt: "Banner Promocional 4" },
  { id: 4, url: "/images/banner5.jpg", alt: "Banner Promocional 5" },
];

export const ImageCarousel = () => {
  return (
    <Carousel
      opts={{ loop: true, slidesToScroll: 1 }}
      // plugins={[Autoplay({ delay: 4000 })]}
      className="bg-red-500 w-full h-full rounded-lg overflow-hidden shadow-xl"
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id} className="pl-0">
            <img src={image.url} alt={image.alt || ""} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
