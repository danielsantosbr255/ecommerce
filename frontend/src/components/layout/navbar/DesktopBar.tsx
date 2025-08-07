"use client";

import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { JSX, ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/providers/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import Notification from "@/components/common/Notification";
import { FaBuildingCircleExclamation } from "react-icons/fa6";
import { FaCartArrowDown, FaSignInAlt, FaUserAstronaut, FaUserSecret } from "react-icons/fa";

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
      "flex items-center gap-0 py-2 px-4 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {icon} {label}
  </Link>
);

const CartItem = () => {
  const { cartItems } = useAuth();
  const cartItemCount = cartItems?.length ? cartItems?.length : null;

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-0 py-2 px-4 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
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
  const isAdmin = user?.roles?.find((role) =>
    role.role.permissions.find(
      (permission) => permission.permission.action === "manage" && permission.permission.subject === "all"
    )
  );

  if (loading) return <NavItem href="#" icon={<Loader2 size={25} className="animate-spin" />} />;

  return (
    <>
      <NavItem
        href={user ? "/account" : "/sign-in"}
        label=""
        icon={user ? <FaUserAstronaut size={25} /> : <FaSignInAlt size={25} />}
      />

      {isAdmin && <NavItem href="/admin" icon={<FaUserSecret size={25} className="animate-pulse text-primary" />} />}
    </>
  );
};

export default function DesktopBar({ className }: { className?: string }): JSX.Element {
  const { user, userLoading } = useAuth();

  return (
    <main className={cn(className, "hidden w-full px-2 lg:grid grid-cols-[1fr_2fr_1fr] items-center justify-between")}>
      <div className="flex w-full h-full items-center font-semibold">
        <Logo size={25} />
      </div>

      <SearchBar />

      <div className="bg-amber-30 flex w-full h-full items-center justify-end gap-1">
        <NavItem href="/about" icon={<FaBuildingCircleExclamation size={25} className="text-primary" />} />
        <CartItem />
        <Notification />
        <UserItem user={user} loading={userLoading} />
      </div>
    </main>
  );
}
