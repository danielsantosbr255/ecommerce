import { Product } from "@/types";
import { productService } from "@/lib/api/admin/products";
import ProductCard from "@/components/products/ProdutctCard";

const SearchResultsPage = async ({ params }: { params: Promise<{ query: string }> }) => {
  const { query } = await params;

  const searchResults = await productService.getProductByQuery(query);

  if (!searchResults) {
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl text-tx-primary font-bold my-2 py-2">
          Nenhum produto encontrado para {query}.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-4 lg:max-w-10/12 mx-auto px-2 lg:px-0 mb-10">
        <h2 className="border-b border-lines text-2xl text-tx-primary font-bold my-2 py-2">
          Resultados da Busca por: {query}
        </h2>

        <div className="grid grid-cols-2 px-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 xl:px-0">
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
