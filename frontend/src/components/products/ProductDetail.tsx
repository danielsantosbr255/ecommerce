import React from "react";
import ProductImage from "./ProductImage";
import CurrencyUtil from "@/utils/currency.util";
import { ProductType } from "@/types/ProductType";

export default function ProductDetail({ product }: { product: ProductType }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white relative aspect-video rounded-lg shadow p-4">
          <ProductImage product={product} className="w-full h-auto object-contain rounded" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-highlight-n font-semibold">
            {CurrencyUtil.formatCurrency(product.price)}
          </p>
          <p className="text-gray-600">Estoque: {product.stock}</p>
          <p className="text-gray-700">{product.description || "Sem descrição."}</p>

          <div className="flex gap-4 pt-4">
            <button className="bg-highlight-n text-white px-6 py-2 rounded-lg hover:bg-highlight-n">
              Adicionar ao Carrinho
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Especificações técnicas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Especificações</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full">
            <tbody>
              {product.specifications?.length ? (
                product.specifications.map((spec, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-2 font-medium">{spec.name}</td>
                    <td className="py-2 text-gray-600">{spec.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-secondary text-center py-4">
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
