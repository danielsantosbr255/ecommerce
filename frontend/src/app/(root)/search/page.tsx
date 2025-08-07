import { Suspense } from "react";
import { SearchPageProps } from "@/types";
import { productService } from "@/services/products";
import LoadingState from "@/components/ui/LoadingState";
import ProductsGrid from "@/components/products/ProductsGrid";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const revalidate = 60;

const SearchResultsPage = async ({ searchParams }: { searchParams: Promise<SearchPageProps> }) => {
  const params = await searchParams;
  const q = (params.q as string) || "";
  const page = Number(params.page) || DEFAULT_PAGE;
  const pageSize = Number(params.pageSize) || DEFAULT_PAGE_SIZE;

  const seachQuery = () => productService.getAll({ q, page, pageSize });

  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsGrid callback={seachQuery} path={`/search?q=${q}`}>
        <h1 className="text-2xl font-medium text-center">
          Resultados para: <strong className="text-primary">&quot;{q}&quot;</strong>
        </h1>
      </ProductsGrid>
    </Suspense>
  );
};

export default SearchResultsPage;
