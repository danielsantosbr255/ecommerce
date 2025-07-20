import { UserRole } from "@/types";
import { FaUserTie } from "react-icons/fa";

export default async function RoleMembers({ members }: { members: UserRole[] | null }) {
  if (!members) return null;

  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="font-semibold mb-4 ml-2">Membros</h1>

      <div className="flex flex-col gap-1">
        {members?.map((member) => (
          <div key={member.roleId} className="flex rounded-lg px-2 py-2 gap-2 font-medium hover:bg-bg-overlay cursor-pointer">
            <FaUserTie size={20} />
            {member.user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
