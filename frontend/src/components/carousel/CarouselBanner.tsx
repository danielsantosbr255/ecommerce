import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

interface Image {
  url: string;
  alt?: string;
}

interface SimpleImageCarouselProps {
  images: Image[];
  containerId: string; // Adicione um ID único para o container do carrossel
  className?: string;
}

const CarouselBanner: React.FC<SimpleImageCarouselProps> = ({ images, containerId, className }) => {
  if (!images || images.length === 0) {
    return <p>Nenhuma imagem para exibir.</p>;
  }

  const prevButtonClass = `swiper-button-prev-${containerId}`;
  const nextButtonClass = `swiper-button-next-${containerId}`;
  const paginationClass = `swiper-pagination-${containerId}`;

  return (
    <div className={`relative w-full ${className}`}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: `.${prevButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        }}
        pagination={{
          el: `.${paginationClass}`,
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-auto"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-auto">
            <Image
              width={1920}
              height={570}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={100}
              src={image.url}
              alt={image.alt || "Imagem do Banner"}
              // className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de navegação personalizados para este carrossel */}
      <div className={`swiper-button-prev ${prevButtonClass} !text-amber-500 !left-2 z-10 !hidden md:flex`} />
      <div
        className={`swiper-button-next ${nextButtonClass} !text-amber-500 !right-2 z-10 !hidden md:flex`}
      />

      {/* Paginação personalizada para este carrossel */}
      <div
        className={`swiper-pagination ${paginationClass} !bottom-2 mt-4 flex justify-center items-center`}
      />
    </div>
  );
};

export default CarouselBanner;
