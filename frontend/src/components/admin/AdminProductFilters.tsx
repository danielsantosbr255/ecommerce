"use client";
import React from "react";

const filterOptions = [
  { value: "", label: "Todas as Categorias" },
  { value: "Roupas", label: "Roupas" },
  { value: "Calçados", label: "Calçados" },
  { value: "Eletrônicos", label: "Eletrônicos" },
  { value: "Livros", label: "Livros" },
  { value: "Acessórios", label: "Acessórios" },
];

const searchInputPlaceholder = "Buscar produtos...";

const AdminProductFilters = () => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder={searchInputPlaceholder}
        className="shadow-xs appearance-none border rounded w-full py-2 px-3 text-tx-secondary leading-tight focus:outline-none focus:shadow-xs-outline"
        name="searchTerm"
      />
      <div>
        <select
          id="filterCategory"
          className="shadow-xs appearance-none border rounded py-2 px-3 text-tx-secondary leading-tight focus:outline-none focus:shadow-xs-outline"
          name="filterCategory"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdminProductFilters;
