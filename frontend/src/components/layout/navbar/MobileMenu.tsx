"use client";

import Link from "next/link";
import { JSX, ReactNode } from "react";
import { ArrowLeftFromLine } from "lucide-react";
import Button from "../../ui/Button";
import { cn } from "@/lib/utils/utils";
import { FaBell, FaHome, FaInfoCircle, FaPhone, FaShoppingBasket, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/providers/AuthContext";

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
    className="flex items-center gap-2 p-4 pr-8 hover:bg-primary/5 hover:text-primary transition duration-300"
  >
    {icon} {label}
  </Link>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { signOut } = useAuth();

  return (
    <nav
      className={cn(
        "bg-navbar/50 flex flex-col backdrop-blur-lg fixed h-dvh -top-0 -left-0 shadow overflow-hidden z-50 transition-all duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <Button className="self-end m-2 !p-2">
        <ArrowLeftFromLine size={20} onClick={onClose} />
      </Button>

      <NavItem href="/" label="Home" icon={<FaHome size={20} />} onClick={onClose} />
      <NavItem href="/about" label="Sobre" icon={<FaInfoCircle size={20} />} onClick={onClose} />
      <NavItem href="/" label="Contato" icon={<FaPhone size={20} />} onClick={onClose} />
      <NavItem href="/cart" label="Carrinho" icon={<FaShoppingBasket size={20} />} onClick={onClose} />
      <NavItem href="#" label="Notificações" icon={<FaBell size={20} />} onClick={onClose} />
      <NavItem href="#" label="Sair" icon={<FaSignOutAlt size={20} />} onClick={signOut} />
    </nav>
  );
};

export default MobileMenu;
