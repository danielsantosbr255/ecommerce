"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  props?: React.HTMLAttributes<HTMLLIElement>;
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  href?: string;
  children?: React.ReactNode;
}

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function Sidebar({ children, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-bg-primary/50 backdrop-blur-sm fixed h-full hidden md:flex flex-col ${className}`}>
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        <ul className="flex flex-col flex-1">{children}</ul>
      </SidebarContext.Provider>
    </nav>
  );
}

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

export function SidebarItem({ icon, text, href = "", ...props }: SidebarItemProps) {
  const { isOpen, setIsOpen } = useSidebar();
  const usePath = usePathname();
  const active = usePath === href;

  const mainStyle = cn(
    "flex items-center ",
    "text-tx-primary cursor-pointer",
    "transition-all group z-50",
    active ? "border-l-3 border-primary text-primary" : "hover:bg-primary/5"
  );

  const handleClick = (value: boolean) => () => setIsOpen(value);

  return (
    <li className={mainStyle} onMouseEnter={handleClick(true)} onMouseLeave={handleClick(false)} {...props}>
      <Link href={href} className="flex w-full h-full p-4">
        {icon}
        <span
          className={`flex items-center overflow-hidden transition-all ease-in-out duration-300 truncate ${
            isOpen ? "w-52 ml-4" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}
