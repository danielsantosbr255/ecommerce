"use client";

import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils/utils";
import { Loader2 } from "lucide-react";
import { JSX, ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/providers/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import { cartService } from "@/services/carts";
import { useQuery } from "@tanstack/react-query";
import { FaBuildingShield } from "react-icons/fa6";
import Notification from "@/components/common/Notification";
import { FaCartArrowDown, FaInfoCircle, FaSignInAlt, FaUserAstronaut } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface NavItemProps {
  href: string;
  count?: number;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavItem = ({ href, label = "", icon, onClick, className }: NavItemProps): JSX.Element => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      className,
      "flex items-center py-2 px-3 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {icon} {label}
  </Link>
);

const CartItem = () => {
  const { data: cartItems } = useQuery({ queryKey: ["cart"], queryFn: cartService.getOwnCart });
  const cartItemCount = cartItems?.length ? cartItems?.length : null;

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-0 py-2 px-3 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    >
      {cartItemCount && (
        <span className="absolute bg-primary top-0.5 right-0.5 flex items-center justify-center w-[18px] h-[18px] text-xs font-bold text-white rounded-full">
          {cartItemCount}
        </span>
      )}
      <FaCartArrowDown size={25} />
    </Link>
  );
};

const UserItem = ({ user, loading }: { user: User | null; loading: boolean }) => {
  if (loading) return <NavItem href="#" icon={<Loader2 size={25} className="animate-spin" />} />;

  const isStaff = user && user.roles.length > 0;

  return (
    <>
      <NavItem
        href={user ? "/account" : "/sign-in"}
        label=""
        icon={user ? <FaUserAstronaut size={25} /> : <FaSignInAlt size={25} />}
      />

      {isStaff && <NavItem href="/admin" icon={<FaBuildingShield size={25} className="text-primary" />} />}
    </>
  );
};

export default function DesktopBar({ className }: { className?: string }): JSX.Element {
  const router = useRouter();
  const { user, userLoading } = useAuth();

  const handleSearch = (query?: string) => {
    if (query?.trim()) router.push(`/search?q=${query}`);
    else router.push("/");
  };

  return (
    <main className={cn(className, "hidden w-full px-2 lg:grid grid-cols-[1fr_2fr_1fr] items-center justify-between")}>
      <div className="flex w-full h-full items-center font-semibold">
        <Logo size={25} />
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Pesquisar produtos..." />

      <div className="bg-amber-30 flex w-full h-full items-center justify-end gap-1">
        <NavItem href="/about" icon={<FaInfoCircle size={25} className="text-primary" />} />
        <CartItem />
        <Notification />
        <UserItem user={user} loading={userLoading} />
      </div>
    </main>
  );
}
