"use client";

import Link from "next/link";
import { JSX, ReactNode } from "react";
import { ArrowLeftFromLine, Bell, Home, Info, Phone, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

const NavItem = ({ href, label, icon, onClick }: NavItemProps): JSX.Element => (
  <Link
    href={href}
    onClick={onClick}
    className="bg-bg-secondary flex items-center gap-2 py-2 px-10 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
  >
    {icon} {label}
  </Link>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <nav
      className={cn(
        "bg-navbar backdrop-blur-lg fixed h-dvh -top-2 -left-2 p-2 shadow overflow-hidden z-50 transition-all duration-300 flex flex-col space-y-3",
        // "fixed top-0 right-0 w-full h-full bg-bg-primary border border-lines/50 transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <Button>
        <ArrowLeftFromLine size={20} onClick={onClose} />
      </Button>

      <NavItem href="/" label="Home" icon={<Home size={20} />} onClick={onClose} />
      <NavItem href="/about" label="Sobre" icon={<Info size={20} />} onClick={onClose} />
      <NavItem href="/" label="Contato" icon={<Phone size={20} />} onClick={onClose} />
      <NavItem href="/cart" label="Carrinho" icon={<ShoppingCart size={20} />} onClick={onClose} />
      <NavItem href="#" label="Notificações" icon={<Bell size={20} />} onClick={onClose} />
    </nav>
  );
};

export default MobileMenu;
