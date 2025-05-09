import { Product } from "@/types";
import ProductCard from "@/components/products/ProdutctCard";
import { promotionService } from "@/services/promotions";

interface PromotionsResponse {
  id: number;
  title: string;
  description: string;
  discount: number;
  products: PromotionProductProps[];
}

interface PromotionProductProps {
  id: number;
  productId: number;
  product: Product;
}

const PromotionsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const promotion: PromotionsResponse = await promotionService.getPromotion(slug);
  const products = promotion.products;

  if (!products.length) {
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl text-tx-primary font-medium my-2 py-2">
          Nenhum produto encontrado para: <span className="font-bold underline text-warning">{slug}</span>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-2 lg:px-0 mb-10">
        <h2 className="border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
          Você está em: <span className="font-bold underline text-warning">{slug}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((promotionProduct: PromotionProductProps) => (
            <ProductCard key={promotionProduct.product.id} product={promotionProduct.product} />
          ))}
        </div>
      </section>
      )
    </div>
  );
};

export default PromotionsPage;
