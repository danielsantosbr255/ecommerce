"use client";

import React from "react";
import Link from "next/link";
import Logo from "../ui/Logo";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronFirst, ChevronLast, LogOut } from "lucide-react";

interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  href?: string;
  children?: React.ReactNode;
}

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarContext = React.createContext({ isOpen: true });

export function Sidebar({ children, className }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <nav className={`bg-bg-secondary flex flex-col rounded-2xl shadow-xs border border-lines ${className}`}>
      <div className="flex p-2 pb-4 items-center justify-between">
        <Logo
          size={30}
          name
          className={`overflow-hidden transition-all ease-in-out duration-300 ${isOpen ? "w-52" : "w-0"}`}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
        >
          {isOpen ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      <SidebarContext.Provider value={{ isOpen }}>
        <ul className="flex flex-col flex-1 p-2 gap-1">{children}</ul>
        <SidebarFooter />
      </SidebarContext.Provider>
    </nav>
  );
}

export function SidebarItem({ icon, text, alert, href = "" }: SidebarItemProps) {
  const { isOpen } = React.useContext(SidebarContext);
  const usePath = usePathname();
  const active = usePath === href;

  const mainStyle = cn(
    "flex items-center p-2",
    "font-medium text-lg text-tx-secondary rounded-xl cursor-pointer",
    "transition-colors group z-50",
    active ? "bg-primary !text-tx-on-primary" : "hover:bg-gray-200"
  );

  return (
    <Link href={href}>
      <li className={mainStyle}>
        {icon}
        <span
          className={`overflow-hidden transition-all ease-in-out duration-300 ${
            isOpen ? "w-52 ml-2" : "w-0"
          }`}
        >
          {text}
        </span>
      </li>
    </Link>
  );
}

export function SidebarFooter() {
  const { isOpen } = React.useContext(SidebarContext);
  const { user, signOut, loadUser } = useAuth();

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="flex flex-col border-t border-lines p-2">
      <div className="flex items-center">
        <Skeleton className="w-10 h-10 !rounded-lg" />

        <div
          className={`flex justify-between overflow-hidden items-center transition-all ease-in-out duration-300 ${
            isOpen ? "flex-1 ml-3" : "w-0"
          }`}
        >
          <div>
            <h1 className="font-semibold">{user?.name}</h1>
            <p className="text-sm text-tx-secondary">{user?.email}</p>
          </div>

          <Button className="!p-2" onClick={signOut}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// export function SidebarItem({ children, icon, text, alert, href = "" }: SidebarItemProps) {
//   const { isOpen } = React.useContext(SidebarContext);
//   const usePath = usePathname();
//   const active = usePath === href;

//   return (
//     <li
//       className={`relative flex items-center justify-center py-2 my-1
//     font-medium text-lg text-tx-secondary rounded-xl cursor-pointer
//     transition-colors group z-50
//     ${active ? "bg-primary !text-tx-on-primary" : "hover:bg-gray-200 "}
//     `}
//     >
//       <Link href={href} className="flex items-center">
//         {icon}
//         <p className={`overflow-hidden transition-all ${isOpen ? "w-52 ml-2" : "w-0"}`}>{text}</p>

//         {alert && <Alert active={active} onTop={isOpen} />}

//         {!isOpen && (
//           <div
//             className={`
//             bg-primary text-tx-on-primary absolute left-full rounded-lg px-2 py-1 ml-4
//             invisible opacity-20 -translate-x-3 transition-all
//             group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
//           >
//             {text}
//           </div>
//         )}
//       </Link>
//     </li>
//   );
// }
