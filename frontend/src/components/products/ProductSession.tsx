import { Ghost } from "lucide-react";
import React, { Suspense } from "react";
import SessionLabel from "../ui/SessionLabel";
import ProductCarousel from "./ProductCarousel";
import { ProductResponse } from "@/services/products";

interface Props {
  callback: () => Promise<ProductResponse | null>;
  label?: string;
  icon?: React.ReactNode;
  empty?: boolean;
}

async function ProductList({ callback, label, icon, empty }: Props) {
  const result = await callback();
  if (!result) return null;
  const { data: products } = result;

  if (!products || !products.length) {
    if (empty) return null;

    return (
      <div className="flex flex-col w-full justify-center items-center mt-10">
        <Ghost size={20} />
      </div>
    );
  }

  return (
    <>
      {empty && <SessionLabel label={label} icon={icon} />}
      <ProductCarousel products={products} />
    </>
  );
}

export default function ProductSession({ callback, label, icon, empty }: Props) {
  return (
    <section className="flex flex-col w-full gap-2">
      {!empty && <SessionLabel label={label} icon={icon} />}

      <Suspense fallback={<ProductCarousel products={null} />}>
        <ProductList callback={callback} label={label} icon={icon} empty={empty} />
      </Suspense>
    </section>
  );
}
