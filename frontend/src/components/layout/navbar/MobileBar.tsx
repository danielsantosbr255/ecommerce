"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { Loader2, Menu } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import SearchBar from "@/components/ui/Searchbar";
import { FaBuildingShield } from "react-icons/fa6";
import { FaSignInAlt, FaUserAstronaut } from "react-icons/fa";

type Props = {
  toggleMobileMenu: () => void;
};

const MobileBar = ({ toggleMobileMenu }: Props) => {
  const router = useRouter();
  const { user, userLoading } = useAuth();

  const isStaff = user && user.roles.length > 0;

  const handleSearch = (query?: string) => {
    if (query?.trim()) router.push(`/search?q=${query}`);
    else router.push("/");
  };

  return (
    <section className="block lg:hidden w-full">
      <main className="lg:hidden grid grid-cols-3 w-full h-auto px-1 justify-between text-primary items-center">
        <button
          onClick={toggleMobileMenu}
          className="justify-start focus:outline-none cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <Logo size={20} name className="!h-15" />

        <div className="flex gap-4 justify-end items-center">
          {isStaff && (
            <Link href="/admin">
              <FaBuildingShield size={22} className="text-primary" />
            </Link>
          )}

          {userLoading ? (
            <Loader2 size={25} className="animate-spin" />
          ) : (
            <Link href={user ? "/account" : "/sign-in"}>
              {user ? <FaUserAstronaut size={22} /> : <FaSignInAlt />}
            </Link>
          )}
        </div>
      </main>

      <div className="lg:hidden">
        <SearchBar onSearch={handleSearch} placeholder="Pesquisar produtos..." />
      </div>
    </section>
  );
};

export default MobileBar;
