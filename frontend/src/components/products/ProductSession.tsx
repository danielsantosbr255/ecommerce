import { Ghost } from "lucide-react";
import React, { Suspense } from "react";
import SessionLabel from "../ui/SessionLabel";
import ProductCarousel from "./ProductCarousel";
import { ProductResponse } from "@/services/products";

interface Props {
  callback: () => Promise<ProductResponse | null>;
  label?: string;
  icon?: React.ReactNode;
}

async function ProductList({ callback }: Props) {
  const result = await callback();
  if (!result) return null;
  const { products } = result;

  if (!products || !products.length) {
    return (
      <div className="flex flex-col w-full justify-center items-center mt-10">
        <Ghost size={20} />
      </div>
    );
  }
  return <ProductCarousel products={products} />;
}

export default function ProductSession({ callback, label, icon }: Props) {
  return (
    <section className="flex flex-col w-full gap-2">
      <SessionLabel label={label} icon={icon} />

      <Suspense fallback={<ProductCarousel products={null} />}>
        <ProductList callback={callback} />
      </Suspense>
    </section>
  );
}
