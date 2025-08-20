import { SearchPageProps } from "@/types";
import { productService } from "@/services/products";
import Pagination from "@/components/ui/Pagination";
import ProductsTable from "./_components/ProductsTable";

export default async function page({ searchParams }: { searchParams: Promise<SearchPageProps> }) {
  const rawSearch = await searchParams;

  const page = Number(rawSearch.page) || 1;
  const limit = Number(rawSearch.limit) || 12;

  const result = await productService.getMany({ page, limit });
  if (!result) return null;

  const { data: products, meta } = result;
  const { totalPages, total } = meta;

  return (
    <main className="flex flex-col w-full gap-4">
      <ProductsTable products={products} totalItems={total} />
      <Pagination page={page} limit={limit} totalPages={totalPages} path={"/admin/products?"} />
    </main>
  );
}
