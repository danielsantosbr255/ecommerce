import { Role } from "@/types";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";

export default function RolesSection({ roles }: { roles?: Role[] | null }) {
  return (
    <section className="flex flex-col gap-4 px-2">
      <h1 className="font-semibold mb-4 ml-2">Cargos</h1>

      <div className="flex flex-col gap-1">
        {roles?.map((role) => (
          <Link
            href={`/admin/roles/${role.id}`}
            key={role.id}
            className="flex rounded-lg px-2 py-2 gap-2 font-medium items-center hover:bg-bg-overlay cursor-pointer"
          >
            <FaCircle className="text-primary" />
            {role.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
