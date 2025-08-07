import UsersTable from "./UsersTable";
import { userService } from "@/services/users";

export default async function page() {
  const users = await userService.getAll();

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <UsersTable users={users} totalItems={users.length} />
    </main>
  );
}
