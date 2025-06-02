"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { Product } from "@/types";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import { cartService } from "@/services/carts";
import CurrencyUtil from "@/utils/currency.util";
import { useAuth } from "@/contexts/AuthContext";
import { Settings2, ShoppingCart } from "lucide-react";

export const revalidate = 60;

export default function ProductDetail({ product }: { product: Product }) {
  const { loadCart } = useAuth();

  const onAddToCart = async () => {
    const newCartItem = await cartService.create(product.id, 1);

    if (newCartItem) {
      toast.success("Produto adicionado ao carrinho");
      await loadCart();
      return newCartItem;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white border-lines relative aspect-video rounded-xl shadow-xs p-4">
          <ProductImage product={product} />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-primary font-semibold">{CurrencyUtil.formatCurrency(product.price)}</p>

          <p className="text-tx-secondary">
            <span className="font-bold">Estoque: </span> {product.stock}
          </p>

          <p className="text-tx-secondary">
            <span className="font-bold">Categoria: </span>
            {product.category?.name}
          </p>

          <p className="text-tx-secondary">{product.description}</p>

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
            <p className="text-tx-secondary font-bold">{product.brand?.name}</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={onAddToCart} className="!py-3 gap-2">
              <ShoppingCart size={20} className="shrink-0" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>

      {/* Especificações técnicas */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b border-lines py-2 flex items-center gap-2">
          <Settings2 /> Especificações
        </h2>
        <div className="bg-white rounded-xl shadow-xs p-4">
          <table className="w-full">
            <tbody>
              {product.specifications?.length ? (
                product.specifications.map((spec, i) => (
                  <tr key={i} className="border-b border-lines last:border-none">
                    <td className="py-2 font-medium">{spec.name}</td>
                    <td className="py-2 text-tx-secondary">{spec.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-tx-secondary text-center py-4">
                    Nenhuma especificação informada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
