import Pagination from "@/components/ui/Pagination";
import UsersTable from "../_components/UsersTable";
import { userService } from "@/services/users";

export default async function page({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 12;

  const result = await userService.getMany({ page, limit });
  if (!result) return null;

  const { data: users, meta } = result;
  const { totalPages, total } = meta;

  return (
    <main className="flex flex-col w-full gap-4">
      <UsersTable users={users} totalItems={total} />
      <Pagination page={page} limit={limit} totalPages={totalPages} path={"/admin/users?"} />
    </main>
  );
}
