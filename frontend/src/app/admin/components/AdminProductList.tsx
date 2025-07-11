"use client";

import { useProducts } from "@/hooks/useProduct";
import AdminProductCard from "./AdminProductCard";
// import { productService } from "@/services/products";

const AdminProductList = () => {
  const productsHook = useProducts();
  const { data, isLoading, isError } = productsHook.useGetAll();

  const products = data?.products;

  // const result = productService.getAll();
  // if (!result) return null;

  // const { products } = result;

  if (isError) {
    return <p className="text-tx-primary col-span-full">Erro ao carregar produtos.</p>;
  }

  if (isLoading) {
    return <p className="text-tx-primary col-span-full">Carregando...</p>;
  }

  if (!products || !products.length) {
    return <p className="text-tx-primary col-span-full">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {products.map((product) => (
        <AdminProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProductList;
