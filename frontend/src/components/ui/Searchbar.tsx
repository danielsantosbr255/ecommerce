"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  onSearch: (query?: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // const handleSearch = () => {
  //   if (query.trim()) {
  //     router.push(`/search?q=${query}`);
  //   }
  // };

  return (
    <section className="bg-bg-secondary border border-dashed shadow-xs border-lines flex flex-1 w-full items-center px-3 gap-1 text-md text-tx-secondary rounded-xl">
      <Search className="shrink-0" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
        }}
        placeholder={placeholder || "Pesquisar produtos..."}
        className="border-none outline-none py-2.5 pl-1 w-full"
      />

      {query && (
        <button onClick={() => setQuery("")}>
          <X className="cursor-pointer hover:text-primary" />
        </button>
      )}
    </section>
  );
}
