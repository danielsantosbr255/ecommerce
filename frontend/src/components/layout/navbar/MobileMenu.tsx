"use client";

import Link from "next/link";
import Button from "../../ui/Button";
import { cn } from "@/lib/utils/utils";
import { JSX, ReactNode } from "react";
import { ArrowLeftFromLine, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import { FaBell, FaCartArrowDown, FaHome, FaInfoCircle, FaPhone, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa";

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
  const { user, userLoading, signOut } = useAuth();

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

      {userLoading ? (
        <div className="flex items-center justify-center gap-2 p-4 pr-8 hover:bg-primary/5 hover:text-primary transition duration-300">
          <Loader2 size={20} className="animate-spin" />
          <span>Carregando...</span>
        </div>
      ) : user ? (
        <div className="flex flex-col gap-2 items-center p-4 pr-8 hover:bg-primary/5 hover:text-primary transition duration-300">
          <Link href="/account" className="text-primary" onClick={onClose}>
            <div className="flex items-center gap-4">
              <FaUserAstronaut size={20} />

              <p className="flex flex-col">
                <span>Olá, {user.name.split(" ")[0]}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <Link href="/sign-in" className="p-4 pr-8 hover:bg-primary/5 hover:text-primary transition duration-300">
          Entrar
        </Link>
      )}

      <NavItem href="/" label="Home" icon={<FaHome size={20} />} onClick={onClose} />
      <NavItem href="/about" label="Sobre" icon={<FaInfoCircle size={20} />} onClick={onClose} />
      <NavItem href="/" label="Contato" icon={<FaPhone size={20} />} onClick={onClose} />
      <NavItem href="/cart" label="Carrinho" icon={<FaCartArrowDown size={20} />} onClick={onClose} />
      <NavItem href="#" label="Notificações" icon={<FaBell size={20} />} onClick={onClose} />
      <NavItem href="#" label="Sair" icon={<FaSignOutAlt size={20} />} onClick={signOut} />
    </nav>
  );
};

export default MobileMenu;
