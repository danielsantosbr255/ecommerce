import React, { useState, useEffect, useRef, Children, cloneElement, CSSProperties } from "react";
import { useDebounce } from "./useDebounce";

interface SwiperProps {
  children: React.ReactNode | React.ReactNode[];
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  loop?: boolean;
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  speed?: number;
  initialSlide?: number;
  onSlideChange?: (index: number) => void;
  onSwiper?: (swiperInstance: SwiperInstance) => void;
  className?: string;
  style?: CSSProperties;
}

interface SwiperSlideProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface SwiperInstance {
  slideTo: (index: number, speed?: number) => void;
  slideNext: (speed?: number) => void;
  slidePrev: (speed?: number) => void;
  currentIndex: number;
}

const SwiperContext = React.createContext<SwiperInstance | undefined>(undefined);

const calculateTranslateX = (
  index: number,
  spaceBetween: number,
  slidesPerView: number | "auto",
  slideWidth: number,
  containerWidth: number
): number => {
  if (slidesPerView === "auto") {
    return -index * (slideWidth + spaceBetween);
  }
  const visibleSlides = Math.floor(containerWidth / slideWidth);
  const centeredPosition =
    (containerWidth - visibleSlides * slideWidth - (visibleSlides - 1) * spaceBetween) / 2;
  return centeredPosition - index * (slideWidth + spaceBetween);
};

export const Swiper: React.FC<SwiperProps> = ({
  children,
  spaceBetween = 0,
  slidesPerView = 1,
  loop = false,
  autoplay = false,
  speed = 300,
  initialSlide = 0,
  onSlideChange,
  onSwiper,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [containerWidth, setContainerWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = Children.toArray(children) as React.ReactElement<SwiperSlideProps>[];
  const numSlides = slides.length;

  const debouncedResize = useDebounce(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, 200);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [debouncedResize]);

  useEffect(() => {
    if (wrapperRef.current && containerWidth > 0 && numSlides > 0) {
      const firstSlide = wrapperRef.current.children[0] as HTMLElement;
      setSlideWidth(firstSlide ? firstSlide.offsetWidth : 0);
    }
  }, [containerWidth, numSlides]);

  useEffect(() => {
    if (numSlides > 0) {
      setTranslateX(
        calculateTranslateX(currentIndex, spaceBetween, slidesPerView, slideWidth, containerWidth)
      );
      if (onSlideChange) {
        onSlideChange(currentIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, spaceBetween, slidesPerView, slideWidth, containerWidth]);

  useEffect(() => {
    let autoplayInterval: NodeJS.Timeout | null = null;
    if (autoplay && numSlides > 1) {
      const delay = typeof autoplay === "object" && autoplay.delay ? autoplay.delay : 3000;
      const disableOnInteraction =
        typeof autoplay === "object" && autoplay.disableOnInteraction !== undefined
          ? autoplay.disableOnInteraction
          : true;

      const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
          slideNext();
        }, delay);
      };

      const stopAutoplay = () => {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
        }
      };

      startAutoplay();

      if (disableOnInteraction && wrapperRef.current) {
        wrapperRef.current.addEventListener("mouseenter", stopAutoplay);
        wrapperRef.current.addEventListener("mouseleave", startAutoplay);
      }

      return () => {
        stopAutoplay();
        if (wrapperRef.current && disableOnInteraction) {
          wrapperRef.current.removeEventListener("mouseenter", stopAutoplay);
          wrapperRef.current.removeEventListener("mouseleave", startAutoplay);
        }
      };
    }
  }, [autoplay, numSlides]);

  const [translateX, setTranslateX] = useState(
    calculateTranslateX(initialSlide, spaceBetween, slidesPerView, slideWidth, containerWidth)
  );

  const slideTo = (index: number, customSpeed = speed) => {
    if (isTransitioning || index < 0 || index >= numSlides) {
      return;
    }
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTranslateX(calculateTranslateX(index, spaceBetween, slidesPerView, slideWidth, containerWidth));
    setTimeout(() => setIsTransitioning(false), customSpeed);
  };

  const slideNext = (customSpeed = speed) => {
    let nextIndex = currentIndex + 1;
    if (loop && numSlides > 0) {
      nextIndex = nextIndex % numSlides;
    }
    slideTo(nextIndex, customSpeed);
  };

  const slidePrev = (customSpeed = speed) => {
    let prevIndex = currentIndex - 1;
    if (loop && numSlides > 0) {
      prevIndex = (prevIndex + numSlides) % numSlides;
    }
    slideTo(prevIndex, customSpeed);
  };

  const swiperInstance: SwiperInstance = {
    slideTo,
    slideNext,
    slidePrev,
    currentIndex,
  };

  useEffect(() => {
    if (onSwiper) {
      onSwiper(swiperInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperInstance]);

  const wrapperStyle: CSSProperties = {
    transform: `translateX(${translateX}px)`,
    transition: isTransitioning ? `transform ${speed}ms ease-in-out` : "none",
    display: "flex",
    gap: `${spaceBetween}px`,
  };

  const containerClasses = `overflow-hidden relative ${className}`;
  const wrapperClasses = `transition-transform duration-${speed} ease-in-out`;

  return (
    <SwiperContext.Provider value={swiperInstance}>
      <div ref={containerRef} className={containerClasses} style={style}>
        <div ref={wrapperRef} className={wrapperClasses} style={wrapperStyle}>
          {Children.map(slides, (child, index) => (
            <div
              key={index}
              className={`swiper-slide ${child.props.className || ""}`}
              style={{
                width:
                  slidesPerView === "auto"
                    ? "auto"
                    : `${100 / (typeof slidesPerView === "number" ? slidesPerView : 1)}%`,
                ...child.props.style,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </SwiperContext.Provider>
  );
};

export const SwiperSlide: React.FC<SwiperSlideProps> = ({ children, className = "", style }) => {
  return (
    <div className={`swiper-slide ${className}`} style={style}>
      {children}
    </div>
  );
};

export const useSwiper = (): SwiperInstance | undefined => {
  return React.useContext(SwiperContext);
};
