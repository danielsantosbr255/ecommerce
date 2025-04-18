"use client";

import { ProductType } from "@/types/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../products/ProdutctCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton"; // Crie este componente
import { useEffect, useState } from "react";
import Skeleton from "../ui/Skeleton";
import LoadingState from "../LoadingState";

interface ProductsCarouselProps {
  products: ProductType[] | null; // Permitir null para indicar estado de carregamento
  containerId: string;
}

export default function Carousel({ products, containerId }: ProductsCarouselProps) {
  const slidesPerView = 5.1;
  const prevButtonClass = `swiper-button-prev-${containerId}`;
  const nextButtonClass = `swiper-button-next-${containerId}`;
  const paginationClass = `swiper-pagination-${containerId}`;
  const [mounted, setMounted] = useState(false);
  const isLoading = products === null;
  const [skeletonCols, setSkeletonCols] = useState(5);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slidesToRender = isLoading ? Array(6).fill(null) : products;

  const swiper_params = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 1,
    slidesPerView: slidesPerView,
    navigation: {
      nextEl: `.${nextButtonClass}`,
      prevEl: `.${prevButtonClass}`,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    pagination: {
      el: `.${paginationClass}`,
      clickable: true,
    },
    loop: !isLoading && products.length >= 5,
    breakpoints: {
      320: { slidesPerView: 1.1 },
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3.1 },
      1024: { slidesPerView: 4.1 },
      1300: { slidesPerView: slidesPerView },
    },
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full h-full">
        <div className="relative h-full justify-center align-center">
          <div>
            <LoadingState className="absolute top-1/2 left-[43vw] transform -translate-x-1/2 -translate-y-1/2" />
            <ProductCardSkeleton className="opacity-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Swiper {...swiper_params} observer={true} observeParents={true}>
        {slidesToRender.map((item, index) => (
          <SwiperSlide key={index}>
            {isLoading ? <ProductCardSkeleton /> : <ProductCard product={item} />}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`swiper-button-prev ${prevButtonClass} !text-highlight-n !left-0 -translate-x-10 z-10 !hidden md:!flex`}
      />
      <div
        className={`swiper-button-next ${nextButtonClass} !text-highlight-n !right-0 translate-x-10 !z-20 !hidden md:!flex`}
      />
    </div>
  );
}
