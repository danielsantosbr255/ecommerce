"use client";

import { useEffect } from "react";
import { Crown, Grid2x2Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProductSession from "../products/ProductSession";

export default function ProductList() {
  const { products, fetchProducts } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full h-full gap-10 flex flex-col">
      <ProductSession products={products} label="Destaque" icon={<Crown size={20} />} />
      <ProductSession products={products} label="Novidades" icon={<Grid2x2Plus size={20} />} />
      <ProductSession products={products} label="Mais Vendidos" icon={<Crown size={20} />} />
    </section>
  );
}
