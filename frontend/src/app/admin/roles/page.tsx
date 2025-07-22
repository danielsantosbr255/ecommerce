import Link from "next/link";
import { roleService } from "@/services/roles";
import CreateRole from "./_components/CreateRole";
import { FaUsersCog, FaUserTie } from "react-icons/fa";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function page() {
  const roles = await roleService.getAll();

  if (!roles) {
    return <div className="w-full h-full flex items-center justify-center">Nenhum cargo encontrado.</div>;
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <Table>
        <TableCaption className="text-center py-4">
          <div className="relative flex justify-center items-center gap-3 text-tx-primary font-semibold text-xl">
            <FaUsersCog className="text-primary" size={25} />
            <p>Listagem de cargos</p>

            <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
              {roles.length > 0 ? `${roles.length} cargos` : "nenhum cargo"}
            </span>

            <CreateRole />
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-bg-overlay/10 text-sm">
            <TableHead>Cargo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-bg-secondary divide-lines">
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="items-center py-5">
                <span className="flex items-center gap-4 font-medium">
                  <FaUserTie className="inline-block text-primary" size={20} /> {role.name}
                </span>
              </TableCell>

              <TableCell className="text-center">
                <span className="flex items-center gap-2">{role.description}</span>
              </TableCell>

              <TableCell className="text-right">
                <Link href={`/admin/roles/${role.id}`} className="text-primary hover:underline cursor-pointer">
                  Editar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
