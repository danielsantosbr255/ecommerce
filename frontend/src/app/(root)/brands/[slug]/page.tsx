import { Suspense } from "react";
import { SearchPageProps } from "@/types";
import { brandService } from "@/services/brands";
import { productService } from "@/services/products";
import LoadingState from "@/components/ui/LoadingState";
import ProductsGrid from "@/components/products/ProductsGrid";

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
  const limit = Number(rawSearch.limit) || DEFAULT_PAGE_SIZE;

  const brand = await brandService.getOne(slug);

  if (!brand) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-2xl font-semibold my-2 py-2">
          Marca <span className="font-bold underline text-primary">{slug}</span> não encontrada.
        </h1>
      </div>
    );
  }

  const seachQuery = () => productService.getMany({ brandId: brand.id, page, limit });

  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsGrid callback={seachQuery} path={`/brands/${brand.slug}?`}>
        <h1 className="text-2xl font-medium text-center">
          Marca: <strong className="text-primary underline">{brand.name}</strong>
        </h1>
      </ProductsGrid>
    </Suspense>
  );
}
