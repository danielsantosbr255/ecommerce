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
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={products.length < 4 ? products.length : 4} // Exibe 4 produtos por vez
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            breakpoints={{
                320: { slidesPerView: 1 }, // Mobile: 1 por vez
                640: { slidesPerView: 2 }, // Tablets: 2 por vez
                1024: { slidesPerView: 4 }, // Desktop: 4 por vez
            }}
            className="h-auto max-h-[400px]"
        >
            {products.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                    <div className="w-full max-w-[300px] h-auto bg-white p-2 rounded-lg shadow-md">
                        <Image
                            src={getValidImageUrl(product.image)}
                            alt={product.title}
                            width={180}
                            height={150}
                            className="object-cover w-full rounded-md"
                        />
                        <h3 className="text-sm font-semibold truncate">{product.title}</h3>
                        <p className="text-gray-500 text-sm">$ {product.price}</p>
                        <button className="mt-1 px-3 py-1 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transition">
                            Comprar
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
