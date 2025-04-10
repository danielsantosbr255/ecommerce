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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-48">
                {product.image && (
                    <ProductImage product={product} className="w-full h-full object-cover" />
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.title}
                </h3>
                <p className="text-gray-600 mb-2">Categoria: {product.category}</p>
                <p className="text-gray-600 mb-2">Estoque: {product.stock}</p>
                <p className="text-amber-500 font-bold">
                    {CurrencyUtil.formatCurrency(product.price)}
                </p>
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
        </div>
    );
};

export default AdminProductCard;
