"use client";

import Link from "next/link";
import { useRef } from "react";
import { Promotion } from "@/types";
import { GiRocket } from "react-icons/gi";
import { Orbitron } from "next/font/google";
import { TbBackground } from "react-icons/tb";
import Autoplay from "embla-carousel-autoplay";
import { FiShoppingCart } from "react-icons/fi";
import ProductImage from "../products/ProductImage";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel/carousel";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Componente para o cartão de convite (skeleton version)
function PromotionArtisticSlot({ isLoading = false }: { isLoading?: boolean }) {
  const skeleton = "animate-pulse !bg-gray-200 rounded-md transition-all";

  return (
    <div
      className={`relative flex items-center justify-center rounded-lg overflow-hidden aspect-square ${
        isLoading ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-100 via-pink-200 to-purple-200"
      }`}
    >
      {isLoading ? (
        // Skeleton para o slogan
        <div className="flex flex-col items-center justify-center gap-2">
          <div className={`h-6 w-32 ${skeleton}`}></div>
          <div className={`h-4 w-40 ${skeleton}`}></div>
        </div>
      ) : (
        <>
          <svg className="absolute w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.2)" className="animate-pulse-slow" />
            <circle cx="150" cy="150" r="40" fill="rgba(255,255,255,0.15)" className="animate-pulse-slow delay-200" />
            <rect
              x="20"
              y="130"
              width="50"
              height="50"
              fill="rgba(255,255,255,0.1)"
              className="animate-spin-slow origin-center"
            />
          </svg>
          <div className="relative text-center p-4">
            <h2 className="text-sm lg:text-2xl font-bold text-white drop-shadow-lg">Oferta Especial!</h2>
            <p className="text-xs lg:text-sm text-white/80 mt-1">Aproveite o melhor da promoção</p>
          </div>
        </>
      )}
    </div>
  );
}

function DiscountBadge({ discount, isLoading }: { discount: number; isLoading?: boolean }) {
  if (isLoading)
    return (
      <div className="w-20 h-20 items-center justify-center mx-auto md:mx-0 rounded-full shadow-lg bg-gray-200 animate-pulse" />
    );
  return (
    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-lg overflow-hidden mx-auto md:mx-0">
      <span className="absolute inset-0 border-4 border-t-transparent border-white/30 rounded-full animate-material-spin"></span>
      <span className="text-xl font-bold text-tx-on-primary">-{discount}%</span>
    </div>
  );
}

// Cartão individual de produto (agora com suporte a skeleton)
function ProductCard({ item, isLoading = false }: { item: Promotion["products"][0] | null; isLoading?: boolean }) {
  const skeleton = "animate-pulse !bg-gray-200 rounded-md transition-all";
  const showSkeleton = isLoading || !item;

  const image = showSkeleton ? (
    <span className={`w-full h-full aspect-square !max-h-80 !max-w-80 m-auto ${skeleton}`} />
  ) : (
    <ProductImage product={item.product} alt={item.product.title} className="aspect-square object-cover rounded-lg" />
  );

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-col relative bg-bg-secondary rounded-lg p-2 shadow-md hover:shadow-xl transition-all duration-300`}
      >
        {image}

        {showSkeleton ? (
          <div className={`absolute bottom-2 right-2 !rounded-full h-6 w-16 ${skeleton}`}></div>
        ) : (
          <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md hover:bg-primary/90 transition-colors">
            <FiShoppingCart size={14} />
            Comprar
          </div>
        )}
      </div>

      {isLoading || !item ? (
        <div className={`h-4 w-full ${skeleton}`}></div>
      ) : (
        <p className="text-xs text-tx-secondary line-clamp-2 font-medium">{item.product.title}</p>
      )}
    </div>
  );
}

// Cartão de promoção (agora com suporte a skeleton)
function PromotionCard({ promotion, isLoading = false }: { promotion: Promotion | null; isLoading?: boolean }) {
  const skeleton = "animate-pulse !bg-gray-200 !text-transparent rounded-md transition-all";
  const maxProductsToShow = 4;

  if (!promotion) {
    promotion = {
      title: "Titulo",
      description: Array(100).fill(" -").join(""),
      discount: 1,
      products: Array(maxProductsToShow).fill(null),
    } as Promotion;
  }

  const productsToDisplay = promotion.products.slice(0, maxProductsToShow);

  return (
    <Link
      href={promotion?.slug ? `/promotions/${promotion.slug}` : "#"}
      className="relative flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 items-center w-full h-full group p-4 md:px-10 xl:px-20 lg:py-10 min-h-[280px] lg:min-h-[400px]"
    >
      <div className="flex flex-col gap-2 md:gap-4 text-center md:text-left">
        <h1
          className={`text-3xl md:text-2xl xl:text-5xl font-bold ${orbitron.className} text-transparent ${
            isLoading ? skeleton : "bg-gradient-to-r from-primary to-pink-500 bg-clip-text"
          }`}
        >
          {promotion?.title}
        </h1>

        <p className={`text-primary/80 text-base md:text-sm xl:text-lg ${orbitron.className} ${isLoading && skeleton}`}>
          {promotion?.description}
        </p>

        {promotion.discount > 0 && <DiscountBadge discount={promotion.discount} isLoading={isLoading} />}
      </div>

      {/* Produtos */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {productsToDisplay.map((item, idx) => (
          <div
            key={idx}
            className={`relative group overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105`}
          >
            <ProductCard item={item} isLoading={isLoading} />
            {!isLoading && (
              <div className="absolute inset-0 flex items-center justify-center transition-colors">
                <span className="opacity-0 group-hover:opacity-100 text-white font-bold text-sm px-2 py-1 rounded bg-primary/80">
                  Confira a promoção!
                </span>
              </div>
            )}
          </div>
        ))}
        {productsToDisplay.length < maxProductsToShow && <PromotionArtisticSlot isLoading={isLoading} />}

        {promotion.products.length < maxProductsToShow - 1 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center rounded-lg">
              <span className="relative w-full h-full aspect-square !max-h-80 !max-w-80 m-auto flex items-center justify-center">
                <GiRocket className="text-primary inline-block rotate-90 animate-bounce" size={80} />
                <span className="absolute bottom-2 text-xs text-center text-tx-secondary px-2">
                  Confira a lista completa de produtos!
                </span>
                <TbBackground className="absolute inset-0 text-primary/10 animate-pulse w-full h-full" size={120} />
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function PromotionCarousel({ promotions }: { promotions: Promotion[] | null }) {
  const isLoading = !promotions || promotions.length === 0;
  const autoplayRef = useRef(Autoplay({ delay: 8000, stopOnInteraction: false }));

  const placeholderPromotions = Array(3).fill(null) as Promotion[];
  const items = isLoading ? placeholderPromotions : promotions;

  return (
    <div className="bg-gradient-to-r from-bg-secondary via-bg-primary/50 to-bg-secondary rounded-lg shadow-lg w-full overflow-hidden border border-lines/10">
      <Carousel className="w-full" opts={{ loop: true }} plugins={[autoplayRef.current]}>
        <CarouselContent>
          {items.map((promotion, index) => (
            <CarouselItem key={index}>
              <PromotionCard promotion={promotion} isLoading={isLoading} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!left-2 !hidden md:!block" />
        <CarouselNext className="!right-2 !hidden md:!block" />
      </Carousel>
    </div>
  );
}
