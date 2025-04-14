import { useState, ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  className?: string;
};

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Pesquisar..."
        className={clsx(
          className,
          "bg-white border border-gray-200 w-full shadow p-2 pl-10 pr-30 text-gray-900 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
        )}
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
