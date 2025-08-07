"use client";

import SearchBar from "@/components/ui/Searchbar";
import Notification from "@/components/common/Notification";
import { User } from "@/types";
import Image from "next/image";
import { FaSignOutAlt, FaUserSecret } from "react-icons/fa";
import { useAuth } from "@/providers/AuthContext";

export default function AdminHeader({ user }: { user?: User | null }) {
  const { signOut } = useAuth();

  return (
    <nav className="bg-bg-primary grid grid-cols-3 items-center justify-between gap-4 py-2 px-5 w-full ">
      <div>
        <h1 className="text-2xl font-semibold text-tx-primary">Painel Administrativo</h1>
      </div>

      <SearchBar />

      <div className="flex items-center space-x-2 justify-end">
        <Notification />
        <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex items-center justify-center cursor-pointer font-medium">
          {user?.name}
          {user?.image && <Image src={user.image} alt={user.name} width={30} height={30} className="rounded-full" />}
          <FaUserSecret size={20} className="ml-2" />
        </button>

        <button
          onClick={signOut}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex items-center justify-center cursor-pointer font-medium"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
}
