"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

interface Product {
    name: string;
    price: string;
    image: string;
}

interface FeaturedCarouselProps {
    products: Product[];
    slidesPerView?: number;
    spaceBetween?: number;
}

const FeaturedCarousel = ({
    products,
    slidesPerView = 5,
    spaceBetween = 20,
}: FeaturedCarouselProps) => {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Destaques</h2>

            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                loop={true}
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white shadow-sm rounded-sm p-4 text-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover mb-2 rounded"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedCarousel;
