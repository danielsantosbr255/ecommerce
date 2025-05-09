import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { JSX, ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/Searchbar";
import Notification from "@/components/common/Notification";
import { Info, Loader, LogIn, ShieldUser, ShoppingCart, UserCircle } from "lucide-react";

interface NavItemProps {
  href: string;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DesktopBarProps {
  user: User | null;
  loading: boolean;
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

const DesktopBar = ({ user, loading }: DesktopBarProps): JSX.Element => {
  const isAdmin = user?.role === "ADMIN";

  return (
    <main className="hidden lg:grid grid-cols-3 w-full items-center justify-between px-2 py-0">
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

        {loading ? (
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
  );
};

export default DesktopBar;
