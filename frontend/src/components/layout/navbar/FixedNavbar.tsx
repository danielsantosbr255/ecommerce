"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { JSX, ReactNode, useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/Searchbar";
import Notification from "@/components/common/Notification";
import { Info, Loader, LogIn, ShieldUser, ShoppingCart, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  href: string;
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
      "flex items-center gap-0 py-2 px-4 text-tx-on-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {icon} {label}
  </Link>
);

const FixedNavbar = (): JSX.Element => {
  const { user, userLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const diff = window.scrollY - lastScrollY;

      if (window.scrollY >= (diff > 0 ? 100 : 300 + Math.abs(diff * 2))) setIsVisible(true);
      else setIsVisible(false);

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = user?.role === "ADMIN";

  return (
    <header
      className={cn(
        "transition-all duration-300",
        "fixed flex flex-col w-full z-50 bg-navbar shadow-sm h-auto",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%]"
      )}
    >
      <nav className="flex flex-1 !text-tx-on-primary items-center w-full lg:mx-auto lg:max-w-10/12">
        <main className="lg:grid grid-cols-3 w-full items-center justify-between px-2 py-0">
          <div className="items-center font-semibold">
            <Logo />
          </div>

          <SearchBar />

          <div className="flex items-center justify-end gap-2">
            {isAdmin && (
              <NavItem href="/admin" icon={<ShieldUser size={26} className="animate-pulse text-accent" />} />
            )}

            <NavItem href="/about" icon={<Info size={25} />} />
            <NavItem href="/cart" icon={<ShoppingCart size={25} />} />
            <Notification />

            {userLoading ? (
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
      </nav>
    </header>
  );
};

export default FixedNavbar;
