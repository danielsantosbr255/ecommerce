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

export default function ProductCard({ product, className, description = true, addToCart }: ProductProps) {
  const productDiscount = product.price - (product.price * product.discount) / 100;
  const productPrice = product.discount > 0 ? CurrencyUtil.formatCurrency(product.price) : " ";
  const productDiscountPrice = CurrencyUtil.formatCurrency(productDiscount);

  return (
    <article className="bg-white flex flex-col text-primary w-full h-auto shrink-0 gap-2 p-2 rounded-lg border border-gray-200 cursor-pointer scale-97 hover:scale-98 hover:bg-gray-100 hover:shadow transition-all">
      <main className="flex flex-col justify-between h-full">
        <div className="flex gap-2 items-center pb-2">
          {<span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md truncate">Novo</span>}
          {/* {<span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md truncate">Destaque</span>}
          {<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md truncate">Promoção</span>} */}
        </div>

        <Link href={`/product/${product.slug}`} className="flex-1">
          <div className="relative flex aspect-[4/3] items-center rounded-lg hover:border border-highlight-n transition-all">
            <ProductImage product={product} className="rounded-lg" />
          </div>

          <div className="flex justify-between items-center font-bold mt-2">
            <p className="text-xl text-neutral-700 truncate">{product.title}</p>
          </div>

          <div>
            <p className="text-sm text-neutral-600 truncate line-through">{productPrice}</p>
            <p className="text-2xl text-highlight-n font-bold">{productDiscountPrice}</p>
            <p className="text-sm text-neutral-600 truncate">
              À vista <br /> ou até 10x de {CurrencyUtil.formatCurrency(productDiscount / 10)}
            </p>
          </div>
        </Link>

        <button
          onClick={addToCart}
          className="bg-white truncate hover:bg-highlight-n flex flex-1 mt-10 justify-center items-center py-2 px-3 rounded-md text-highlight-n hover:text-white border border-highlight-n font-bold text-center cursor-pointer transition-all gap-2 max-w-full"
        >
          <ShoppingCart size={20} className="shrink-0" />
          Adicionar ao Carrinho
        </button>
      </main>
      {/* <div className="flex justify-between items-center mb-2">
      </div>

      <Link href={`/product/${product.id}`}>
        <div className="relative flex aspect-[4/3] bg-gray-50 items-center rounded-xl hover:border border-highlight-n transition-all">
          <ProductImage product={product} className="rounded-lg" />
        </div>

        <div className="flex justify-between items-center font-semibold mt-2">
          <p className="text-md text-neutral-700 truncate">{product.title}</p>
        </div>
        {description && <p className="text-sm text-neutral-600 truncate">{product.description}</p>}

        <div className="flex flex-col font-bold my-1">
          <p className="text-lg text-highlight-n">{CurrencyUtil.formatCurrency(product.price)}</p>
        </div>
      </Link>

      <button
        onClick={addToCart}
        className="bg-white hover:bg-highlight-n flex justify-center items-center py-2 px-3 rounded-md text-highlight-n hover:text-white border border-highlight-n font-bold text-center cursor-pointer transition-all gap-2 max-w-full"
      >
        <ShoppingCart size={20} className="shrink-0" />
        <p className="truncate text-[clamp(0.75rem,2vw,1rem)] whitespace-nowrap">Adicionar ao Carrinho</p>
      </button> */}
    </article>
  );
}
