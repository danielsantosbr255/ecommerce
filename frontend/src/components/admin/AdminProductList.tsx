"use client";

import React, { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
import { useProducts } from "@/hooks/useProducts";
import LoadingState from "../LoadingState";

const AdminProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { products, loading, error, fetchProducts, deleteProduct } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <div>Erro: {error}</div>;

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || product.categoryId === filterCategory)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (!products.length) {
    return <p className="text-tx-secondary col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-primary text-tx-on-primary"
                  : "bg-bg-secondary text-tx-secondary hover:bg-gray-300"
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
