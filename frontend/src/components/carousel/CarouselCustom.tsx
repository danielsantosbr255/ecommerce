import { ProductType } from "@/types/ProductType";
import React, { useState, useEffect } from "react";
import ProductCard from "../products/ProdutctCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";

interface Props {
  products: ProductType[];
  slidesToShow?: number;
}

const CustomCarousel: React.FC<Props> = ({ products, slidesToShow = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLoading = !products || products.length === 0;
  const placeholder = Array(11).fill({}) as ProductType[];
  const randomInt = Math.floor(Math.random() * 1000);

  const items = isLoading ? placeholder : products;
  const renderItem = (product: ProductType, index: number) =>
    isLoading ? <ProductCardSkeleton /> : <ProductCard product={product} />;

  const totalSlides = items.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(totalSlides - slidesToShow, prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 3000 + randomInt);
    return () => clearInterval(intervalId);
  }, [totalSlides, slidesToShow]);

  const slideWidth = `${100 / totalSlides}%`;
  const translateXValue = `-${(100 / totalSlides) * currentIndex}%`;

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          width: `${(totalSlides * 100) / slidesToShow}%`,
          transform: `translateX(${translateXValue})`,
        }}
      >
        {items.map((product, index) => (
          <div key={index} className="shrink-0" style={{ width: slideWidth }}>
            {renderItem(product, index)}
          </div>
        ))}
      </div>

      {totalSlides > slidesToShow && (
        <>
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
            {Array.from({ length: totalSlides - slidesToShow + 1 }).map((_, index) => (
              <button
                key={index}
                className={`rounded-full w-3 h-3 ${
                  currentIndex === index ? "bg-highlight-n" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCarousel;
