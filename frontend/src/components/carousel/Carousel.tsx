"use client";

import { ProductType } from "@/types/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../products/Product";

interface ProductsCarouselProps {
    products: ProductType[];
}

export default function Carousel({ products }: ProductsCarouselProps) {
    return (
        <div className="relative w-full">
            {/* Botões personalizados */}
            <div className="swiper-button-prev !text-amber-500 !left-0 -translate-x-10 z-10 hidden md:flex" />
            <div className="swiper-button-next !text-amber-500 !right-0 translate-x-10 z-10 hidden md:flex" />

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={products.length < 4 ? products.length : 4}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                loop
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="h-auto pb-10"
            >
                {products.map((product) => (
                    <SwiperSlide
                        key={product.id}
                        className="!h-auto flex justify-center items-stretch"
                    >
                        <div className="w-full h-full max-w-sm">
                            <Product product={product} className="h-full" description={false} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Paginação personalizada */}
            <div className="swiper-pagination !-bottom-5 mt-4 flex justify-center items-center" />
        </div>
    );
}
