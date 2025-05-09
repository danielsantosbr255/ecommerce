import Link from "next/link";
import { User } from "@/types";
import { JSX } from "react";
import { Loader, LogIn, Menu, ShieldUser, UserCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/Searchbar";

interface MobileBarProps {
  user: User | null;
  loading: boolean;
  toggleMobileMenu: () => void;
}

const MobileBar = ({ user, loading, toggleMobileMenu }: MobileBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <section className="block lg:hidden w-full">
      <main className="lg:hidden grid grid-cols-3 w-full h-auto px-1 justify-between text-tx-on-primary items-center">
        <button
          onClick={toggleMobileMenu}
          className="justify-start focus:outline-none"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <Logo size={20} name className="!h-15" />

        <div className="flex gap-4 justify-end items-center">
          {isAdmin && (
            <Link href="/admin" className="text-accent">
              <ShieldUser size={22} className="animate-pulse" />
            </Link>
          )}

          {loading ? (
            <Loader size={25} className="animate-spin" />
          ) : (
            <Link href={user ? "/account" : "/auth/sign-in"}>
              {user ? <UserCircle size={22} /> : <LogIn />}
            </Link>
          )}
        </div>
      </main>

      <div className="lg:hidden">
        <SearchBar />
      </div>
    </section>
  );
};

export default MobileBar;
