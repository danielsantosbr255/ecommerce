import { useState, ChangeEvent } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
    onSearch?: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    const clearSearch = () => {
        setQuery("");
        onSearch?.("");
    };

    return (
        <div className="hidden md:flex relative w-sm">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Pesquisar..."
                className="w-full p-2 pl-10 pr-30 text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
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
