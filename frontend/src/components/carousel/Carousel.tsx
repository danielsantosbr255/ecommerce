"use client";

import { ProductType } from "@/types/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../products/Product";
import React from "react";

interface ProductsCarouselProps {
  products: ProductType[];
  containerId: string; // Adicione um ID único para o container do carrossel
}

export default function Carousel({ products, containerId }: ProductsCarouselProps) {
  const slidesPerView = products.length < 5 ? products.length : 5;
  const prevButtonClass = `swiper-button-prev-${containerId}`;
  const nextButtonClass = `swiper-button-next-${containerId}`;
  const paginationClass = `swiper-pagination-${containerId}`;

  const handleAddToCart = () => {};

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        navigation={{
          nextEl: `.${nextButtonClass}`,
          prevEl: `.${prevButtonClass}`,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: `.${paginationClass}`,
          clickable: true,
        }}
        loop
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: slidesPerView },
        }}
        className="h-auto pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto flex justify-center items-stretch">
            <div className="w-full h-full max-w-sm">
              <Product product={product} className="h-full bg-gray-50 shadow" description={false} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões personalizados */}
      <div
        className={`swiper-button-prev ${prevButtonClass} !text-amber-500 !left-0 -translate-x-10 z-10 !hidden md:!flex`}
      />
      <div
        className={`swiper-button-next ${nextButtonClass} !text-amber-500 !right-0 translate-x-10 !z-20 !hidden md:!flex`}
      />

      {/* Paginação personalizada */}
      <div
        className={`swiper-pagination ${paginationClass} !-bottom-5 mt-4 flex justify-center items-center`}
      />
    </div>
  );
}
