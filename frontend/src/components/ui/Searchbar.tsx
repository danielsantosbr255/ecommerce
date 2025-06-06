"use client";

import { useState, ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Input from "./Input";

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
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="bg-emerald-2500 p-1 flex flex-1 w-full h-full items-center justify-between relative text-tx-secondary">
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Pesquisar..."
        className="bg-white flex flex-1 !py-1 !pl-3 !text-lg !rounded-lg"
      />

      {query ? (
        <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 scale-90">
          <X className="" />
        </button>
      ) : (
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 scale-90" />
      )}
    </div>
  );
}
