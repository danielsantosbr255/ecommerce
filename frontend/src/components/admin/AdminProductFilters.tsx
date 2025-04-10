import React from "react";

interface Props {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filterCategory: string;
    onFilterChange: (category: string) => void;
}

const AdminProductFilters: React.FC<Props> = ({ searchTerm, onSearchChange, filterCategory, onFilterChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                placeholder="Buscar produtos..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                name="searchTerm"
            />
            <select
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={filterCategory}
                onChange={(e) => onFilterChange(e.target.value)}
                name="filterCategory"
            >
                <option value="">Todas as Categorias</option>
                <option value="Roupas">Roupas</option>
                <option value="Calçados">Calçados</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Livros">Livros</option>
                <option value="Acessórios">Acessórios</option>
            </select>
        </div>
    );
};

export default AdminProductFilters;