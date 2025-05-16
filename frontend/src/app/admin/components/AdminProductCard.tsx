"use client";

import React from "react";
import { Product } from "@/types";
import ProductImage from "@/components/products/ProductImage";
import { Pencil, Trash2 } from "lucide-react";
import CurrencyUtil from "@/utils/currency.util";

interface Props {
  product: Product;
}

const AdminProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-bg-secondary border border-lines hover:border-primary flex text-tx-primary  p-2 justify-between rounded-xl cursor-pointer transition-all">
      <section className="flex flex-1 space-x-5">
        <div className="bg-bg-secondary aspect-square">
          <ProductImage product={product} className="w-full h-auto object-contain rounded-xl" />
        </div>

        <div className="flex flex-col flex-1 truncate">
          <h3 className="text-lg font-semibold text-tx-primary ">{product.title}</h3>
          <p className="text-tx-secondary">Categoria: {product.category.name}</p>
          <p className="text-tx-secondary">Estoque: {product.stock}</p>
          <p className="text-primary font-bold">{CurrencyUtil.formatCurrency(product.price)}</p>
        </div>
      </section>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => alert(`Implementar edição do produto ${product.id}`)}
          className="text-tx-link hover:underline flex items-center"
        >
          <Pencil className="mr-1" size={16} /> Editar
        </button>
        <button className="text-red-500 hover:underline flex items-center">
          <Trash2 className="mr-1" size={16} /> Excluir
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
