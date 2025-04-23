// CarouselContext.ts
import { Children, cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";

interface CarouselContextType {
  index: number;
  setIndex: (i: number) => void;
  total: number;
  next: () => void;
  prev: () => void;
  slidesToShow: number;
}

export const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarousel = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel must be used within CarouselContext");
  return ctx;
};

// useSwipe.ts
export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) => {
  const startX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? onSwipeRight() : onSwipeLeft();
    }
  };

  const onTouchEnd = () => {
    startX.current = 0;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Carousel.tsx
export const Carousel = ({
  children,
  slidesToShow = 1,
  autoPlay = false,
  speed = 3000,
  loop = false,
}: {
  children: React.ReactNode;
  slidesToShow?: number;
  autoPlay?: boolean;
  speed?: number;
  loop?: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const total = Children.count(children);
  const maxIndex = Math.max(0, total - slidesToShow);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => setIndex((prev) => (loop ? (prev + 1) % (maxIndex + 1) : Math.min(prev + 1, maxIndex)));
  const prev = () => setIndex((prev) => (loop ? (prev - 1 + (maxIndex + 1)) % (maxIndex + 1) : Math.max(prev - 1, 0)));

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => next(), speed);
    return () => clearInterval(timer);
  }, [autoPlay, speed]);

  const contextValue = { index, setIndex, total, next, prev, slidesToShow };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className="relative overflow-hidden w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / slidesToShow) * index}%)`,
            width: `${(100 * total) / slidesToShow}%`,
          }}
        >
          {Children.map(children, (child) =>
            cloneElement(child as any, { style: { width: `${100 / total}%` } })
          )}
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

// Controls.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Controls = () => {
  const { prev, next } = useCarousel();

  return (
    <>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
      >
        <ChevronRight />
      </button>
    </>
  );
};

// Dots.tsx
export const Dots = () => {
  const { index, setIndex, total, slidesToShow } = useCarousel();
  const pages = Math.ceil(total / slidesToShow);

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === i ? "bg-blue-600 scale-110" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
