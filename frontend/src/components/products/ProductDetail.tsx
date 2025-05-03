"use client";

import React from "react";
import ProductImage from "./ProductImage";
import CurrencyUtil from "@/utils/currency.util";
import { Product } from "@/types";
import Image from "next/image";
import { useCarts } from "@/hooks/useCarts";
import Button from "../ui/Button";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail({ product }: { product: Product }) {
  const { createCartItem } = useCarts();

  return (
    <>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white border border-lines relative aspect-video rounded-xl shadow-xs p-4">
          <ProductImage product={product} className="w-full h-auto object-contain rounded" />
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
            <Button onClick={() => createCartItem(product.id, 1)} className="!py-3 gap-2">
              <ShoppingCart size={20} className="shrink-0" />
              Adicionar ao Carrinho
            </Button>
            <button className="bg-gray-200 text-tx-primary px-6 py-2 rounded-xl hover:bg-gray-300">
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Especificações técnicas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Especificações</h2>
        <div className="bg-white rounded-xl shadow-xs p-4">
          <table className="w-full">
            <tbody>
              {product.specifications?.length ? (
                product.specifications.map((spec, i) => (
                  <tr key={i} className="border-b last:border-none">
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
