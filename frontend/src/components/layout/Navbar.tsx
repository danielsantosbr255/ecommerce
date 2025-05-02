"use client";

import { useState, useEffect, ReactNode, JSX } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "../ui/Searchbar";
import { Bell, Info, LogIn, Menu, ShieldUser, ShoppingCart, UserCircle } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { UserType } from "@/types/UserType";
import clsx from "clsx";
import Logo from "../ui/Logo";

interface NavItemProps {
  href: string;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DesktopBarProps {
  user: UserType | null;
}

interface MobileBarProps {
  user: UserType | null;
  toggleMobileMenu: () => void;
}

const NavItem = ({ href, label = "", icon, onClick, className }: NavItemProps): JSX.Element => (
  <Link
    href={href}
    onClick={onClick}
    className={clsx(
      className,
      "flex items-center gap-0 py-2 px-4 text-tx-on-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {icon} {label}
  </Link>
);

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nova promoção disponível!", read: false },
    { id: 2, message: "Seu pedido foi enviado.", read: false },
  ]);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <Link href="#">
      <div className="relative flex items-center gap-0 py-2 px-4 text-tx-on-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300">
        <button onClick={toggleNotifications} className="relative focus:outline-none">
          <Bell size={20} />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
            </>
          )}
        </button>

        {isNotifOpen && (
          <div className="absolute right-0 top-8 mt-2 w-64 bg-white shadow-xs rounded-md border border-lines z-50">
            <div className="p-4">
              {notifications.length === 0 ? (
                <p className="text-sm text-tx-on-primary">Sem notificações</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="text-sm text-tx-on-primary py-1 border-b last:border-b-0">
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

const DesktopBar = ({ user }: DesktopBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";
 
  return (
    <main className="hidden lg:grid grid-cols-3 w-full items-center justify-between px-2 py-0">
      <div className="items-center font-semibold">
        <Logo size={30} name className="!text-3xl !font-medium" />
      </div>

      <SearchBar className="hidden" />

      <div className="flex items-center justify-end gap-2">
        {isAdmin && (
          <NavItem href="/admin" icon={<ShieldUser size={25} className="animate-pulse text-primary" />} />
        )}
        <NavItem href="/about" icon={<Info size={25} />} />
        <NavItem href="/cart" icon={<ShoppingCart size={25} />} />
        <Notification />
        <NavItem
          href={user ? "/account" : "/auth/sign-in"}
          label=""
          icon={user ? <UserCircle size={25} /> : <LogIn size={25} />}
        />
      </div>
    </main>
  );
};

const MobileBar = ({ user, toggleMobileMenu }: MobileBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <section className="block lg:hidden w-full">
      <main className="lg:hidden grid grid-cols-3 w-full p-1 justify-between text-primary items-center">
        <button
          onClick={toggleMobileMenu}
          className="justify-start focus:outline-none"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <Logo size={20} name className="!text-lg !font-medium" />

        <div className="flex gap-4 justify-end items-center">
          {isAdmin && (
            <Link href="/admin" className="text-primary">
              <ShieldUser size={22} className="animate-pulse" />
            </Link>
          )}
          <Link href={user ? "/account" : "/auth/sign-in"}>
            {user ? <UserCircle size={22} /> : <LogIn />}
          </Link>
        </div>
      </main>

      <div className="lg:hidden">
        <SearchBar />
      </div>
    </section>
  );
};

export default function Navbar(): JSX.Element | null {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loadUser, loading } = useAuth();

  useEffect(() => {
    loadUser();
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="flex flex-1 !text-tx-on-primary items-center w-full lg:mx-auto lg:max-w-10/12">
      <DesktopBar user={user} />
      <MobileBar user={user} toggleMobileMenu={toggleMobileMenu} />

      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
}
