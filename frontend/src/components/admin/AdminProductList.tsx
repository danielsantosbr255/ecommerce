// components/admin/AdminProductList.tsx
import React from "react";
import { ProductType } from "@/types/ProductType";
import AdminProductCard from "./AdminProductCard";

interface Props {
  products: ProductType[];
  onDelete: (id: string) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const AdminProductList: React.FC<Props> = ({ products, onDelete, totalPages, currentPage, onPageChange }) => {
  if (products.length === 0) {
    return <p className="text-gray-600 col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-0 xl:px-0">
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} onDelete={onDelete} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-highlight-n text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminProductList;
