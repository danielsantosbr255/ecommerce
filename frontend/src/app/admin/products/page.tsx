import React, { Suspense } from "react";
import LoadingState from "@/components/ui/LoadingState";
import AdminProductList from "../components/AdminProductList";
import AdminProductForm from "../components/AdminProductForm";
import AdminProductFilters from "../components/AdminProductFilters";

const AdminProductsPage: React.FC = () => {
  return (
    <main className="w-full">
      <section className="bg-white shadow-xs rounded-2xl p-2 lg:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <AdminProductFilters />
        </div>

        <Suspense fallback={<LoadingState />}>
          <AdminProductList />
        </Suspense>
      </section>

      <AdminProductForm />
    </main>
  );
};

export default AdminProductsPage;
