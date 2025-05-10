import { Suspense } from "react";
import { productService } from "@/services/products";
import LoadingState from "@/components/LoadingState";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviews from "@/components/products/ProductReviews";
import ProductReviewsForm from "@/components/products/ProductReviewsForm";
import RelatedProducts from "@/components/products/RelatedProducts";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productService.getProduct(slug);

  if (!product) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <h1>Produto nao encontrado</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col py-10 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6">
      <ProductDetail product={product} />

      <Suspense fallback={<LoadingState />}>
        <ProductReviews productSlug={product.slug} />
      </Suspense>

      <ProductReviewsForm productSlug={product.slug} />

      <Suspense fallback={<LoadingState />}>
        <RelatedProducts product={product} />
      </Suspense>
    </main>
  );
}
