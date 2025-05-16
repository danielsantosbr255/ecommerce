// src/hooks/api/useProducts.ts
import { useCallback, useState } from "react";
import { Product } from "@/types";
import { productService } from "@/services/products";

export const useProducts = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const data = await productService.getAll();
    if (data) {
      setError(null);
      setProducts(data);
    } else {
      setError("Falha ao carregar produtos");
    }
    setLoading(false);
  }, []);

  const createProduct = useCallback(async (productData: Product) => {
    setLoading(true);

    const newProduct = await productService.create(productData);
    if (newProduct) {
      setProducts((prev) => [...prev, newProduct]);
      setProduct(newProduct);
      setError(null);
      return newProduct;
    } else {
      setError("Falha ao criar produto");
    }
    setLoading(false);
  }, []);

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    setLoading(true);

    const updatedProduct = await productService.update(id, productData);
    if (updatedProduct) {
      setProducts((prev) => prev.map((product) => (product.id === id ? updatedProduct : product)));
      setProduct(updatedProduct);
      setError(null);
    } else {
      setError("Falha ao atualizar produto");
    }
    setLoading(false);
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setLoading(true);
    const deletedProduct = await productService.delete(id);

    if (deletedProduct) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setError(null);
      setProduct(null);
    } else {
      setError("Falha ao deletar produto");
    }
    setLoading(false);
  }, []);

  return {
    product,
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
