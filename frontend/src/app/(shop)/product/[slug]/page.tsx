import { Suspense } from "react";
import { Grid2X2Check } from "lucide-react";
import { productService } from "@/services/products";
import LoadingState from "@/components/LoadingState";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviews from "@/components/products/ProductReviews";
import ProductCarousel from "@/components/products/ProductCarousel";
import ProductReviewsForm from "@/components/products/ProductReviewsForm";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productResponse = await productService.getProduct(slug);

  if (!productResponse) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <h1>Produto nao encontrado</h1>
      </div>
    );
  }

  const { product, relatedProducts } = productResponse;

  return (
    <main className="flex flex-1 flex-col py-10 mx-auto w-full px-2 lg:px-4 lg:max-w-10/12 h-full gap-6">
      <ProductDetail product={product} />

      <Suspense fallback={<LoadingState />}>
        <ProductReviews productSlug={product.slug} />
      </Suspense>

      <ProductReviewsForm productSlug={product.slug} />

      <div className="flex flex-col w-full">
        <h2 className="flex items-center gap-2 border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
          <Grid2X2Check /> Produtos Relacionados
        </h2>
        {relatedProducts.length > 0 && <ProductCarousel key={product.id} products={relatedProducts} />}
      </div>
    </main>
  );
}
