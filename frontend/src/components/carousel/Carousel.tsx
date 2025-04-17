"use client";

import { ProductType } from "@/types/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../products/ProdutctCard";
import React from "react";

interface ProductsCarouselProps {
  products: ProductType[];
  containerId: string; // Adicione um ID único para o container do carrossel
}

export default function Carousel({ products, containerId }: ProductsCarouselProps) {
  const slidesPerView = products.length < 5 ? products.length + 0.1 : 5.1;
  const prevButtonClass = `swiper-button-prev-${containerId}`;
  const nextButtonClass = `swiper-button-next-${containerId}`;
  const paginationClass = `swiper-pagination-${containerId}`;

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
    loop: slidesPerView === 5 ? true : false,
    breakpoints: {
      320: { slidesPerView: 1.1 },
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3.1 },
      1024: { slidesPerView: 4.1 },
      1300: { slidesPerView: slidesPerView },
    },
  };

  return (
    <div className="relative w-full h-full shrink-0">
      <Swiper {...swiper_params} className="relative h-full w-full rounded-lg">
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} className="h-full" description={true} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões personalizados */}
      <div
        className={`swiper-button-prev ${prevButtonClass} !text-highlight-n !left-0 -translate-x-10 z-10 !hidden md:!flex`}
      />
      <div
        className={`swiper-button-next ${nextButtonClass} !text-highlight-n !right-0 translate-x-10 !z-20 !hidden md:!flex`}
      />

      {/* Paginação personalizada */}
      {/* <div
        className={`swiper-pagination ${paginationClass} !-bottom-5 mt-4 flex justify-center items-center`}
      /> */}
    </div>
  );
}
