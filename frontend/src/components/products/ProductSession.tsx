import React from "react";
import { Product } from "@/types";
import ProductCarousel from "./ProductCarousel";

interface Props {
  callback: () => Promise<Product[] | null>;
  label: string;
  icon: React.ReactNode;
}

export default async function ProductSession({ callback, label, icon }: Props) {
  const products = await callback();

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
        {icon} {label}
      </h2>

      <ProductCarousel products={products} />
    </div>
  );
}
