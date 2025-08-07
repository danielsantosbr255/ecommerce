import React from "react";
import { productService } from "@/services/products";
import ProductForm from "../../_components/ProductForm";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) return <div>Produto não encontrado</div>;

  return (
    <main className="flex flex-col w-full gap-4">
      <ProductForm initialData={product} />
    </main>
  );
}
