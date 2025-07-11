"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import MobileMenu from "../MobileMenu";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/providers/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import { FaSignInAlt, FaUserNinja, FaUserShield } from "react-icons/fa";
import { Loader2, Menu } from "lucide-react";

const MobileBar = (): JSX.Element => {
  const { user, userLoading } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <section className="block lg:hidden w-full">
      <main className="lg:hidden grid grid-cols-3 w-full h-auto px-1 justify-between text-primary items-center">
        <button onClick={toggleMobileMenu} className="justify-start focus:outline-none" aria-label="Abrir menu">
          <Menu size={22} />
        </button>

        <Logo size={20} name className="!h-15" />

        <div className="flex gap-4 justify-end items-center">
          {isAdmin && (
            <Link href="/admin" className="text-accent">
              <FaUserShield size={22} className="animate-pulse" />
            </Link>
          )}

          {userLoading ? (
            <Loader2 size={25} className="animate-spin" />
          ) : (
            <Link href={user ? "/account" : "/sign-in"}>{user ? <FaUserNinja size={22} /> : <FaSignInAlt />}</Link>
          )}
        </div>
      </main>

      <MobileMenu onClose={toggleMobileMenu} isOpen={isMobileMenuOpen} />

      <div className="lg:hidden">
        <SearchBar />
      </div>
    </section>
  );
};

export default MobileBar;
