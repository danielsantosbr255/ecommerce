"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";

interface ProductsCarouselProps {
    products: ProductType[];
}

export default function Carousel({ products }: ProductsCarouselProps) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const nextSlide = () => {
        setStartIndex((prev) => (prev + itemsPerPage >= products.length ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev === 0 ? products.length - itemsPerPage : prev - 1));
    };

    return (
        <div className="bg-gray-500 relative w-full mx-auto overflow-hidden p-4">
            <h2 className="text-2xl text-white font-bold text-center mb-4">Destaques</h2>

            {/* Produtos visíveis */}
            <div className="flex space-x-5">
                {products.slice(startIndex, startIndex + itemsPerPage).map((product, index) => (
                    <div key={index} className="w-1/5 flex-shrink-1 p-2">
                        <div className="bg-white shadow-sm rounded-sm p-4 text-center">
                            <Image
                                src={`process.env.NEXT_PUBLIC_API_URL${product.image}`}
                                width={400}
                                height={700}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt={product.title}
                                className="w-full h-40 object-cover mb-2 rounded"
                            />

                            <h1 className="text-sm font-semibold truncate">{product.title}</h1>
                            <p className="text-amber-500 font-bold">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botões de Navegação */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
                <ArrowLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
                <ArrowRight />
            </button>
        </div>
    );
}
