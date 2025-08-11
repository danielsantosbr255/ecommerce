"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import { FaCartPlus } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { cartService } from "@/services/carts";
import CurrencyUtil from "@/utils/currency.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetail({ product }: { product: Product }) {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: async (data: { id: string; quantity: number }) => {
      return await cartService.create(data.id, data.quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item adicionado ao carrinho");
    },
    onError: () => {
      toast.error("Não foi possível adicionar o item ao carrinho");
    },
  });

  const onAddToCart = () => addToCart.mutate({ id: product.id, quantity: 1 });
  const { isPending } = addToCart;

  const productDiscount = product.price - (product.price * product.discount!) / 100;
  const productPrice = product.discount > 0 ? CurrencyUtil.formatCurrency(product.price) : " ";
  const productDiscountPrice = CurrencyUtil.formatCurrency(productDiscount);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white border-lines relative aspect-video rounded-xl shadow-xs p-1">
          <ProductImage product={product} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className={`text-sm truncate line-through ${product.discount === 0 && "hidden"}`}>{productPrice}</p>
          <p className="text-xl text-primary font-semibold">{productDiscountPrice}</p>

          <p className="text-tx-primary">
            <span className="font-bold">Estoque: </span> {product.stock}
          </p>

          <p className="text-tx-primary">
            <span className="font-bold">Categoria: </span>
            {product.category?.name}
          </p>

          <p className="text-tx-primary">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="bg-white rounded-full aspect-square w-10 shadow-sm border-lines p-1 flex items-center justify-center">
              <Image
                src={product.brand?.image || ""}
                alt={product.brand?.name || ""}
                width={40}
                height={40}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-contain rounded"
              />
            </span>
            <p className="font-bold">{product.brand?.name}</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={onAddToCart} className="!py-3 gap-2" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : <FaCartPlus />} {"Adicionar ao carrinho"}
            </Button>
          </div>
        </div>
      </section>

      {/* Especificações técnicas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-lines py-2 flex items-center gap-2">
          <IoMdOptions className="text-primary" /> Especificações
        </h2>
        <div className="bg-white rounded-xl shadow-xs p-4">
          <table className="w-full">
            <tbody>
              {product.specifications?.length ? (
                product.specifications.map((spec, i) => (
                  <tr key={i} className="border-b border-lines last:border-none">
                    <td className="py-2 font-medium">{spec.name}</td>
                    <td className="py-2 text-tx-primary">{spec.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-tx-primary text-center font-semibold">
                    Nenhuma especificação informada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
