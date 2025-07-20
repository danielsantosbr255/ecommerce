import { Suspense } from "react";
import { SearchPageProps } from "@/types";
import { categoryService } from "@/services/categories";
import LoadingState from "@/components/ui/LoadingState";
import ProductsGrid from "@/components/products/ProductsGrid";
import { productService } from "@/services/products";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchPageProps>;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default async function page({ searchParams, params }: Props) {
  const rawParams = await params;
  const rawSearch = await searchParams;

  const slug = rawParams.slug;
  const page = Number(rawSearch.page) || DEFAULT_PAGE;
  const pageSize = Number(rawSearch.pageSize) || DEFAULT_PAGE_SIZE;

  const category = await categoryService.getOne(slug);

  if (!category) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-2xl text-tx-primary font-semibold my-2 py-2">
          Categoria <span className="font-bold underline text-primary">{slug}</span> não encontrada.
        </h1>
      </div>
    );
  }

  const seachQuery = () => productService.getAll({ categoryId: category.id, page, pageSize });

  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsGrid callback={seachQuery} path={`/categories/${category.slug}?`}>
        <h1 className="text-2xl font-medium text-center">
          Categoria: <strong className="text-primary underline">{category.name}</strong>
        </h1>
      </ProductsGrid>
    </Suspense>
  );
}
