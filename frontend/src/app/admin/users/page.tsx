import { userService } from "@/services/users";
import { FaUser, FaUsers } from "react-icons/fa";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function page() {
  const users = await userService.getAll();

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  console.log(users.map((user) => user.roles));

  return (
    <main className="flex flex-col w-full gap-4">
      <Table>
        <TableCaption className="text-center py-4">
          <div className="relative flex justify-center items-center gap-2 text-tx-primary font-semibold text-xl">
            <FaUsers className="text-primary" size={25} />
            <p>Listagem de usuários</p>

            <span className="absolute top-0 right-3 bg-primary/20 text-primary font-normal text-sm px-2 py-1 rounded-xl">
              {users.length > 0 ? `${users.length} usuários` : "Nenhum usuário"}
            </span>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-bg-overlay/10 text-sm">
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Telefone</TableHead>
            <TableHead className="text-center">Cargo</TableHead>
            <TableHead className="text-right">Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-bg-secondary divide-lines">
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="py-5">{user.id}</TableCell>
              <TableCell className="items-center">
                <span className="flex items-center gap-2">
                  <FaUser /> {user.name}
                </span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center">{user.phone || "-"}</TableCell>
              <TableCell className="text-center">
                {user?.roles && user.roles.length > 0 ? (
                  <span className="bg-primary/20 text-primary font-medium text-sm px-2 py-1 rounded-full uppercase">
                    {user.roles.map((role) => role.role.name).join(", ")}
                  </span>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">{new Date(user.createdAt).toLocaleString()}</TableCell>
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
