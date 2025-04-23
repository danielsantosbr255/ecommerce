import { ProductType } from "@/types/ProductType";
import ProductsUtil from "@/utils/products.util";
import ProductCard from "@/components/products/ProdutctCard";

interface PromotionsResponse {
  id: number;
  title: string;
  description: string;
  discount: number;
  products: ProductType[];
}

const PromotionsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions/${id}`);
  const promotion: PromotionsResponse = await response.json();

  if (!promotion.products.length) {
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl text-gray-800 font-bold my-2 py-2">Nenhum produto encontrado para {id}.</h1>
      </div>
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-2 lg:px-0 mb-10">
        <h2 className="border-b border-gray-200 text-2xl text-gray-800 font-bold my-2 py-2">
          Você está em: {id}
        </h2>

        <div className="grid grid-cols-2 px-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 xl:px-0">
          {promotion.products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      )
    </div>
  );
};

export default PromotionsPage;
