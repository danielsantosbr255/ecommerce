import SessionLabel from "@/components/ui/SessionLabel";
import { roleService } from "@/services/roles";
import { FaUsersCog, FaUserTie } from "react-icons/fa";

export default async function page() {
  const roles = await roleService.getAll();

  if (!roles) {
    return <div className="w-full h-full flex items-center justify-center">Nenhum cargo encontrado.</div>;
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <SessionLabel label="Cargos" icon={<FaUsersCog size={25} />} />

      <section className="bg-bg-secondary flex flex-col w-full h-full gap-2 shadow-xs rounded-xl p-2">
        {roles.map((role) => (
          <article key={role.id} className="flex w-full p-4 gap-4 items-center border-b border-lines last:border-b-0">
            <div>
              <FaUserTie className="inline-block text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-tx-primary">{role.name}</h2>
              <p className="text-sm text-gray-600">{role.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
