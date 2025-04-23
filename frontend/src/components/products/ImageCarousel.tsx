"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import Button from "../ui/Button";
import Skeleton from "@/components/ui/Skeleton"; // Importe o componente Skeleton
import Link from "next/link";

interface PromotionsProps {
  id: number;
  title: string;
  description: string;
  discount: number;
  products: ProductType[];
}

export const ImageCarousel = () => {
  const [promotions, setPromotions] = useState<PromotionsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const autoplayRef = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    const fetchPromotions = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions`);
      const data = await response.json();
      setPromotions(data);
      setLoading(false);
    };
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (!loading && promotions.length > 0 && promotions[currentPromotionIndex]?.products?.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentProductIndex(
          (prevIndex) => (prevIndex + 1) % promotions[currentPromotionIndex].products.length
        );
      }, 3000);

      return () => clearInterval(intervalId);
    } else {
      setCurrentProductIndex(0);
    }
  }, [currentPromotionIndex, promotions, loading]);

  const handleCarouselChange = () => {
    // setCurrentPromotionIndex(currentPromotionIndex);
    setCurrentProductIndex(0);
  };

  if (loading) {
    return (
      <div className="bg-gray-100 relative w-full rounded-xl shadow-lg p-4 grid grid-cols-[40%_auto]">
        <div className="flex items-center justify-center aspect-square w-full h-full">
          <Skeleton className="rounded-lg p-5 w-full h-full" />
        </div>

        <div className="max-w-10/12 w-full h-full mx-auto flex flex-col justify-center">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-8 w-1/3" />
          <div className="mt-10">
            <Skeleton className="h-10 w-1/4 !rounded-full" />
          </div>
        </div>

        <div className="absolute top-5 right-5 h-25 w-25 items-center justify-center flex text-4xl font-bold text-gray-200">
          <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-5 rounded-full shadow"></p>
          <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex text-4xl border border-t-transparent border-b-transparent scale-105 rounded-full shadow"></p>
          <p className="absolute text-center">
            %
            <span className="absolute text-sm translate-x-1/2 right-1/2 flex items-center justify-center">
              OFF
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      className="bg-white w-full rounded-xl overflow-hidden shadow-lg text-primary"
      opts={{ align: "start", loop: true, startIndex: currentPromotionIndex }}
      plugins={[autoplayRef.current]}
      onSelect={handleCarouselChange}
    >
      <CarouselContent className="ml-0">
        {promotions.map((promotion, index) => (
          <CarouselItem key={index} className="p-0">
            <div className="relative grid grid-cols-[40%_auto] items-center justify-center p-4 w-full h-full">
              <div className="flex items-center justify-center w-full h-full">
                <div className="rounded-lg aspect-square p-5 w-full h-full flex items-center justify-center transition-opacity duration-500 ease-in-out">
                  {promotion.products && promotion.products.length > 0 ? (
                    <ProductImage
                      product={promotion.products[currentProductIndex]}
                      key={promotion.products[currentProductIndex]?.id}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                      <p className="text-gray-500">Sem produtos</p>
                    </div>
                  )}
                </div>
              </div>

              {promotion.discount > 0 && (
                <div className="absolute top-5 right-5 h-25 w-25 items-center justify-center flex text-4xl font-bold text-highlight-n">
                  <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-5 rounded-full shadow"></p>
                  <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex text-4xl border border-t-transparent border-b-transparent scale-105 rounded-full shadow"></p>
                  <p className="absolute text-center">
                    {promotion.discount}%
                    <span className="absolute text-sm translate-x-1/2 right-1/2 flex items-center justify-center">
                      OFF
                    </span>
                  </p>
                </div>
              )}

              <div className="max-w-10/12 w-full h-full mx-auto flex flex-col justify-center">
                <h1 className="text-6xl py-4 font-bold">{promotion.title}</h1>

                <p className="text-highlight-n text-xl">{promotion.description}</p>

                <div className="flex items-center justify-between mt-10">
                  <Link
                    href={`/promotions/${promotion.id}`}
                    className="bg-highlight-n text-white text-xl px-10 py-3 rounded-full shadow"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
