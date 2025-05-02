// src/hooks/api/useCategories.ts
"use client";
import { useState } from "react";
import { Category } from "@/types";
import { categoryService } from "@/services/categories";

export const useCategories = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);

    const data = await categoryService.getAll();
    if (data) {
      setError(null);
      setCategories(data);
    } else {
      setError("Falha ao carregar marcas");
    }
    setLoading(false);
  };

  const fetchCategory = async (slug: string) => {
    setLoading(true);
    const data = await categoryService.getOne(slug);
    if (data) {
      setError(null);
      setCategory(data);
    } else {
      setError("Falha ao carregar marca");
    }
    setLoading(false);
  };

  const createCategory = async (categoryData: Category) => {
    setLoading(true);

    const newCategory = await categoryService.create(categoryData);
    if (newCategory) {
      setCategories((prev) => [...prev, newCategory]);
      setError(null);
      return newCategory;
    } else {
      setError("Falha ao criar marca");
    }
    setLoading(false);
  };

  const updateCategory = async (slug: string, categoryData: Partial<Category>) => {
    setLoading(true);

    const updatedCategory = await categoryService.update(slug, categoryData);
    if (updatedCategory) {
      setCategories((prev) => prev.map((category) => (category.slug === slug ? updatedCategory : category)));
      setError(null);
    } else {
      setError("Falha ao atualizar marca");
    }
    setLoading(false);
  };

  const deleteCategory = async (slug: string) => {
    setLoading(true);
    const deletedCategory = await categoryService.delete(slug);

    if (deletedCategory) {
      setCategories((prev) => prev.filter((category) => category.slug !== slug));
      setError(null);
    } else {
      setError("Falha ao deletar marca");
    }
    setLoading(false);
  };

  return {
    category,
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
