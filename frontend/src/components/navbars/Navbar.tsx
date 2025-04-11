"use client";

import Link from "next/link";
import SearchBar from "../search/SearchBar";
import { Menu, ShoppingCart, LogIn, Bell, FlameKindling, UserCircle, ShieldUser } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const auth = useAuth();
  if (!auth) return null;

  const { user } = auth;

  return (
    <nav className="fixed bg-white w-full top-0 z-50 shadow-md">
      <div className="flex mx-auto lg:max-w-10/12 py-3 px-2 items-center justify-between z-50 text-gray-500">
        <div className="hidden md:flex gap-6 items-center font-semibold text-sm">
          <Link
            href="/"
            className="font-bold text-sm h-12 flex items-center text-amber-500 mr-5 focus:outline-none"
          >
            <FlameKindling className="size-8" />
            Fireforge Labs
          </Link>
          <Link href="/">Início</Link>
          <Link href="/">Loja</Link>
          <Link href="/">Sobre</Link>
          <Link href="/">Contato</Link>
        </div>

        {/* Campo de pesquisa */}
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

        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}
