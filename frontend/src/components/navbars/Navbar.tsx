"use client";

import { useState, useEffect, ReactNode, JSX } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SearchBar from "../search/SearchBar";
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
import { FaTimes } from "react-icons/fa";

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
    className="flex items-center gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-amber-500 rounded-md transition duration-300"
  >
    {icon} {label}
  </Link>
);

const MobileMenu = ({ onClose }: { onClose: () => void }): JSX.Element => (
  <div className="fixed top-20 left-0 right-0 bg-white shadow-md rounded-b-md overflow-hidden z-40 transition-all duration-300">
    <div className="py-4 px-6 flex flex-col">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="focus:outline-none text-gray-700 hover:text-amber-500 transition duration-300"
          aria-label="Fechar menu"
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col space-y-3">
        <NavItem href="/about" label="Sobre" icon={<Info size={20} />} />
        <NavItem href="/" label="Contato" icon={<Phone size={20} />} />
        <NavItem href="/cart" label="Carrinho" icon={<ShoppingCart size={20} />} onClick={onClose} />
        <NavItem href="#" label="Notificações" icon={<Bell size={20} />} onClick={onClose} />
      </nav>
    </div>
  </div>
);

export default function Navbar(): JSX.Element | null {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useAuth();

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nova promoção disponível!", read: false },
    { id: 2, message: "Seu pedido foi enviado.", read: false },
  ]);

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!auth) return null;

  const { user } = auth;
  const isAdmin = user?.role === "ADMIN";

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 z-50 w-full h-20 bg-white shadow-md">
      <div className="flex justify-between items-center h-full px-2 py-3 mx-auto text-gray-500 lg:max-w-10/12">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <Link href="/" className="hidden md:flex items-center text-amber-500 font-bold text-md">
            <FlameKindling size={30} /> Fireforge Labs
          </Link>
          <NavItem href="/about" label="Sobre" icon={<Info size={20} />} />
          <NavItem href="/" label="Contato" icon={<Phone size={20} />} />
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-8">
          <SearchBar />
          {isAdmin && (
            <Link href="/admin" className="text-yellow-400 animate-pulse">
              <ShieldUser className="scale-120" />
            </Link>
          )}
          <Link href={user ? "/account" : "/auth/signin"}>
            {user ? <UserCircle className="scale-120" /> : <LogIn />}
          </Link>
          <Link href="#">
            <div className="relative">
              <button onClick={toggleNotifications} className="relative focus:outline-none">
                <Bell />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                  <div className="p-4">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">Sem notificações</p>
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
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex justify-between items-center w-full md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-amber-500 focus:outline-none"
            aria-label="Abrir menu"
          >
            <Menu className="size-8" />
          </button>

          <Link href="/" className="flex items-center text-amber-500 font-bold text-sm">
            <FlameKindling /> <span>Fireforge Labs</span>
          </Link>

          <div className="flex gap-4">
            {isAdmin && (
              <Link href="/admin" className="text-yellow-400 animate-pulse">
                <ShieldUser className="scale-120" />
              </Link>
            )}
            <Link href={user ? "/account" : "/auth/signin"}>
              {user ? <UserCircle className="scale-120" /> : <LogIn />}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </nav>
  );
}
