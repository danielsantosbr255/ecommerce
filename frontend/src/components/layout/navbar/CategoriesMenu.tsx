"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { Suspense, useState } from "react";
import { categoryService } from "@/services/categories";
import { FaChevronDown, FaTags, FaThList } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const CategoryItems = ({ isCategOpen }: { isCategOpen: boolean }) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

  if (!categories || isLoading) return null;

  return (
    <div
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
            className="bg-bg-secondary flex gap-2 rounded-lg shadow-xs text-sm cursor-pointer transition hover:bg-primary/10"
          >
            <Link
              href={`/categories/${category.slug}`}
              className="flex items-center gap-2 py-4 px-4 w-full"
            >
              <FaTags size={20} className="text-primary shrink-0" />
              <span className="truncate">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CategoriesMenu() {
  const [isCategOpen, setIsCategOpen] = useState(false);

  const handleMouseEnter = () => setIsCategOpen(true);
  const handleMouseLeave = () => setIsCategOpen(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative z-20 flex items-center border border-b-none font-medium justify-between px-5 py-3 gap-2 bg-bg-primary text-tx-primary cursor-pointer rounded-lg transition duration-300",
          isCategOpen
            ? "border-lines/50 border-b-transparent rounded-b-none text-primary"
            : "border-transparent"
        )}
      >
        <div className="flex items-center gap-4 truncate">
          <FaThList />
          <span className="hidden md:inline">Nossos departamentos</span>
        </div>
        <FaChevronDown size={12} />
      </div>

      <Suspense fallback={null}>
        <CategoryItems isCategOpen={isCategOpen} />
      </Suspense>
    </div>
  );
}
