"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import ProductsUtil from "@/utils/products.util";
import { Product } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

interface AuthContextType {
  products: Product[];
  searchTerm: string;
  filterCategory: string;
  currentPage: number;
  itemsPerPage: number;
  handleSearchChange: (term: string) => void;
  handleFilterChange: (category: string) => void;
  handleDeleteProduct: (id: string) => Promise<void>;
  handleAddProduct: (productData: Omit<Product, "id" | "image">, imageFile: File | null) => Promise<void>;
  paginate: (pageNumber: number) => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const { accessToken } = useAuth();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const fetchedProducts = await ProductsUtil.fetchProducts();
    setProducts(fetchedProducts);
    setLoading(false);
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
    setCurrentPage(1);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!accessToken) {
      setError("Token de acesso não disponível.");
      toast.error("Token de acesso não disponível.");
      return;
    }

    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await ProductsUtil.deleteProduct(accessToken, id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
        toast.success("Produto excluído com sucesso!");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao excluir o produto.";
        toast.error(message);
        console.error("Erro ao excluir produto:", err);
      }
    }
  };

  const handleAddProduct = async (productData: Omit<Product, "id" | "image">, imageFile: File | null) => {
    if (!accessToken) {
      toast.error("Token de acesso não disponível.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", String(productData.price));
      formData.append("category", productData.categoryId);
      formData.append("description", productData.description);
      formData.append("stock", String(productData.stock));
      if (imageFile) formData.append("image", imageFile);

      const addedProduct = (await ProductsUtil.createProduct(accessToken, formData)) as Product;
      setProducts((prev) => [...prev, addedProduct]);
      toast.success("Produto adicionado com sucesso!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao adicionar o produto.";
      toast.error(message);
      console.error("Erro ao adicionar produto:", err);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AuthContext.Provider
      value={{
        products,
        searchTerm,
        filterCategory,
        currentPage,
        itemsPerPage,
        handleSearchChange,
        handleFilterChange,
        handleDeleteProduct,
        handleAddProduct,
        paginate,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useProduct() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um AuthProvider.");
  }
  return context;
}
