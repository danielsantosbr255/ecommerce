import React from "react";
// import AdminProductForm from "../../components/AdminProductForm";
import CreateProductForm from "./_components/CreateProductForm";

export default function page() {
  return (
    <main className="flex flex-col w-full gap-4">
      <CreateProductForm />
    </main>
  );
}
