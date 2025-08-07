"use client";

import { Role } from "@/types";
import { useState } from "react";
import { AddUserModal } from "./AddUserModal";
import { FaPlus, FaUserTie } from "react-icons/fa";
import Skeleton from "@/components/ui/Skeleton";

export default function RoleMembers({ role }: { role: Role | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!role) return <Skeleton className="w-fit !bg-gray-200 !text-transparent rounded-md transition-all" />;

  return (
    <>
      <section className="flex flex-col gap-4 px-2">
        <h1 className="flex justify-between items-center font-semibold mb-4 mx-2">
          Membros
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-2 flex items-center justify-center cursor-pointer font-medium"
          >
            <FaPlus size={12} />
          </button>
        </h1>

        <div className="flex flex-col gap-1">
          {role.users?.map((member) => (
            <span key={member.user.id} className="flex rounded-lg px-2 py-2 gap-2 font-medium hover:bg-bg-overlay cursor-pointer">
              <FaUserTie size={20} />
              {member.user.name}
            </span>
          ))}
        </div>
      </section>

      {isOpen && <AddUserModal role={role} handleAddUsers={() => setIsOpen(false)} />}
    </>
  );
}
