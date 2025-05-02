// src/hooks/api/useBrands.ts
"use client"
import { useState } from "react";
import { Brand } from "@/types";
import { brandService } from "@/services/brands";

export const useBrands = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    setLoading(true);

    const data = await brandService.getAll();
    if (data) {
      setError(null);
      setBrands(data);
    } else {
      setError("Falha ao carregar marcas");
    }
    setLoading(false);
  };

  const fetchBrand = async (slug: string) => {
    setLoading(true);
    const data = await brandService.getOne(slug);
    if (data) {
      setError(null);
      setBrand(data);
    } else {
      setError("Falha ao carregar marca");
    }
    setLoading(false);
  };

  const createBrand = async (brandData: Brand) => {
    setLoading(true);

    const newBrand = await brandService.create(brandData);
    if (newBrand) {
      setBrands((prev) => [...prev, newBrand]);
      setError(null);
      return newBrand;
    } else {
      setError("Falha ao criar marca");
    }
    setLoading(false);
  };

  const updateBrand = async (slug: string, brandData: Partial<Brand>) => {
    setLoading(true);

    const updatedBrand = await brandService.update(slug, brandData);
    if (updatedBrand) {
      setBrands((prev) => prev.map((brand) => (brand.slug === slug ? updatedBrand : brand)));
      setError(null);
    } else {
      setError("Falha ao atualizar marca");
    }
    setLoading(false);
  };

  const deleteBrand = async (slug: string) => {
    setLoading(true);
    const deletedBrand = await brandService.delete(slug);

    if (deletedBrand) {
      setBrands((prev) => prev.filter((brand) => brand.slug !== slug));
      setError(null);
    } else {
      setError("Falha ao deletar marca");
    }
    setLoading(false);
  };

  return {
    brand,
    brands,
    loading,
    error,
    fetchBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};
