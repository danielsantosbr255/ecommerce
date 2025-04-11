"use client";
import React, { useCallback, useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  onSearchChange: (term: string) => void;
  onFilterChange: (category: string) => void;
  searchInputPlaceholder?: string;
  filterOptions?: FilterOption[];
  defaultFilterValue?: string;
  searchInputClassName?: string;
  selectClassName?: string;
  selectLabel?: string;
}

const AdminProductFilters: React.FC<Props> = ({
  onSearchChange,
  onFilterChange,
  searchInputPlaceholder = "Buscar produtos...",
  filterOptions = [
    { value: "", label: "Todas as Categorias" },
    { value: "Roupas", label: "Roupas" },
    { value: "Calçados", label: "Calçados" },
    { value: "Eletrônicos", label: "Eletrônicos" },
    { value: "Livros", label: "Livros" },
    { value: "Acessórios", label: "Acessórios" },
  ],
  defaultFilterValue = "",
  searchInputClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  selectClassName = "shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  selectLabel,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState(defaultFilterValue);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setFilterCategory(value);
      onFilterChange(value);
    },
    [onFilterChange]
  );

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder={searchInputPlaceholder}
        className={searchInputClassName}
        value={searchTerm}
        onChange={handleInputChange}
        name="searchTerm"
      />
      <div>
        {selectLabel && <label htmlFor="filterCategory">{selectLabel}</label>}
        <select
          id="filterCategory"
          className={selectClassName}
          value={filterCategory}
          onChange={handleCategoryChange}
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
