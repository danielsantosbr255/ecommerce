import { Suspense } from "react";
import { FaLink } from "react-icons/fa";
import { productService } from "@/services/products";
import LoadingState from "@/components/ui/LoadingState";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviews from "@/components/products/ProductReviews";
import ProductSession from "@/components/products/ProductSession";
import ProductReviewsForm from "@/components/products/ProductReviewsForm";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) {
    return (
      <main className="flex flex-col w-full h-full mx-auto items-center justify-center">
        <h1 className="text-2xl text-tx-primary font-medium my-2 py-2 text-center">Produto não encontrado</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col py-10 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6 text-tx-primary">
      <ProductDetail product={product} />

      <Suspense fallback={<LoadingState label="Carregando avaliações" />}>
        <ProductReviews product={product} />
      </Suspense>

      <ProductReviewsForm productId={product.id} />

      <ProductSession
        callback={() => productService.getRelated(product.id)}
        label="Produtos Relacionados"
        icon={<FaLink size={25} />}
      />
    </main>
  );
}
