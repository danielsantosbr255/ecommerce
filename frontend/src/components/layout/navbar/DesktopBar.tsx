import Notification from "@/components/common/Notification";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/Searchbar";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Info, LogIn, ShieldUser, ShoppingCart, UserCircle } from "lucide-react";
import Link from "next/link";
import { JSX, ReactNode } from "react";

interface NavItemProps {
  href: string;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DesktopBarProps {
  user: User | null;
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
          <NavItem href="/admin" icon={<ShieldUser size={26} className="animate-pulse text-accent" />} />
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

export default DesktopBar;
