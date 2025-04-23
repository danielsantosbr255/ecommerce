// Carousel.tsx
"use client";
import { createContext, useContext, useMemo, useState, useEffect, Children, cloneElement } from "react";
import { CarouselConfig, CarouselContextProps, CarouselProps } from "./CarouselTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSlidesToShow } from "./useSlidesToShow";

const CarouselContext = createContext<CarouselContextProps | null>(null);

const defaultConfig: Required<CarouselConfig> = {
  slidesToShow: 1,
  autoPlay: false,
  loop: false,
  speed: 3000,
  breakpoints: {},
};

export const Carousel: React.FC<CarouselProps> = ({ children, config = {}, className }) => {
  const { slidesToShow: defaultSlides, autoPlay, loop, speed, breakpoints } = { ...defaultConfig, ...config };

  const [index, setIndex] = useState(0);
  const slidesToShow = 1;
  // const { containerRef } = useSlidesToShow(breakpoints, defaultSlides);
  // const { slidesToShow, containerRef } = useSlidesToShow(breakpoints, defaultSlides);
  const totalSlides = useMemo(() => Children.count(children), [children]);

  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  const clampIndex = (value: number) => Math.max(0, Math.min(value, maxIndex));
  const wrapIndex = (value: number) => Math.round((value + (maxIndex + 1)) % (maxIndex + 1));

  const prev = () => setIndex((prev) => (loop ? wrapIndex(prev - 1) : clampIndex(prev - 1)));
  const next = () => setIndex((prev) => (loop ? wrapIndex(prev + 1) : clampIndex(prev + 1)));

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => next(), speed);
    return () => clearInterval(interval);
  }, [autoPlay, loop, maxIndex, speed, next]);

  const trackStyle = useMemo(() => {
    const widthPercent = (totalSlides * 100) / slidesToShow;
    const translateX = (100 / totalSlides) * index;
    return {
      // width: `${widthPercent}%`,
      transform: `translateX(-${translateX}%)`,
    };
  }, [slidesToShow, totalSlides, index]);

  return (
    <CarouselContext.Provider value={{ index, totalSlides, next, prev, setIndex, slidesToShow }}>
      <div className="relative w-full">

        <div className="bg-red-500 overflow-hidden">
          {/* {children} */}
          <div className={cn("flex transition-all duration-300 ease-in-out")} children={children} style={trackStyle}/>
        </div>

        <CarouselPrevious />
        <CarouselNext />
        <DotIndicators />
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("bg-green-500 border min-w-0 shrink-0 grow-0 basis-full carousel-slide", className)}
      {...props}
    />
  );
};

export const CarouselPrevious = () => {
  const { prev } = useCarousel();
  const classes = "absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10";

  return (
    <button onClick={prev} className={classes} aria-label="Previous slide">
      <ChevronLeft />
    </button>
  );
};

export const CarouselNext = () => {
  const { next } = useCarousel();
  const classes = "absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10";

  return (
    <button onClick={next} className={classes} aria-label="Next slide">
      <ChevronRight />
    </button>
  );
};

export const DotIndicators = () => {
  const { totalSlides, index, setIndex, slidesToShow } = useCarousel();
  const pageCount = Math.ceil(Math.max(0, totalSlides - slidesToShow)) + 1;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={cn(
            `w-3 h-3 rounded-full transition-colors`,
            index === i ? "bg-blue-600/70" : "bg-blue-200/50",
            "border-2 border-blue-400"
          )}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={index === i}
        />
      ))}
    </div>
  );
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used within <Carousel />");
  return context;
};
