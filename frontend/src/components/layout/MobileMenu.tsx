import Link from "next/link";
import { JSX, ReactNode } from "react";
import { Bell, Info, Phone, ShoppingCart } from "lucide-react";

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
    className="flex items-center gap-2 py-2 px-4 text-tx-on-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
  >
    {icon} {label}
  </Link>
);

const MobileMenu = ({ onClose }: { onClose: () => void }): JSX.Element => (
  <div className="bg-navbar text-tx-on-primary fixed top-26 left-0 right-0 shadow-xs rounded-b-md overflow-hidden z-50 transition-all duration-300">
    <div className="py-4 px-6 flex flex-col">
      <nav className="flex flex-col space-y-3">
        <NavItem href="/about" label="Sobre" icon={<Info size={20} />} />
        <NavItem href="/" label="Contato" icon={<Phone size={20} />} />
        <NavItem href="/cart" label="Carrinho" icon={<ShoppingCart size={20} />} onClick={onClose} />
        <NavItem href="#" label="Notificações" icon={<Bell size={20} />} onClick={onClose} />
      </nav>
    </div>
  </div>
);

export default MobileMenu;
