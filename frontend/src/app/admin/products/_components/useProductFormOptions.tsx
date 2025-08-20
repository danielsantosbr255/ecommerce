"use client";

import { useEffect, useState, useCallback } from "react";
import { categoryService } from "@/services/categories";
import { brandService } from "@/services/brands";

type SelectOption = {
  value: string;
  label: string;
};

export function useProductFormOptions() {
  const [brands, setBrands] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const fetchOptions = useCallback(async () => {
    setLoadingOptions(true);
    setOptionsError(null);
    try {
      const categoriesFromApi = await categoryService.getAll();
      if (categoriesFromApi) {
        setCategories(
          categoriesFromApi.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      }

      const brandsFromApi = await brandService.getMany();
      if (brandsFromApi) {
        setBrands(
          brandsFromApi.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))
        );
      }
    } catch (err) {
      console.error("Erro ao buscar opções:", err);
      setOptionsError("Falha ao carregar categorias e marcas.");
    } finally {
      setLoadingOptions(false);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return { categories, brands, loadingOptions, optionsError };
}
