"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown, Dot } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { Children, useState, useContext, useEffect, useRef, useMemo } from "react";
import { SidebarContext } from "../layout/Sidebar";

interface DropdownProps {
  text: string;
  icon: React.ReactNode;
  children: React.ReactNode; // Garante que DropdownMenu sempre espera ter filhos
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  label: string;
  href: string;
}

export function DropdownMenu({ children, icon, text }: DropdownProps) {
  const [isDroped, setIsDroped] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const { isOpen } = useContext(SidebarContext);

  const items = useMemo(() => {
    return Children.toArray(children).filter((child): child is React.ReactElement<DropdownItemProps> =>
      React.isValidElement(child)
    );
  }, [children]);

  const usePath = usePathname();
  const active = useMemo(() => items.some((item) => usePath === item.props.href), [items, usePath]);

  const toggleDropdown = () => {
    setIsDroped(!isDroped);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!active) setIsDroped(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const listStyle = cn(
    "p-2 group flex flex-col z-50 font-medium text-lg cursor-pointer",
    "transition-all duration-300 ease-in-out rounded-2xl overflow-hidden",
    isDroped ? "bg-gray-200/50 border-b border-dashed border-primary" : "bg-transparent",
    active ? "text-primary" : "hover:bg-gray-200/50"
  );

  const itemsStyle = cn(
    "flex flex-col ml-4 overflow-hidden transition-all duration-300 ease-in-out",
    isDroped ? "max-h-40" : "max-h-0",
    isOpen ? "w-52 ml-2" : "w-0"
  );

  return (
    <li>
      <main onClick={toggleDropdown} ref={dropdownRef} className={listStyle}>
        <div className="flex items-center">
          {icon}
          <span
            className={`overflow-hidden transition-all ease-in-out duration-300 ${
              isOpen ? "w-52 ml-2" : "w-0"
            }`}
          >
            {text}
          </span>
          <span className={`${isOpen ? "" : "hidden"}`}>
            <ChevronDown className={`transition-all ${isDroped ? "rotate-180" : "rotate-0"}`} />
          </span>
        </div>

        <ul className={itemsStyle}>{items}</ul>
      </main>
    </li>
  );
}

export function DropdownItem({ label, href }: DropdownItemProps) {
  const usePath = usePathname();
  const active = useMemo(() => usePath === href, [usePath, href]);

  const listStyle = cn(
    `font-medium flex items-center py-2 px-2 rounded-xl my-1`,
    active ? "text-primary" : "hover:bg-gray-200/50 text-tx-secondary"
  );

  return (
    <Link href={href} className="focus-visible:outline-none">
      <li className={listStyle}>
        <Dot className="scale-200 animate-pulse" />
        {label}
      </li>
    </Link>
  );
}
