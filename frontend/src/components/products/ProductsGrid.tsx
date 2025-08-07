import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/products/ProdutctCard";
import { ProductResponse } from "@/services/products";

interface ProductsGridProps {
  path: string;
  children?: React.ReactNode;
  callback: () => Promise<ProductResponse | null>;
}

export default async function ProductsGrid({ path, children, callback }: ProductsGridProps) {
  const result = await callback();

  if (!result || result.products.length === 0) {
    return (
      <main className="flex flex-col w-full h-full gap-4 max-w-10/12 mx-auto items-center justify-center">
        <h1 className="text-2xl text-tx-primary font-medium my-2 py-2 text-center">Nenhum produto encontrado</h1>
      </main>
    );
  }

  const { products, pagination } = result;
  const { totalItems, currentPage, pageSize, totalPages } = pagination;

  return (
    <main className="lg:max-w-10/12 mx-auto px-4 py-10 space-y-16">
      <section>
        <div className="flex border-b border-lines text-2xl text-tx-primary my-2 py-2 w-full justify-between items-center">
          {children}
          <span className="text-sm font-semibold">({totalItems} produtos)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages} path={path} pageSize={pageSize} />
    </main>
  );
}
