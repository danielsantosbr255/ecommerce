import { Suspense } from "react";
import Dashboard from "./_components/dashboard/Dashboard";
import LoadingState from "@/components/ui/LoadingState";

export const revalidate = 60;

export default function AdminDashboard() {
  return (
    <Suspense fallback={<LoadingState label="Carregando dados" />}>
      <Dashboard />
    </Suspense>
  );
}
