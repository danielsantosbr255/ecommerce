import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  count?: number | null;
  label?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavItem = ({ href, label = "", icon, count, onClick, className }: NavItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      className,
      "relative flex items-center py-2 px-3 text-tx-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300"
    )}
  >
    {count && (
      <span className="absolute bg-primary top-0.5 right-0.5 flex items-center justify-center w-[18px] h-[18px] text-xs font-bold text-white rounded-full">
        {count}
      </span>
    )}
    {icon} {label}
  </Link>
);

export default NavItem;
