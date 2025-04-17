import React from "react";
import { ProductType } from "@/types/ProductType";
import ProductImage from "@/components/products/ProductImage";
import { Pencil, Trash2 } from "lucide-react";
import CurrencyUtil from "@/utils/currency.util";

interface Props {
  product: ProductType;
  onDelete: (id: string) => void;
}

const AdminProductCard: React.FC<Props> = ({ product, onDelete }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 flex flex-col text-black gap-1 p-2 rounded-xl cursor-pointer scale-95 hover:scale-98 hover:shadow transition-all w-full h-full">
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl hover:border border-highlight-n shadow-md transition-all">
        <ProductImage product={product} fill={true} className="w-full h-auto object-contain rounded-xl" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
        <p className="text-gray-600 mb-2">Categoria: {product.category}</p>
        <p className="text-gray-600 mb-2">Estoque: {product.stock}</p>
        <p className="text-highlight-n font-bold">{CurrencyUtil.formatCurrency(product.price)}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => alert(`Implementar edição do produto ${product.id}`)}
            className="text-blue-500 hover:underline flex items-center"
          >
            <Pencil className="mr-1" size={16} /> Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-500 hover:underline flex items-center"
          >
            <Trash2 className="mr-1" size={16} /> Excluir
          </button>
        </div>
      </div>

      {/* <div
        className={clsx(
          "flex flex-col text-black gap-1 p-2 rounded-xl cursor-pointer scale-95 hover:scale-98 hover:bg-gray-100 hover:shadow transition-all w-full h-full"
        )}
      >
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full aspect-square bg-gray-50 rounded-xl hover:border border-highlight-n shadow-md transition-all">
            <ProductImage product={product} fill={true} className="w-full h-auto object-contain rounded-xl" />
          </div>

          <div className="flex justify-between items-center font-semibold mt-2">
            <p className="text-md text-neutral-700 truncate">{product.title}</p>
          </div>

          <div className="flex flex-col font-bold my-1">
            <p className="text-lg text-highlight-n">{CurrencyUtil.formatCurrency(product.price)}</p>
          </div>
        </Link>
      </div> */}
    </div>
  );
};

export default AdminProductCard;
