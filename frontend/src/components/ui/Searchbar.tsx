"use client";

import { useState, ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  className?: string;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
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
      router.push(`/search?q=${query}&page=1&pageSize=20`);
    }
  };

  return (
    <section className="bg-bg-secondary border border-dashed shadow-xs border-lines flex flex-1 w-full items-center px-3 gap-1 text-md text-tx-secondary rounded-xl">
      <Search className="shrink-0" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Pesquisar..."
        className="border-none outline-none py-2.5 w-full"
      />

      {query && (
        <button onClick={clearSearch}>
          <X className="cursor-pointer hover:text-primary" />
        </button>
      )}
    </section>
  );
}
