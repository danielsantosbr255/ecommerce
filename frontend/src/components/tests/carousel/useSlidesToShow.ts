// hooks/useSlidesToShow.ts
import { useEffect, useRef, useState } from "react";

export function useSlidesToShow(breakpoints: Record<number, number>, defaultSlides: number = 1) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(defaultSlides);

  console.log("My ref", containerRef)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const matched = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a)
        .find((bp) => width >= bp);

      setSlidesToShow(matched ? breakpoints[matched] : defaultSlides);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [breakpoints, defaultSlides]);

  return { slidesToShow, containerRef };
}
