"use client";

import MetricCard from "./MetricCard";
import React, { useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useProducts } from "@/hooks/useProducts";
import LoadingState from "@/components/LoadingState";
import { Package, Users, ShoppingBag, ClipboardList } from "lucide-react";

export default function Dashboard() {
  const { users, loading: usersLoading, error: usersError, fetchUsers } = useUsers();
  const { products, loading: productsLoading, error: productsError, fetchProducts } = useProducts();

  useEffect(() => {
    const fectchDashboardData = async () => {
      await Promise.all([fetchUsers(), fetchProducts()]);
    };
    fectchDashboardData();
  }, []);

  if (usersLoading || productsLoading) return <LoadingState />;
  if (usersError || productsError) return <div>Erro: {usersError || productsError}</div>;

  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          iconColor="bg-green-500"
          title="Total de Vendas"
          value={34.254}
          icon={<ShoppingBag size={40} />}
        />
        <MetricCard
          iconColor="bg-blue-500"
          title="Total de Pedidos"
          value={34.254}
          icon={<ClipboardList size={40} />}
        />
        <MetricCard
          iconColor="bg-yellow-500"
          title="Total de Produtos"
          value={totalProducts}
          icon={<Package size={40} />}
        />
        <MetricCard
          iconColor="bg-red-500"
          title="Total de Usuários"
          value={totalUsers}
          icon={<Users size={40} />}
        />
      </section>

      <section className="bg-white shadow-xs rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-tx-primary mb-4">Atividade Recente</h2>
        <ul>
          <li className="py-2 border-b border-lines last:border-b-0 flex items-center justify-between">
            <span>Novo usuário registrado: João Silva</span>
            <span className="text-sm text-tx-secondary">Há 5 minutos</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
