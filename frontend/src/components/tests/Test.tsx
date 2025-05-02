// CarouselContext.tsx
import { createContext, useContext } from "react";

interface CarouselContextProps {
  current: number;
  total: number;
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
  setTotal: (total: number) => void;
  slidesToShow: number;
}

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used within <Carousel />");
  return context;
};

// Carousel.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { CarouselContext } from "./CarouselContext";
import { useSwipeable } from "react-swipeable";

interface CarouselProps {
  children: React.ReactNode;
  slidesToShow?: number;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  breakpoints?: Record<number, number>; // { width: slidesToShow }
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow = 1,
  autoPlay = false,
  loop = false,
  className = "",
  breakpoints = {},
}) => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(slidesToShow);
  const [total, setTotal] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlidesToShow = useCallback(() => {
    const width = window.innerWidth;
    const sorted = Object.keys(breakpoints)
      .map(Number)
      .sort((a, b) => b - a);
    for (const bp of sorted) {
      if (width >= bp) {
        setSlides(breakpoints[bp]);
        return;
      }
    }
    setSlides(slidesToShow);
  }, [breakpoints, slidesToShow]);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [updateSlidesToShow]);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(total / slides) - 1);
    const newCurrent = Math.min(current, maxPage);
    if (newCurrent !== current) {
      setCurrent(newCurrent);
    }
  }, [slides, total]);

  const next = useCallback(() => {
    setCurrent((prev) => (loop ? (prev + 1) % Math.ceil(total / slides) : Math.min(prev + 1, Math.ceil(total / slides) - 1)));
  }, [total, slides, loop]);

  const prev = useCallback(() => {
    setCurrent((prev) => (loop ? (prev - 1 + Math.ceil(total / slides)) % Math.ceil(total / slides) : Math.max(prev - 1, 0)));
  }, [total, slides, loop]);

  const handlers = useSwipeable({ onSwipedLeft: next, onSwipedRight: prev });

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const nextIndex = loop ? (prev + 1) % Math.ceil(total / slides) : Math.min(prev + 1, Math.ceil(total / slides) - 1);
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, total, loop, slides]);

  return (
    <CarouselContext.Provider value={{ current, total, next, prev, set: setCurrent, setTotal, slidesToShow: slides }}>
      <div ref={containerRef} className={`relative overflow-hidden ${className}`} {...handlers}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

// CarouselContent.tsx
import React, { useEffect } from "react";
import { useCarousel } from "./CarouselContext";

export const CarouselContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { current, slidesToShow, setTotal } = useCarousel();
  const slides = React.Children.toArray(children);

  useEffect(() => {
    setTotal(slides.length);
  }, [slides.length, setTotal]);

  return (
    <div
      className="flex transition-transform duration-500 ease-in-out snap-x snap-mandatory"
      style={{
        transform: `translateX(-${current * (100 / slidesToShow)}%)`,
        width: `${(slides.length / slidesToShow) * 100}%`,
      }}
    >
      {slides.map((child, idx) => (
        <div
          key={idx}
          className="snap-start shrink-0"
          style={{ width: `${100 / slides.length}%` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

CarouselContent.displayName = "CarouselContent";

// CarouselItem.tsx
import React from "react";

export const CarouselItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full h-full p-2"> {children} </div>;
};

// CarouselPrevious.tsx
import React from "react";
import { useCarousel } from "./CarouselContext";

export const CarouselPrevious = () => {
  const { prev } = useCarousel();
  return (
    <button
      onClick={prev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-xs z-10"
    >
      ←
    </button>
  );
};

// CarouselNext.tsx
import React from "react";
import { useCarousel } from "./CarouselContext";

export const CarouselNext = () => {
  const { next } = useCarousel();
  return (
    <button
      onClick={next}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-xs z-10"
    >
      →
    </button>
  );
};

// DotIndicators.tsx
import React from "react";
import { useCarousel } from "./CarouselContext";

export const DotIndicators = () => {
  const { total, current, set, slidesToShow } = useCarousel();
  const pageCount = Math.ceil(total / slidesToShow);

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => set(i)}
          className={`w-3 h-3 rounded-full transition-colors ${current === i ? "bg-blue-600" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};
