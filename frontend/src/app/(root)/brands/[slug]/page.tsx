import { Product } from "@/types";
import { brandService } from "@/services/brands";
import ProductCard from "@/components/products/ProdutctCard";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await brandService.getOne(slug);

  if (!brand) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-2xl text-tx-primary font-semibold my-2 py-2">
          Marca <span className="font-bold underline text-primary">{slug}</span> não encontrada.
        </h1>
      </div>
    );
  }

  const products = brand.products;

  if (!products.length) {
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl text-tx-primary font-bold my-2 py-2">
          Nenhum produto encontrado para {slug}.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-10/12 mx-auto px-4 py-10 space-y-16">
      <h2 className="border-b border-lines text-2xl text-tx-primary font-semibold my-2 py-2">
        Marca: <span className="font-bold underline text-primary">{brand.name}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
