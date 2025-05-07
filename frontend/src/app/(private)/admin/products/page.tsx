import "react-toastify/dist/ReactToastify.css";
import React from "react";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminProductFilters from "@/components/admin/AdminProductFilters";
import AdminProductForm from "@/components/admin/AdminProductForm";

const AdminProductsPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-xs rounded-2xl p-2 lg:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <AdminProductFilters />
        </div>
        <AdminProductList />
      </div>

      <AdminProductForm />
    </div>
  );
};

export default AdminProductsPage;
