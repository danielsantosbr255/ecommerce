"use client";

import React, { useEffect } from "react";
import AdminProductCard from "./AdminProductCard";
import { useProducts } from "@/hooks/useProducts";
import LoadingState from "../LoadingState";

const AdminProductList = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <div>Erro: {error}</div>;

  if (!products.length) {
    return <p className="text-tx-secondary col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {products.map((product) => (
        <AdminProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProductList;
