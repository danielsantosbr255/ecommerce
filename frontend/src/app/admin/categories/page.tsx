import React from "react";
import CategoryTable from "./CategoryTable";
import { categoryService } from "@/services/categories";

export default async function page() {
  const categories = await categoryService.getAll();

  if (!categories) return null;

  return (
    <main className="flex flex-col w-full gap-4">
      <CategoryTable categories={categories} totalItems={categories.length} />
    </main>
  );
}
