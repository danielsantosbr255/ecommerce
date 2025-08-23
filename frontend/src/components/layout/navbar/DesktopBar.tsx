"use client";

import NavItem from "./NavItem";
import { cn } from "@/lib/utils/utils";
import { Loader2 } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/carts";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import { FaBuildingShield } from "react-icons/fa6";
import Notification from "@/components/common/Notification";
import { FaCartArrowDown, FaInfoCircle, FaSignInAlt, FaUserAstronaut } from "react-icons/fa";

export default function DesktopBar({ className }: { className?: string }) {
  const router = useRouter();
  const { user, userLoading } = useAuth();
  const isStaff = user && user.roles.length > 0;

  const { data } = useQuery({ queryKey: ["cart"], queryFn: cartService.getOwnCart });
  const cartItemCount = data?.length ? data?.length : null;

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
        <NavItem href="/cart" icon={<FaCartArrowDown size={25} />} count={cartItemCount} />
        <Notification />

        {userLoading ? (
          <NavItem href="#" icon={<Loader2 size={25} className="animate-spin" />} />
        ) : (
          <NavItem
            href={user ? "/account" : "/sign-in"}
            icon={user ? <FaUserAstronaut size={25} /> : <FaSignInAlt size={25} />}
          />
        )}

        {isStaff && <NavItem href="/admin" icon={<FaBuildingShield size={25} className="text-primary" />} />}
      </div>
    </main>
  );
}
