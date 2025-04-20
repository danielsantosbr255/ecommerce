// CarouselNext.tsx
import React from "react";
import { useCarousel } from "./Carousel";
import { ChevronRight } from "lucide-react";

export const CarouselNext = () => {
  const { next } = useCarousel();
  return (
    <button
      onClick={next}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
    >
      <ChevronRight />
    </button>
  );
};
