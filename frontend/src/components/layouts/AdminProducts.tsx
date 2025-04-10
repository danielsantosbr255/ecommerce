import React from "react";
import ProductImage from "../products/ProductImage";
import { Pencil, Trash2 } from "lucide-react";
import { ProductType } from "@/types/ProductType";

interface AdminProductsProps {
    currentProducts: ProductType[];
    handleDeleteProduct: (productId: string) => void;
    filteredProducts: ProductType[];
}

export default function AdminProducts({ currentProducts, handleDeleteProduct, filteredProducts }: AdminProductsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative w-full h-48">
                        {product.image && (
                            <ProductImage
                                product={product}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                            {product.title}
                        </h3>
                        <p className="text-gray-600 mb-2">Categoria: {product.category}</p>
                        <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                        <p className="text-amber-500 font-bold">R$ {product.price}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => alert(`Implementar edição do produto ${product.id}`)}
                                className="text-blue-500 hover:underline flex items-center"
                            >
                                <Pencil className="mr-1" size={16} /> Editar
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-500 hover:underline flex items-center"
                            >
                                <Trash2 className="mr-1" size={16} /> Excluir
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {filteredProducts.length === 0 && (
                <p className="text-gray-600 col-span-full">Nenhum produto encontrado.</p>
            )}
        </div>
    );
}
