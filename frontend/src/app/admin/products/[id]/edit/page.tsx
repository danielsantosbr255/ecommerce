// src/app/admin/products/[id]/edit/page.tsx
"use client";

import { ProductForm } from "@/components/admin/products/ProductForm";
import { useProducts } from "@/hooks/api/useProducts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { getById, updateProduct, loading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getById(params.id);
        setProduct(data);
      } catch (error) {
        router.push("/admin/products");
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (data: ProductUpdateDto) => {
    await updateProduct(params.id, data);
    router.push("/admin/products");
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
