"use client";

import { ProductType } from "@/types/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsCarouselProps {
    products: ProductType[];
}

const getValidImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.jpg";
    const baseUrl = "http://localhost:3001";
    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
};

export default function Carousel({ products }: ProductsCarouselProps) {
    return (
        <div className="relative">
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
                className="h-auto max-h-[400px] pb-10"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                        <div className="w-full flex flex-col bg-gray-50 p-2 rounded-lg border border-amber-500/20">
                            <Image
                                src={getValidImageUrl(product.image)}
                                alt={product.title}
                                width={180}
                                height={150}
                                className="object-cover aspect-[3/3] scale-80 w-full rounded-lg hover:border border-amber-500"
                            />
                            <h3 className="text-sm font-semibold truncate">{product.title}</h3>
                            <p className="text-amber-500 text-sm">$ {product.price}</p>
                            <button className="flex justify-center items-center py-1 px-3 rounded-md text-sm cursor-pointer bg-white hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Paginação personalizada */}
            <div className="swiper-pagination !-bottom-5 mt-4 flex justify-center items-center" />
        </div>
    );
}
