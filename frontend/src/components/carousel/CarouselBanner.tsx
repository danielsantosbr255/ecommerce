"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

interface ProductImage {
  url: string;
  alt?: string;
}

interface SimpleImageCarouselProps {
  images: ProductImage[];
  containerId: string;
  className?: string;
}

const CarouselBanner: React.FC<SimpleImageCarouselProps> = ({ images, containerId, className }) => {
  if (!images || images.length === 0) {
    return <p>Nenhuma imagem para exibir.</p>;
  }

  const prevButtonClass = `swiper-button-prev-${containerId}`;
  const nextButtonClass = `swiper-button-next-${containerId}`;
  const paginationClass = `swiper-pagination-${containerId}`;

  const swiper_params = {
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      prevEl: `.${prevButtonClass}`,
      nextEl: `.${nextButtonClass}`,
    },
    pagination: {
      el: `.${paginationClass}`,
      clickable: true,
    },
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    modules: [Navigation, Pagination, Autoplay],
  };

  return (
    <div className="relative w-full h-full rounded-2xl object-cover">
      <Swiper {...swiper_params}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.url}
              alt={image.alt || "Imagem do Banner"}
              // layout="responsive"
              width={1920}
              height={600}
              className="w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de navegação personalizados para este carrossel */}
      <div
        className={`swiper-button-prev ${prevButtonClass} !text-highlight-n !left-2 z-10 !hidden md:flex`}
      />
      <div
        className={`swiper-button-next ${nextButtonClass} !text-highlight-n !right-2 z-10 !hidden md:flex`}
      />
      <div
        className={`swiper-pagination ${paginationClass} !bottom-2 mt-4 flex justify-center items-center`}
      />
    </div>
  );
};

export default CarouselBanner;
