"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

interface BannerImage {
  id: number;
  url: string;
  alt?: string;
}

const images: BannerImage[] = [
  { id: 0, url: "/images/banner1.jpg", alt: "Banner Promocional 1" },
  { id: 1, url: "/images/banner2.jpg", alt: "Banner Promocional 2" },
  { id: 2, url: "/images/banner3.jpg", alt: "Banner Promocional 3" },
  { id: 3, url: "/images/banner4.jpg", alt: "Banner Promocional 4" },
  { id: 4, url: "/images/banner5.jpg", alt: "Banner Promocional 5" },
];

const CarouselBanner = () => {
  const containerId = "banner-carousel";

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
    <div className="w-full h-auto bg-red-500 object-cover overflow-hidden rounded-xl relative">
      <Swiper {...swiper_params}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full h-full bg-blue-500 justify-center items-center flex object-contain">
              <Image src={image.url} alt={image.alt || ""} width={500} height={500} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
