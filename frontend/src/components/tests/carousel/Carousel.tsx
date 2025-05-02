// Carousel.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselOptions, { useCarousel } from "./useCarousel";

interface CarouselProps {
  options?: CarouselOptions;
}

// Componente Carousel
export const Carousel = ({ children, options = {} }: React.ComponentProps<"div"> & CarouselProps) => {
  const { ref, api } = useCarousel(options);

  return (
    <div className="bg-yellow-500 relative w-full overflow-hidden" ref={ref}>
      <div className="bg-red-500 flex transition-transform duration-300 ease-in-out carousel-track">
        <div className="bg-green-500 border flex w-full" children={children} />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          onClick={api?.scrollPrev}
          disabled={!api?.canScrollPrev()}
          className="bg-black/50 text-tx-on-primary px-2 py-1 rounded disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={api?.scrollNext}
          disabled={!api?.canScrollNext()}
          className="bg-black/50 text-tx-on-primary px-2 py-1 rounded disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export const CarouselItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full carousel-slide", className)}
      {...props}
    />
  );
};
