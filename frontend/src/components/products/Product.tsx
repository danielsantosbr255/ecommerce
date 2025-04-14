import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import CurrencyUtil from "@/utils/currency.util";

type ProductProps = {
  product: ProductType;
  className?: string; // <- permite passar estilos externos
  description?: boolean;
  addToCart?: () => void;
};

export const formatCurrency = (value: number, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

export default function Product({ product, className, description = true, addToCart }: ProductProps) {
  return (
    <div
      className={clsx(
        "flex flex-col text-black gap-1 p-2 rounded-xl cursor-pointer scale-95 hover:scale-98 hover:bg-gray-100 hover:shadow transition-all",
        "w-full h-full", // adaptável
        className
      )}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-square bg-gray-50 rounded-xl hover:border border-amber-500 shadow-md transition-all">
          <ProductImage product={product} fill={true} className="w-full h-auto object-contain rounded-xl" />
        </div>

        <div className="flex justify-between items-center font-semibold mt-2">
          <p className="text-md text-neutral-700 truncate">{product.title}</p>
        </div>
        {description && <p className="text-sm text-neutral-600 truncate">{product.description}</p>}

        <div className="flex flex-col font-bold my-1">
          <p className="text-lg text-amber-500">{CurrencyUtil.formatCurrency(product.price)}</p>
        </div>
      </Link>
      <button
        onClick={addToCart}
        className="bg-white hover:bg-amber-500 flex justify-center items-center py-2 px-3 rounded-md text-amber-500 hover:text-white border border-amber-500 font-bold text-center cursor-pointer transition-all gap-2 max-w-full"
      >
        <ShoppingCart size={20} className="shrink-0" />
        <p className="truncate text-[clamp(0.75rem,2vw,1rem)] whitespace-nowrap">Adicionar ao Carrinho</p>
      </button>
    </div>
  );
}
