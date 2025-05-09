"use client";

import { Product } from "@/types";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PromotionCard } from "./PromotionCard";
import PromotionSkeleton from "./PromotionSkeleton";

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

export function PromotionCarousel() {
  const [currentPromotionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [promotions, setPromotions] = useState<PromotionsProps[]>([]);
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
    setCurrentProductIndex(0);
  };

  if (loading) return <PromotionSkeleton />;

  return (
    <div className="bg-white flex border border-lines relative w-full h-auto rounded-2xl shadow-xs">
      <Carousel
        className="flex w-full h-full"
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
}
