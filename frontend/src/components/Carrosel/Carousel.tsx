// Carousel.tsx
import React, { useState, useEffect, useRef, useCallback, CSSProperties, Children } from "react";
import { createContext, useContext, useMemo } from "react";
import { CarouselContextProps, CarouselItemProps, CarouselProps, CarouselSlideProps } from "./CarouselTypes";
import { CarouselPrevious } from "./CarouselPrevious";
import { CarouselNext } from "./CarouselNext";
import { DotIndicators } from "./DotIndicators";

const CarouselContext = createContext<CarouselContextProps | null>(null);

export const CarouselItem: React.FC<CarouselItemProps> = ({ children, className }) => {
  return <div className={`w-full h-full ${className}`}> {children} </div>;
};

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow = 1,
  autoPlay = false,
  loop = false,
  className = "",
  breakpoints = {},
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState(slidesToShow);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = useMemo(
    () => Children.toArray(children) as React.ReactElement<CarouselSlideProps>[],
    [children]
  );

  const contentWidth = (totalSlides.length * 100) / slides;
  const offset = (100 / totalSlides.length) * currentIndex;

  const maxIndex = Math.max(0, totalSlides.length - slides);

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
    // setSlides(slidesToShow);
  }, [breakpoints, slidesToShow]);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [updateSlidesToShow]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [slides, maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (loop) return (prev - 1 + (maxIndex + 1)) % (maxIndex + 1);
      return Math.max(prev - 1, 0);
    });
    setCurrentIndex((prev) => Math.round(prev));
  }, [loop, maxIndex]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (loop) return (prev + 1) % (maxIndex + 1);
      return Math.min(prev + 1, maxIndex);
    });
    setCurrentIndex((prev) => Math.round(prev));
  }, [loop, maxIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = loop ? (prev + 1) % (maxIndex + 1) : Math.min(prev + 1, maxIndex);
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, loop, maxIndex]);

  const containerClasses = `overflow-hidden relative ${className}`;
  const wrapperClasses = `flex h-full transition-transform duration-500 ease-in-out snap-x snap-mandatory`;
  const wrapperStyle: CSSProperties = {
    width: `${contentWidth}%`,
    transform: `translateX(-${offset}%)`,
  };
  const contextValue: CarouselContextProps = {
    currentIndex,
    totalSlides: totalSlides.length,
    next,
    prev,
    setCurrentIndex,
    slidesToShow: slides,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div ref={containerRef} className={containerClasses}>
        <div ref={wrapperRef} className={wrapperClasses} style={wrapperStyle}>
          {Children.map(totalSlides, (child, index) => (
            <div
              key={index}
              className={`bg-transparent ${child.props.className}` || ""}
              style={{ width: `${100 / totalSlides.length}%` }}
            >
              {child}
            </div>
          ))}
        </div>

        <CarouselPrevious />
        <CarouselNext />
        <DotIndicators />
      </div>
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used within <Carousel />");
  return context;
};
