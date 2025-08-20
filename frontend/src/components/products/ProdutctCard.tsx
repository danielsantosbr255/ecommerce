"use client";

import Link from "next/link";
import { Product } from "@/types";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import ProductImage from "./ProductImage";
import { FaCartPlus } from "react-icons/fa";
import { cartService } from "@/services/carts";
import CurrencyUtil from "@/lib/utils/currency.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductCard({ product }: { product: Product | null }) {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: async (data: { id: string; quantity: number }) => {
      return await cartService.create(data.id, data.quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item adicionado ao carrinho");
    },
    onError: () => {
      toast.error("Não foi possível adicionar o item ao carrinho");
    },
  });

  const skeleton = "animate-pulse w-fit !bg-gray-200 !text-transparent rounded-md transition-all";
  const isLoading = !product;

  if (!product) {
    product = { title: "Titulo", price: 0, discount: 0, stock: 0 } as Product;
  }

  const title = product.title;
  const slug = product.slug || null;
  const productDiscount = product.price - (product.price * product.discount!) / 100;
  const productPrice = product.discount > 0 ? CurrencyUtil.formatCurrency(product.price) : " ";
  const productDiscountPrice = CurrencyUtil.formatCurrency(productDiscount);

  const onAddToCart = () => addToCart.mutate({ id: product.id, quantity: 1 });
  const { isPending } = addToCart;

  return (
    <article className="bg-bg-secondary flex flex-col w-full h-full shrink-0 p-2 rounded-lg border border-lines cursor-pointer scale-97 hover:scale-98 hover:border-primary/50 hover:shadow-sm hover:shadow-primary/50 transition-all">
      <div className="flex flex-col h-full justify-between">
        {/* Promoção */}
        <div className="flex gap-2 items-center mb-2 h-6">
          {product.discount > 0 && <span className="bg-green-500 text-tx-on-primary text-xs px-2 py-1 rounded-md">Promoção</span>}
        </div>

        {/* Conteúdo principal */}
        <Link href={slug ? `/products/${slug}` : "#"} className="flex flex-row md:flex-col gap-3 flex-1">
          {/* Imagem */}
          <div className="relative flex-shrink-0 w-32 md:w-full md:aspect-[4/3] rounded-lg overflow-hidden">
            {isLoading ? <span className={`w-full h-full ${skeleton}`} /> : <ProductImage product={product} />}
          </div>

          {/* Infos */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <p className={`text-base md:text-lg font-semibold line-clamp-2 ${isLoading && skeleton}`}>{title}</p>

              <div className="flex flex-col gap-1 mt-1">
                <p className={`text-sm text-gray-500 ${!isLoading && product.discount > 0 && "line-through"}`}>{productPrice}</p>
                <p className={`text-lg md:text-xl text-primary font-bold ${isLoading && skeleton}`}>{productDiscountPrice}</p>
                <p className={`text-xs text-gray-600 ${isLoading && skeleton}`}>
                  À vista <br /> ou até 10x de {CurrencyUtil.formatCurrency(productDiscount / 10)}
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Botão */}
        <Button
          onClick={onAddToCart}
          className={`mt-3 md:mt-5 !py-3 gap-2 !w-full ${isLoading && skeleton}`}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <FaCartPlus />} Adicionar ao carrinho
        </Button>
      </div>
    </article>
  );
}
