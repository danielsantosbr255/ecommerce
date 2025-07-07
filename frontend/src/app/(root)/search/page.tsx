import { Product, SearchPageProps } from "@/types";
import { productService } from "@/services/products";
import Pagination from "@/components/ui/Pagination"; // Importe o componente de Paginação
import ProductCard from "@/components/products/ProdutctCard";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

export const revalidate = 60;

const SearchResultsPage = async ({ searchParams }: { searchParams: Promise<SearchPageProps> }) => {
  const params = await searchParams;
  const query = (params.q as string) || "";
  const page = Number(params.page || DEFAULT_PAGE);
  const pageSize = Number(params.pageSize || DEFAULT_PAGE_SIZE);

  const result = await productService.getByQuery({ query, page, pageSize });

  if (!result || result.products.length === 0) {
    return (
      <main className="flex flex-col w-full h-full gap-4 max-w-10/12 mx-auto items-center justify-center">
        <h1 className="text-2xl text-tx-primary font-medium my-2 py-2 text-center">
          Nenhum produto encontrado para: <span className="font-bold underline text-primary">{query}</span>
        </h1>
      </main>
    );
  }

  const { products, pagination } = result;
  const { totalItems, currentPage, totalPages } = pagination;

  return (
    <main className="lg:max-w-10/12 mx-auto px-4 py-10 space-y-16">
      <section>
        <div className="flex border-b border-lines text-2xl text-tx-primary my-2 py-2 w-full justify-between items-center">
          <h2 className="font-bold">
            Resultados da Busca por: <span className="font-bold underline text-primary">{query}</span>
          </h2>
          <span className="text-sm font-semibold">({totalItems} produtos)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Renderiza o componente de Paginação */}
      <Pagination currentPage={currentPage} totalPages={totalPages} query={query} pageSize={pageSize} />
    </main>
  );
};

export default SearchResultsPage;
