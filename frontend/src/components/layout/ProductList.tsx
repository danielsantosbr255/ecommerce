import { Crown, Grid2x2Plus } from "lucide-react";
import React from "react";
import Carousel from "../carousel/Carousel";
import ProductsUtil from "@/utils/products.util";

export default async function ProductList() {
  const products = await ProductsUtil.fetchProducts();

  return (
    <section className="w-full h-full px-4 mb-10 shrink-0 lg:max-w-10/12">
      <div>
        <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          <Crown size={20} />
          Ofertas
        </h2>
        <Carousel products={products} containerId="product-offers" />
      </div>
      <div>
        <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          <Grid2x2Plus size={20} />
          Novidades
        </h2>
        <Carousel products={products} containerId="product-news" />
      </div>
      <div>
        <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          <Grid2x2Plus size={20} />
          Mais Vendidos
        </h2>
        <Carousel products={products} containerId="product-best-sellers" />
      </div>
    </section>
  );
}
