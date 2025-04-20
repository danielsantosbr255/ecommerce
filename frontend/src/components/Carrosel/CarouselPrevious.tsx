// CarouselPrevious.tsx
import React from "react";
import { useCarousel } from "./Carousel";
import { ChevronLeft } from "lucide-react";

export const CarouselPrevious = () => {
  const { prev } = useCarousel();
  return (
    <button
      onClick={prev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
    >
      <ChevronLeft />
    </button>
  );
};
