"use client";
import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { JSX, ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import Notification from "@/components/common/Notification";
import { Info, Loader, LogIn, ShieldUser, ShoppingCart, UserCircle } from "lucide-react";

interface NavItemProps {
  href: string;
  count?: number;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DesktopBarProps {
  user: User | null;
  loading: boolean;
}

const NavItem = ({ href, label = "", icon, onClick, className }: NavItemProps): JSX.Element => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      className,
      "flex items-center gap-0 py-2 px-4 text-tx-secondary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {icon} {label}
  </Link>
);

const CartItem = ({ href, label = "", count, icon, onClick, className }: NavItemProps): JSX.Element => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      className,
      "relative flex items-center gap-0 py-2 px-4 text-tx-secondary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {count && (
      <span className="absolute bg-primary -top-0 -right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full">
        {count}
      </span>
    )}
    {icon} {label}
  </Link>
);

const DesktopBar = ({ user, loading }: DesktopBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";
  const { cartItems } = useAuth();
  const cartItemCount = cartItems?.length;

  return (
    <main className="hidden lg:grid grid-cols-[1fr_2fr_1fr] w-full items-center justify-between px-2 py-0">
      <div className="flex w-full h-full items-center font-semibold">
        <Logo size={25} />
      </div>

      <SearchBar />

      <div className="bg-amber-30 flex w-full h-full items-center justify-end gap-2">
        {isAdmin && (
          <NavItem href="/admin" icon={<ShieldUser size={26} className="animate-pulse text-accent" />} />
        )}

        <NavItem href="/about" icon={<Info size={25} />} />
        <CartItem href="/cart" icon={<ShoppingCart size={25} />} count={cartItemCount} />
        <Notification />

        {loading ? (
          <NavItem href="#" label="" icon={<Loader size={25} />} className="animate-spin" />
        ) : (
          <NavItem
            href={user ? "/account" : "/auth/sign-in"}
            label=""
            icon={user ? <UserCircle size={25} /> : <LogIn size={25} />}
          />
        )}
      </div>
    </main>
  );
};

export default DesktopBar;
