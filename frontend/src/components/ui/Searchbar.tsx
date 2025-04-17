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
    <div className={clsx(className, "flex flex-1 relative")}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Pesquisar..."
        className="bg-white flex flex-1 border border-gray-200 shadow p-1 pl-8 lg:pl-10 lg:shadow-none lg:p-2 text-gray-900 rounded-lg focus:ring-2 focus:ring-highlight-n focus:outline-none"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 lg:h-5 lg:w-5 text-secondary" />
      {query && (
        <button onClick={clearSearch} className="absolute right-3 top-2.5">
          <X className="h-5 w-5 text-secondary" />
        </button>
      )}
    </div>
  );
}
