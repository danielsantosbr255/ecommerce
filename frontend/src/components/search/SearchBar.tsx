import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch }: any) {
    const [query, setQuery] = useState("");

    const handleChange = (e: any) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    const clearSearch = () => {
        setQuery("");
        if (onSearch) onSearch("");
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Pesquisar..."
                className="w-full p-2 pl-10 pr-30 text-gray-900 bg-white border border-gray-300 rounded-sm focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            {query && (
                <button onClick={clearSearch} className="absolute right-3 top-2.5">
                    <X className="h-5 w-5 text-gray-500" />
                </button>
            )}
        </div>
    );
}
