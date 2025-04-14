"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ProductType } from "@/types/ProductType";
import ProductsUtil from "@/utils/products.util";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminProductFilters from "@/components/admin/AdminProductFilters";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/LoadingState";

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const filterOptions = [
    { value: "", label: "Todas as Categorias" },
    { value: "Roupas", label: "Roupas" },
    { value: "Calçados", label: "Calçados" },
    { value: "Eletrônicos", label: "Eletrônicos" },
    { value: "Livros", label: "Livros" },
    { value: "Acessórios", label: "Acessórios" },
  ];

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

  const handleAddProduct = async (productData: Omit<ProductType, "id" | "image">, imageFile: File | null) => {
    if (!accessToken) {
      toast.error("Token de acesso não disponível.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", String(productData.price));
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("stock", String(productData.stock));
      if (imageFile) formData.append("image", imageFile);

      const addedProduct = (await ProductsUtil.createProduct(accessToken, formData)) as ProductType;
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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-2 lg:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <AdminProductFilters
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            searchInputPlaceholder="Buscar produtos..."
            filterOptions={filterOptions}
          />
        </div>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <AdminProductList
            products={currentProducts}
            onDelete={handleDeleteProduct}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        )}
      </div>

      <AdminProductForm onAddProduct={handleAddProduct} />
      <ToastContainer />
    </div>
  );
};

export default AdminProductsPage;
