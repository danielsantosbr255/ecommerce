import React, { useEffect, useMemo } from "react";
import { useCarousel } from "./Carousel";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export const CarouselContent: React.FC<Props> = ({ children, className, itemClassName }) => {
  const { currentIndex, slidesToShow, setTotalSlides } = useCarousel();
  const totalSlides = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    setTotalSlides(totalSlides.length);
  }, [totalSlides.length, setTotalSlides]);

  const contentWidth = (totalSlides.length * 100) / slidesToShow;
  const offset = (100 / totalSlides.length) * currentIndex;

  return (
    <div
      className={cn(
        className,
        "flex h-full transition-transform duration-500 ease-in-out snap-x snap-mandatory"
      )}
      style={{
        width: `${contentWidth}%`,
        transform: `translateX(-${offset}%)`,
      }}
    >
      {totalSlides.map((child, idx) => (
        <div
          key={idx}
          className={cn("snap-start p-1 shrink-0", itemClassName)}
          style={{ width: `${100 / totalSlides.length}%` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

CarouselContent.displayName = "CarouselContent";
