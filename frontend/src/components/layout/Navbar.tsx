"use client";

import { useState, useEffect, ReactNode, JSX } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "../ui/Searchbar";
import {
  Bell,
  FlameKindling,
  Info,
  LogIn,
  Menu,
  Phone,
  ShieldUser,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { UserType } from "@/types/UserType";
import clsx from "clsx";

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
      "flex items-center gap-0 py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-highlight-n rounded-md transition duration-300"
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
      <div className="relative flex items-center gap-0 py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-highlight-n rounded-md transition duration-300">
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
          <div className="absolute right-0 top-8 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
            <div className="p-4">
              {notifications.length === 0 ? (
                <p className="text-sm text-secondary">Sem notificações</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="text-sm text-gray-700 py-1 border-b last:border-b-0">
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
        <Link
          href="/"
          className="hidden whitespace-nowrap lg:flex w-1/3 items-center text-highlight-n font-bold text-md"
        >
          <FlameKindling size={30} className="shrink-0"/> Fireforge Labs
        </Link>
      </div>

      <SearchBar className="hidden" />

      <div className="flex items-center justify-end gap-2">
        {isAdmin && (
          <NavItem href="/admin" icon={<ShieldUser size={25} className="animate-pulse text-highlight-n" />} />
        )}
        <NavItem href="/about" icon={<Info size={22} />} />
        <NavItem href="/cart" icon={<ShoppingCart size={22} />} />
        <Notification />
        <NavItem
          href={user ? "/account" : "/auth/signin"}
          label=""
          icon={user ? <UserCircle size={22} /> : <LogIn size={22} />}
        />
      </div>
    </main>
  );
};

const MobileBar = ({ user, toggleMobileMenu }: MobileBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <section className="block lg:hidden w-full">
      <main className="lg:hidden grid grid-cols-3 w-full p-1 justify-between text-highlight-n items-center">
        <button
          onClick={toggleMobileMenu}
          className="justify-start focus:outline-none"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="flex justify-center items-center text-highlight-n font-bold text-[12px]">
          <FlameKindling size={22} /> <span>Fireforge Labs</span>
        </Link>

        <div className="flex gap-4 justify-end items-center">
          {isAdmin && (
            <Link href="/admin" className="text-highlight-n">
              <ShieldUser size={22} className="animate-pulse" />
            </Link>
          )}
          <Link href={user ? "/account" : "/auth/signin"}>{user ? <UserCircle size={22} /> : <LogIn />}</Link>
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
  const auth = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!auth) return null;
  const { user } = auth;

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="flex flex-1 items-center w-full lg:mx-auto lg:max-w-10/12">
      <DesktopBar user={user} />
      <MobileBar user={user} toggleMobileMenu={toggleMobileMenu} />

      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
}
