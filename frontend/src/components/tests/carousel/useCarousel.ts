// useCarousel.ts
import React, { useRef, useState, useEffect, useCallback } from "react";

// Tipagem da API
interface CarouselApi {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  index: number;
}

export default interface CarouselOptions {
  loop?: boolean;
  autoPlay?: boolean;
  speed?: number;
}

interface UseCarouselReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  api: CarouselApi | null;
  options?: CarouselOptions;
}

export function useCarousel(options?: CarouselOptions): UseCarouselReturn {
  const { loop = false, autoPlay = false, speed = 3000 } = options || {};

  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  const update = useCallback(() => {
    const container = ref.current;
    if (!container) return;

    const track = container.querySelector(".carousel-track") as HTMLElement;
    const slides = container.querySelectorAll(".carousel-slide") as NodeListOf<HTMLElement>;

    if (!track || slides.length === 0) return;

    const containerWidth = container.offsetWidth;
    const slideWidth = slides[0].offsetWidth;
    const visible = Math.floor(containerWidth / slideWidth) || 1;

    setVisibleItems(visible);
    setTotal(slides.length);

    const offset = -(index * slideWidth);
    track.style.transform = `translateX(${offset}px)`;
  }, [index]);

  useEffect(() => {
    const handleResize = () => update();
    window.addEventListener("resize", handleResize);
    update();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [update]);

  const scrollPrev = () => {
    if (loop) return setIndex((prev) => (prev - 1 < 0 ? total - visibleItems : prev - 1));
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollNext = () => {
    if (loop) return setIndex((prev) => (prev + 1 > total - visibleItems ? 0 : prev + 1));
    setIndex((prev) => Math.min(prev + 1, total - visibleItems));
  };

  const scrollTo = (i: number) => {
    if (i >= 0 && i <= total - visibleItems) setIndex(i);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      scrollNext();
    }, speed);

    return () => clearInterval(interval);
  }, [scrollNext, total, visibleItems, autoPlay, speed]);

  // swipe + drag suave
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const track = container.querySelector(".carousel-track") as HTMLElement;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const onDragStart = (x: number) => {
      isDragging = true;
      startX = x;
      scrollStart = index;
      track.style.transition = "none";
    };

    const onDragMove = (x: number) => {
      if (!isDragging) return;
      const containerWidth = container.offsetWidth;
      const slideWidth = container.querySelector(".carousel-slide")?.clientWidth || 1;
      const delta = x - startX;
      const percent = delta / slideWidth;
      const offset = -(scrollStart * slideWidth - delta);
      track.style.transform = `translateX(${offset}px)`;
    };

    const onDragEnd = (x: number) => {
      if (!isDragging) return;
      isDragging = false;

      const slideWidth = container.querySelector(".carousel-slide")?.clientWidth || 1;
      const moved = x - startX;
      if (Math.abs(moved) > slideWidth / 4) {
        moved > 0 ? scrollPrev() : scrollNext();
      } else {
        update();
      }
      track.style.transition = "transform 0.3s ease";
    };

    const onTouchStart = (e: TouchEvent) => onDragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => onDragMove(e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => onDragEnd(e.changedTouches[0].clientX);

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      onDragStart(e.clientX);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => onDragMove(e.clientX);
    const onMouseUp = (e: MouseEvent) => {
      onDragEnd(e.clientX);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    container.addEventListener("mousedown", onMouseDown);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [scrollNext, scrollPrev, update, index]);

  const api: CarouselApi = {
    scrollPrev,
    scrollNext,
    scrollTo,
    canScrollPrev: () => index > 0 || loop,
    canScrollNext: () => index < total - visibleItems || loop,
    index,
  };

  return { ref, api };
}
