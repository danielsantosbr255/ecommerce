import { userService } from "@/services/users";
import SessionLabel from "@/components/ui/SessionLabel";
import { FaUsers } from "react-icons/fa";

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
      <SessionLabel label="Usuários" icon={<FaUsers size={25} />} />

      <table className="bg-bg-secondary min-w-full divide-y divide-lines shadow-xs rounded-xl overflow-hidden">
        <thead className="bg-gray-200 font-bold text-sm">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-medium tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Telefone
            </th>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Cargo
            </th>
            <th scope="col" className="px-6 py-3 text-right font-medium tracking-wider">
              Criado em
            </th>
          </tr>
        </thead>

        <tbody className="bg-bg-secondary divide-y divide-lines">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="pl-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-sm">{user.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>{user.phone || "-"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div>{user?.roles?.map((role) => role.role.name).join(", ") || "-"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div>{new Date(user.createdAt).toLocaleString()}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
