import { ProductType } from "@/types/ProductType";
import React from "react";
import ProductCarousel from "./ProductCarousel";

type ProductSessionProps = {
  products: ProductType[];
  label: string;
  icon: React.ReactNode;
};

export default function ProductSession({ products, label, icon }: ProductSessionProps) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
        {icon} {label}
      </h2>
      <ProductCarousel products={products} slidesToShow={5.1} />
    </div>
  );
}
