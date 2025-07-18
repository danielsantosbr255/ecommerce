import { permissionService } from "@/services/permissions";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/Button";

export default async function page() {
  const permissions = await permissionService.getAll();

  if (!permissions) {
    return <div className="w-full h-full flex items-center justify-center">Nenhuma permissão encontrada.</div>;
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <Table>
        <TableCaption className="text-center py-4">
          <div className="relative flex justify-center items-center gap-3 text-tx-primary font-semibold text-xl">
            <MdLibraryAddCheck className="text-primary" size={25} />
            <p>Listagem de permissões</p>

            <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
              {permissions.length > 0 ? `${permissions.length} permissões` : "nenhum permissão"}
            </span>

            <Button className="absolute left-3 top-1/2 -translate-y-1/2 !rounded-2xl !text-sm" href="/admin/roles/new">
              <FaPlus className="mr-1" size={10} /> Novo cargo
            </Button>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-bg-overlay/10 text-sm">
            <TableHead>Cargo</TableHead>
            <TableHead>Recurso</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-bg-secondary divide-lines">
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell className="items-center py-5">
                <span className="flex items-center gap-4 font-medium uppercase">
                  <FaCheckCircle className="inline-block text-primary" size={20} /> {permission.action}
                </span>
              </TableCell>

              <TableCell className="text-center">
                <span className="flex items-center gap-2">{permission.subject}</span>
              </TableCell>

              <TableCell className="text-center">
                <span className="flex items-center gap-2">{permission.description}</span>
              </TableCell>

              <TableCell className="text-right">
                <button className="text-primary hover:underline cursor-pointer">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
