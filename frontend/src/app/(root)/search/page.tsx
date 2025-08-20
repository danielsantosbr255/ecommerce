import { Suspense } from "react";
import { productService } from "@/services/products";
import LoadingState from "@/components/ui/LoadingState";
import ProductsGrid from "@/components/products/ProductsGrid";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

interface SearchParams {
  q: string;
  page?: string;
  limit?: string;
}

const SearchResultsPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const queryParams = await searchParams;
  const search = (queryParams.q as string) || "";
  const page = Number(queryParams.page) || DEFAULT_PAGE;
  const limit = Number(queryParams.limit) || DEFAULT_PAGE_SIZE;

  const seachQuery = () => productService.getMany({ search, page, limit });

  return (
    <Suspense fallback={<LoadingState label="Carregando resultados" />}>
      <ProductsGrid callback={seachQuery} path={`/search?q=${search}`}>
        <h1 className="text-2xl font-medium text-center">
          Resultados para: <strong className="text-primary underline">&quot;{search}&quot;</strong>
        </h1>
      </ProductsGrid>
    </Suspense>
  );
};

export default SearchResultsPage;
