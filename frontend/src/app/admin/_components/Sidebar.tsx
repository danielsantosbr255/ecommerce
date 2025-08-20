"use client";

import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils/utils";
import React, { useContext } from "react";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";
import { ChevronFirst, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
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

export const SidebarContext = React.createContext({ isOpen: true });

export function Sidebar({ children, className }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <nav className={`bg-bg-secondary flex flex-col rounded-2xl shadow-xs border border-lines/20 ${className}`}>
      <div className="flex p-2 pb-4 items-center justify-between">
        <Logo size={30} name className={cn("overflow-hidden transition-all ease-in-out duration-300", isOpen ? "w-52" : "w-0")} />

        <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 cursor-pointer">
          <ChevronFirst className={`transition-all ease-in-out duration-300 ${isOpen ? "" : "rotate-180"}`} />
        </button>
      </div>

      <SidebarContext.Provider value={{ isOpen }}>
        <ul className="flex flex-col flex-1 p-2 gap-2">{children}</ul>
      </SidebarContext.Provider>
    </nav>
  );
}

export function SidebarItem({ icon, text, href = "" }: SidebarItemProps) {
  const { isOpen } = React.useContext(SidebarContext);
  const usePath = usePathname();
  const active = usePath === href;

  const mainStyle = cn(
    "flex items-center p-2 rounded-lg",
    "font-medium text-lg cursor-pointer",
    "transition-colors group z-50",
    active ? "text-primary" : "hover:bg-gray-200"
  );

  return (
    <Link href={href}>
      <li className={mainStyle}>
        {icon}
        <span className={`overflow-hidden transition-all ease-in-out duration-300 ${isOpen ? "w-52 ml-4" : "w-0"}`}>{text}</span>
      </li>
    </Link>
  );
}

export function SidebarFooter({ user, signOut }: { user: User | null; signOut: () => void }) {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div className="flex flex-col border-t border-lines p-2">
      <div className="flex items-center">
        <Skeleton className="w-10 h-10 !rounded-lg" />

        <div
          className={`flex flex-1 justify-between overflow-hidden items-center transition-all ease-in-out duration-300 ${
            isOpen ? "ml-3" : "w-0"
          }`}
        >
          <div>
            <h1 className="font-semibold">{user?.name}</h1>
            <p className="text-sm">{user?.email}</p>
          </div>

          <Button className="!p-2" onClick={signOut}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
