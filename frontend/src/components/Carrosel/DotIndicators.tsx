// DotIndicators.tsx
import React from "react";
import { useCarousel } from "./Carousel";
import { cn } from "@/lib/utils";

export const DotIndicators = () => {
  const { totalSlides, currentIndex, setCurrentIndex, slidesToShow } = useCarousel();  
  const pageCount = Math.ceil(totalSlides - slidesToShow) + 1;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={cn(
            `w-3 h-3 rounded-full transition-colors ${currentIndex === i ? "bg-blue-600" : "bg-gray-100"}`,
            "border-2 border-blue-400"
          )}
        />
      ))}
    </div>
  );
};
