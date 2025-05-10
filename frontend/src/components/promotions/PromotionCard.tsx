import Link from "next/link";
import ProductImage from "../products/ProductImage";
import { Product } from "@/types";

interface PromotionsProductProps {
  id: number;
  productId: number;
  product: Product;
}

interface PromotionsProps {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string;
  discount: number;
  products: PromotionsProductProps[];
}

interface PromotionsCardProps {
  promotion: PromotionsProps;
  currentProductIndex: number;
}

export function PromotionCard({ promotion, currentProductIndex }: PromotionsCardProps) {
  return (
    <Link
      href={`/promotions/${promotion.slug}`}
      className="p-2 md:p-5 relative grid grid-cols-[30%_auto] gap-2 w-full h-full"
    >
      {promotion.products?.length && (
        <ProductImage
          product={promotion.products[currentProductIndex]?.product}
          key={promotion.products[currentProductIndex]?.product.id}
          alt={promotion.products[currentProductIndex]?.product.title}
          className="overflow-hidden aspect-square !max-h-80 !max-w-80 m-auto"
        />
      )}

      <div className="flex flex-col items-center justify-center w-full md:max-w-4/5 h-full ml-5">
        <div className="w-full h-full justify-center flex flex-col">
          <h1 className="text-lg xl:text-6xl py-4 font-bold line-clamp-2">{promotion.title}</h1>
          <p className="text-primary text-sm xl:text-xl line-clamp-2">{promotion.description}</p>
        </div>
      </div>

      {promotion.discount > 0 && (
        <div className="flex absolute top-[2%] right-[2%] h-12 w-12 md:h-25 md:w-25 items-center justify-center text-4xl font-bold text-primary">
          <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-2 md:border-5 rounded-full shadow-xs"></p>
          <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex border border-t-transparent border-b-transparent scale-105 rounded-full shadow-xs"></p>
          <p className="absolute text-center text-xs md:text-2xl">{promotion.discount}%</p>
        </div>
      )}
    </Link>
  );
}
