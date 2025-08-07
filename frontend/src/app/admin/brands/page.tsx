import React from "react";
import BrandTable from "./BrandsTable";
import { brandService } from "@/services/brands";

export default async function page() {
  const brands = await brandService.getAll();

  if (!brands) return null;

  return (
    <main className="flex flex-col w-full gap-4">
      <BrandTable brands={brands} totalItems={brands.length} />
    </main>
  );
}
