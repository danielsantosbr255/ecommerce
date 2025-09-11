import NotFoundTitle from "@/components/common/NotFoundTitle";
import ProductCard from "@/components/products/ProdutctCard";
import { promotionService } from "@/services/promotions";

const PromotionsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const promotion = await promotionService.getOne(slug);

  if (!promotion) {
    return (
      <NotFoundTitle>
        Promocão <span className="font-bold underline text-primary">{slug}</span> não encontrada.
      </NotFoundTitle>
    );
  }

  const products = promotion.products;

  if (!products.length) {
    return (
      <NotFoundTitle>
        Nenhum produto encontrado para: <span className="font-bold underline text-primary">{slug}</span>
      </NotFoundTitle>
    );
  }

  return (
    <main className="lg:max-w-10/12 mx-auto px-4 py-10 space-y-16">
      <section>
        <h2 className="border-b border-lines text-2xl font-semibold my-2 py-2">
          Você está em: <span className="font-bold underline text-primary">{slug}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((promotionProduct) => (
            <ProductCard key={promotionProduct.product.id} product={promotionProduct.product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PromotionsPage;

export const generateStaticParams = async () => {
  const promotions = await promotionService.getAll();
  if (!promotions) return [];

  return promotions.map((promotion) => ({ slug: promotion.slug }));
};
