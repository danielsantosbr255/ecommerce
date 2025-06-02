import { Product } from "@/types";
import { productService } from "@/services/products";
import ProductCard from "@/components/products/ProdutctCard";

export const revalidate = 60;

const SearchResultsPage = async ({ params }: { params: Promise<{ query: string }> }) => {
  const { query } = await params;

  const searchResults = await productService.getProductByQuery(query);

  if (!searchResults || !searchResults.length) {
    return (
      <main className="flex flex-col w-full h-full gap-4 max-w-10/12 mx-auto items-center justify-center">
        <h1 className="text-2xl text-tx-primary font-medium my-2 py-2">
          Nenhum produto encontrado para: <span className="font-bold underline text-primary">{query}</span>
        </h1>
      </main>
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-2 lg:px-0 mb-10">
        <h2 className="border-b border-lines text-2xl text-tx-primary font-bold my-2 py-2">
          Resultados da Busca por: <span className="font-bold underline text-primary">{query}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {searchResults.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      )
    </div>
  );
};

export default SearchResultsPage;
