import React from "react";
import { Product } from "@/types";
import ProductCarousel from "./ProductCarousel";
import { Ghost } from "lucide-react";

type Pagination = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

interface Props {
  callback: () => Promise<{ products: Product[]; pagination: Pagination } | null>;
  label: string;
  icon: React.ReactNode;
}

export default async function ProductSession({ callback, label, icon }: Props) {
  const result = await callback();

  if (!result) return null;

  const { products } = result;

  if (!products || !products.length)
    return (
      <div className="flex flex-col w-full justify-center items-center mt-10">
        <h1 className="text-2xl text-tx-primary font-bold my-2 py-2">
          <span className="flex items-center gap-2">
            <Ghost size={20} />
          </span>
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <h2 className="flex gap-2 items-center border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
        <span className="flex items-center justify-center text-primary">{icon}</span> {label}
      </h2>

      <ProductCarousel products={products} />
    </div>
  );
}
