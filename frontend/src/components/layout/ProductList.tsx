"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Crown, Grid2x2Plus } from "lucide-react";
import ProductCarousel from "../products/ProductCarousel";
import { productService } from "@/lib/api/admin/products";
import Brands from "../common/Brands";
import Categories from "../common/Categories";

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productService.getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  if (!products)
    return (
      <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
        Nenhum produto encontrado
      </div>
    );

  return (
    <section className="w-full h-full gap-10 flex flex-col">
      <ProductCarousel products={products} label="Destaque" icon={<Crown size={20} />} />
      <Brands />
      <ProductCarousel products={products} label="Novidades" icon={<Grid2x2Plus size={20} />} />
      <Categories />
      <ProductCarousel products={products} label="Mais Vendidos" icon={<Crown size={20} />} />
    </section>
  );
}
