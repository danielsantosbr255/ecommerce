import SessionLabel from "@/components/ui/SessionLabel";
import { permissionService } from "@/services/permissions";
import { FaCheckCircle } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";

export default async function page() {
  const permissions = await permissionService.getAll();

  if (!permissions) {
    return <div className="w-full h-full flex items-center justify-center">Nenhuma permissão encontrada.</div>;
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <SessionLabel label="Permissiões" icon={<MdLibraryAddCheck size={25} />} />

      <section className="bg-bg-secondary flex flex-col w-full h-full gap-2 shadow-xs rounded-xl p-2">
        {permissions.map((permission) => (
          <article key={permission.id} className="flex w-full p-4 gap-4 items-center border-b border-lines last:border-b-0">
            <div>
              <FaCheckCircle className="inline-block text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-tx-primary">{permission.action}</h2>
              <p className="text-sm text-tx-secondary">{permission.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
