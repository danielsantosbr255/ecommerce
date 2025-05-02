// src/app/admin/products/new/page.tsx
'use client';

import { ProductForm } from '@/components/admin/products/ProductForm';
import { useProducts } from '@/hooks/api/useProducts';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const { createProduct, loading } = useProducts();
  const router = useRouter();

  const handleSubmit = async (data: ProductCreateDto) => {
    await createProduct(data);
    router.push('/admin/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}