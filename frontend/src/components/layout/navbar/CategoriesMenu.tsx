"use client";

import { getGlobal } from "@/lib/globals";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaBoxOpen, FaChevronDown, FaList } from "react-icons/fa";

export default function CategoriesMenu() {
  const categRef = useRef<HTMLDivElement>(null);
  const [isCategOpen, setIsCategOpen] = useState(false);
  const categories = getGlobal<Category[]>("categories") || [];

  const handleMouseEnter = () => setIsCategOpen(true);
  const handleMouseLeave = () => setIsCategOpen(false);

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={cn(
          "relative z-20 flex items-center border border-b-none font-medium justify-between px-5 py-3 gap-2 bg-bg-primary text-tx-secondary cursor-pointer rounded-lg transition duration-300",
          isCategOpen ? "border-lines/50 border-b-transparent rounded-b-none text-primary" : "border-transparent"
        )}
      >
        <div className="flex items-center gap-4 truncate">
          <FaList />
          <span className="hidden md:inline">Navegar por categorias</span>
        </div>
        <FaChevronDown size={12} />
      </div>

      {/* Menu de categorias (categRef) */}
      <div
        ref={categRef}
        className={cn(
          "absolute left-0 w-90 bg-bg-primary shadow-xs rounded-b-lg rounded-r-lg border border-lines/50 z-10 transition-opacity duration-300 ease-in-out",
          "top-[calc(100%-1px)]",
          isCategOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col gap-1 p-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="bg-bg-secondary flex gap-2 rounded-lg shadow-xs text-tx-secondary py-4 px-4 text-sm cursor-pointer transition hover:bg-primary/10"
            >
              <Link href={`/categories/${category.slug}`} className="flex items-center gap-2 w-full">
                <FaBoxOpen size={20} className="text-primary shrink-0" />
                <span className="truncate">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
