import { CSSProperties } from "react";

// export interface CarouselProps {
//   children: React.ReactNode;
//   slidesToShow?: number;
//   autoPlay?: boolean;
//   loop?: boolean;
//   speed?: number;
//   className?: string;
//   breakpoints?: Record<number, number>; // { width: slidesToShow }
// }

export interface CarouselContextProps {
  index: number;
  totalSlides: number;
  slidesToShow: number;
  next: () => void;
  prev: () => void;
  setIndex: (index: number) => void;
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

export type CarouselConfig = {
  slidesToShow?: number;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  breakpoints?: Record<string, any>;
};

export type CarouselProps = {
  children: React.ReactNode;
  config?: CarouselConfig;
  className?: string;
};
