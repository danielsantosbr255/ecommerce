"use client";

import Link from "next/link";
import { Product } from "@/types";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import { cartService } from "@/services/carts";
import CurrencyUtil from "@/utils/currency.util";
import { useAuth } from "@/contexts/AuthContext";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type ProductProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductProps) {
  const { loadCart } = useAuth();
  const [loading, setLoading] = useState(false);

  const productDiscount = product.price - (product.price * product.discount!) / 100;
  const productPrice = product.discount! > 0 ? CurrencyUtil.formatCurrency(product.price) : " ";
  const productDiscountPrice = CurrencyUtil.formatCurrency(productDiscount);

  const onAddToCart = async () => {
    setLoading(true);
    const newCartItem = await cartService.create(product.id, 1);

    if (newCartItem) {
      toast.success("Produto adicionado ao carrinho");
      await loadCart();
      setLoading(false);
      return newCartItem;
    }
  };

  return (
    <article className="bg-bg-secondary flex flex-col text-tx-primary w-full h-auto shrink-0 gap-2 p-2 rounded-lg border border-lines cursor-pointer scale-97 hover:scale-98 hover:border-primary/50 hover:shadow-sm hover:shadow-primary/50 transition-all">
      <main className="flex flex-col justify-between h-full">
        <div className="flex gap-2 items-center pb-2">
          <span className="bg-green-500 text-tx-on-primary text-xs px-2 py-1 rounded-md truncate">Novo</span>
        </div>

        <Link href={`/product/${product.slug}`} className="flex-1">
          <div className="relative flex aspect-[4/3] items-center rounded-lg transition-all">
            <ProductImage product={product} className="rounded-lg" />
          </div>

          <div className="flex justify-between items-center font-bold mt-2">
            <p className="text-xl text-tx-primary truncate">{product.title}</p>
          </div>

          <div>
            <p className="text-sm text-tx-primary truncate line-through">{productPrice}</p>
            <p className="text-2xl text-primary font-bold">{productDiscountPrice}</p>
            <p className="text-sm text-tx-primary truncate">
              À vista <br /> ou até 10x de {CurrencyUtil.formatCurrency(productDiscount / 10)}
            </p>
          </div>
        </Link>

        <Button onClick={onAddToCart} className="mt-10 !py-3 gap-2" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <FaCartPlus />} {"Adicionar ao carrinho"}
        </Button>
      </main>
    </article>
  );
}
