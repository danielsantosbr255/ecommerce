"use client";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";

const AdminDashboardContent = () => {
  const { user, loading } = useUsers();
  const router = useRouter();

  if (!loading && user?.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  return <Dashboard />;
};

export default AdminDashboardContent;
