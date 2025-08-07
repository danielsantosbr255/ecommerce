import { SearchPageProps } from "@/types";
import { productService } from "@/services/products";
import Pagination from "@/components/ui/Pagination";
import ProductsTable from "./_components/ProductsTable";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

const page = async ({ searchParams }: { searchParams: Promise<SearchPageProps> }) => {
  const rawSearch = await searchParams;

  const page = Number(rawSearch.page) || DEFAULT_PAGE;
  const pageSize = Number(rawSearch.pageSize) || DEFAULT_PAGE_SIZE;

  const result = await productService.getAll({ page, pageSize });
  if (!result) return null;

  const { products, pagination } = result;
  const { totalPages, totalItems } = pagination;

  return (
    <main className="flex flex-col w-full gap-4">
      <ProductsTable products={products} totalItems={totalItems} />
      <Pagination currentPage={page} totalPages={totalPages} path={"/admin/products?"} pageSize={pageSize} />
    </main>
  );
};

export default page;
