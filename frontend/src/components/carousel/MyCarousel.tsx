import { ProductType } from "@/types/ProductType";
import React, { useState, useEffect } from "react";
import ProductCard from "../products/ProdutctCard";

interface Props {
  slides: ProductType[];
}

const MyCustomCarousel: React.FC<Props> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides) slides = [];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 300000);

    return () => clearInterval(intervalId); // Limpar o intervalo ao desmontar
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="grid grid-cols-5 grid-flow-col transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <ProductCard key={slide.id} product={slide} />
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 opacity-70 hover:opacity-100"
      >
        {"<"}
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 opacity-70 hover:opacity-100"
      >
        {">"}
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`rounded-full w-3 h-3 ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCustomCarousel;
