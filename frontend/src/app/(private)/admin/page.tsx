import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userService } from "@/services/users";
import { setServerCookies } from "@/lib/api/axios";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export default async function AdminDashboard() {
  setServerCookies((await cookies()).toString());
  const user = await userService.getOwn();

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return <Dashboard />;
}
