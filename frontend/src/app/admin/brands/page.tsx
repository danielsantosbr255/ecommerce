import React from "react";
import { brandService } from "@/services/brands";
import BrandTable from "../_components/BrandsTable";
import Pagination from "@/components/ui/Pagination";

export default async function page({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 12;

  const result = await brandService.getMany({ page, limit });
  if (!result) return null;

  const { data: brands, meta } = result;
  const { totalPages, total } = meta;

  return (
    <main className="flex flex-col w-full gap-4">
      <BrandTable brands={brands} totalItems={total} />
      <Pagination page={page} limit={limit} totalPages={totalPages} path="/admin/brands?" />
    </main>
  );
}
