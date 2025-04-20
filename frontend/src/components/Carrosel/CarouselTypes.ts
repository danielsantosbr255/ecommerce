import { CSSProperties } from "react";

export interface CarouselProps {
  children: React.ReactNode;
  slidesToShow?: number;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  breakpoints?: Record<number, number>; // { width: slidesToShow }
}

export interface CarouselContextProps {
  currentIndex: number;
  totalSlides: number;
  slidesToShow: number;
  next: () => void;
  prev: () => void;
  setCurrentIndex: (index: number) => void;
}

export interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}
