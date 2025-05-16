// components/StickyOnScroll.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";

interface StickyOnScrollProps {
  children: React.ReactNode;
  offset?: number;
}

const StickyOnScroll: React.FC<StickyOnScrollProps> = ({ children, offset = 0 }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [stickyStyles, setStickyStyles] = useState<React.CSSProperties>({});
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMeasurements = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;

        setPlaceholderHeight(elementRef.current.offsetHeight);

        setStickyStyles({
          position: "fixed",
          top: offset,
          left: rect.left,
          width: rect.width,
          zIndex: 10,
          boxShadow: "0 2px 4px -2px rgba(0, 0, 0, 0.15)", // sombra só na parte de baixo
        });

        // Salva o ponto onde ele deve virar sticky
        elementRef.current.dataset.offsetTop = `${rect.top + scrollTop - offset}`;
      }
    };

    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrollTop = window.scrollY || window.pageYOffset;
      const offsetTop = parseFloat(elementRef.current.dataset.offsetTop || "0");

      setIsSticky(scrollTop >= offsetTop);
    };

    updateMeasurements();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [offset]);

  return (
    <>
      {isSticky && <div style={{ height: placeholderHeight }} />}
      <div
        ref={elementRef}
        style={isSticky ? stickyStyles : {}}
        className="transition-all duration-500 ease-in-out"
      >
        {children}
      </div>
    </>
  );
};

export default StickyOnScroll;
