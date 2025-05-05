import { Product } from "@/types";
import { categoryService } from "@/services/categories";
import ProductCard from "@/components/products/ProdutctCard";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await categoryService.getOne(slug);
  const products = category.products;

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
      <h2 className="border-b border-lines text-2xl text-tx-primary font-bold my-2 py-2">{category.name}</h2>

      <div className="grid grid-cols-2 px-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 xl:px-0">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
