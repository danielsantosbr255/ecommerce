"use client";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const AdminDashboardContent = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && user?.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  return <Dashboard />;
};

export default AdminDashboardContent;
