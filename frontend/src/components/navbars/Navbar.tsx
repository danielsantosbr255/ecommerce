"use client";

import Link from "next/link";
import SearchBar from "../search/SearchBar";
import { Menu, ShoppingCart, LogIn, Bell, FlameKindling, UserCircle, ShieldUser } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importe o ícone de fechar

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useAuth();
  if (!auth) return null;

  const { user } = auth;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/about" },
    { label: "Contato", href: "/" },
    // Adicione outros itens do menu mobile aqui, se necessário
  ];

  return (
    <nav className="fixed bg-white w-full top-0 z-50 shadow-md h-20">
      <div className="flex mx-auto lg:max-w-10/12 py-3 px-2 items-center justify-between z-50 text-gray-500">
        {/* Logo para Desktop */}
        <Link
          href="/"
          className="font-bold text-sm h-12 items-center text-amber-500 mr-5 focus:outline-none hidden md:flex"
        >
          <FlameKindling className="size-8" />
          Fireforge Labs
        </Link>

        {/* Campo de pesquisa (Desktop) */}
        <div className="hidden gap-8 md:flex items-center">
          <SearchBar />
          <Link className="text-yellow-400 animate-pulse" href="/admin">
            {user?.role === "ADMIN" && <ShieldUser className="scale-120" />}
          </Link>
          <Link href={user ? "/account" : "/auth/signin"}>
            {user ? <UserCircle className="scale-120" /> : <LogIn />}
          </Link>
          <Link href="#">
            <Bell />
          </Link>
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </div>

        {/* Menu Hamburguer para Mobile */}
        <div className="md:hidden flex items-center">
          {/* Botão Hamburguer */}
          <button onClick={toggleMobileMenu} className="focus:outline-none text-amber-500">
            <Menu className="size-8" />
          </button>
          {/* Logo para Mobile (pode ser duplicada ou diferente) */}
          <Link
            href="/"
            className="font-bold text-sm h-12 flex items-center text-amber-500 ml-3 focus:outline-none"
          >
            <FlameKindling className="size-6" />
            <span className="ml-1">Fireforge Labs</span>
          </Link>
        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bg-white shadow-md rounded-b-md overflow-hidden z-40 transition-all duration-300">
          <div className="py-4 px-6 flex flex-col">
            {/* Botão de Fechar */}
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleMobileMenu}
                className="focus:outline-none text-gray-700 hover:text-amber-500 transition duration-300"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            {/* Itens do Menu Mobile */}
            <nav className="flex flex-col space-y-3">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-amber-500 rounded-md transition duration-300"
                >
                  {item.label}
                </Link>
              ))}
              {/* Outros ícones/links que aparecem na versão desktop podem ser adicionados aqui */}
              <Link
                href={user ? "/account" : "/auth/signin"}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-amber-500 rounded-md transition duration-300"
              >
                {user ? (
                  <div className="flex items-center">
                    <UserCircle className="size-5 mr-2" /> Conta
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="size-5 mr-2" /> Entrar
                  </div>
                )}
              </Link>
              <Link
                href="/cart"
                onClick={toggleMobileMenu}
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-amber-500 rounded-md transition duration-300 flex items-center"
              >
                <ShoppingCart className="size-5 mr-2" /> Carrinho
              </Link>
              <Link
                href="#"
                onClick={toggleMobileMenu}
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-amber-500 rounded-md transition duration-300 flex items-center"
              >
                <Bell className="size-5 mr-2" /> Notificações
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={toggleMobileMenu}
                  className="py-2 px-4 text-yellow-400 hover:bg-gray-100 rounded-md transition duration-300 flex items-center"
                >
                  <ShieldUser className="size-5 mr-2" /> Admin
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
