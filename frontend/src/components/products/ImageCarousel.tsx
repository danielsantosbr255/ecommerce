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
import { Product } from "@/types";
import ProductImage from "./ProductImage";
import Button from "../ui/Button";
import Skeleton from "@/components/ui/Skeleton"; // Importe o componente Skeleton
import Link from "next/link";

interface PromotionsProductProps {
  id: number;
  productId: number;
  product: Product;
}

interface PromotionsProps {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string;
  discount: number;
  products: PromotionsProductProps[];
}

interface PromotionsCardProps {
  promotion: PromotionsProps;
  currentProductIndex: number;
}

const PromotionCard = ({ promotion, currentProductIndex }: PromotionsCardProps) => {
  return (
    <div className="p-5 relative grid grid-cols-[30%_auto] gap-2 w-full h-full">
      <div className="rounded-lg aspect-square w-full h-full max-h-96 p-2 m-auto max-w-96 items-center justify-center transition-opacity duration-500 ease-in-out">
        {promotion.products && promotion.products.length > 0 ? (
          <ProductImage
            product={promotion.products[currentProductIndex]?.product}
            key={promotion.products[currentProductIndex]?.product.id}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-tx-secondary">Sem produtos</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full h-full mx-auto">
          <h1 className="text-xl xl:text-6xl py-4 font-bold line-clamp-2">{promotion.title}</h1>
          <p className="text-primary text-sm xl:text-xl line-clamp-2">{promotion.description}</p>
        </div>
        <Link
          href={`/promotions/${promotion.slug}`}
          className="bg-primary text-tx-on-primary text-sm px-2 py-1 mb-2 md:mb-0 md:text-xl md:px-10 md:py-3 rounded-full shadow-xs"
        >
          Saiba mais
        </Link>
      </div>

      {promotion.discount > 0 && (
        <div className="absolute top-[2%] right-[2%] h-12 w-12 md:h-25 md:w-25 items-center justify-center flex text-4xl font-bold text-primary">
          <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-5 rounded-full shadow-xs"></p>
          <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex border border-t-transparent border-b-transparent scale-105 rounded-full shadow-xs"></p>
          <p className="absolute text-center text-xs md:text-2xl">
            {promotion.discount}%
            <span className="absolute text-xs md:text-sm translate-x-1/2 right-1/2 flex items-center justify-center">
              OFF
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export const ImageCarousel = () => {
  const [promotions, setPromotions] = useState<PromotionsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const autoplayRef = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));

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
      <div className="bg-bg-secondary border border-lines relative w-full rounded-xl shadow-xs p-4 grid grid-cols-[30%_auto]">
        <div className="flex items-center m-auto justify-center aspect-square max-w-10/12 max-h-10/12 w-full h-full">
          <Skeleton className="rounded-xl p-5 w-full h-full" />
        </div>

        <div className="max-w-10/12 w-full h-full mx-auto flex flex-col justify-center">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-8 w-1/3" />
          <div className="mt-10">
            <Skeleton className="h-10 w-1/4 !rounded-full" />
          </div>
        </div>

        <div className="absolute top-5 right-5 h-25 w-25 items-center justify-center flex text-4xl font-bold text-tx-on-primary">
          <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-5 rounded-full shadow-xs"></p>
          <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex text-4xl border border-t-transparent border-b-transparent scale-105 rounded-full shadow-xs"></p>
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
    <div className="bg-white flex border border-lines relative w-full h-auto rounded-2xl shadow-xs">
      <Carousel
        className="w-full h-full"
        opts={{ align: "start", loop: true, startIndex: currentPromotionIndex }}
        plugins={[autoplayRef.current]}
        onSelect={handleCarouselChange}
      >
        <CarouselContent className="ml-0 flex h-full">
          {promotions.map((promotion, index) => (
            <CarouselItem key={index} className="p-0 flex w-full h-full">
              <PromotionCard promotion={promotion} currentProductIndex={currentProductIndex} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
