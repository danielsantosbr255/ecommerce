import ProductsUtil from "@/utils/products.util";
import { ProductType } from "@/types/ProductType";
import ProductCard from "@/components/products/ProdutctCard";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviews from "@/components/products/ProductReviews";
import ProductReviewsForm from "@/components/products/ProductReviewsForm";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { product, relatedProducts } = await ProductsUtil.fetchProduct(slug);

  if (!product) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <h1>Produto nao encontrado</h1>
      </div>
    );
  }

  return (
    <div className="max-w-10/12 mx-auto px-4 py-10 space-y-16">
      <ProductDetail product={product} />
      <ProductReviews productSlug={product.slug} />
      <ProductReviewsForm productSlug={product.slug} />

      {/* Produtos relacionados */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Produtos Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {relatedProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
