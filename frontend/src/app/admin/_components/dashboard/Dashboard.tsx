"use client";

import MetricCard from "./MetricCard";
import { userService } from "@/services/users";
import { orderService } from "@/services/orders";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/products";
import { FaBoxesPacking } from "react-icons/fa6";
import { FaBoxes, FaShoppingBasket, FaUsers } from "react-icons/fa";

export default function Dashboard() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getMany({ page: 1, limit: 10 }),
    staleTime: 60 * 1000,
  });
  const { data: orders } = useQuery({ queryKey: ["orders"], queryFn: orderService.getAll, staleTime: 60 * 1000 });
  const { data: result } = useQuery({ queryKey: ["products"], queryFn: () => productService.getMany() });

  const totalUsers = users?.meta?.total || 0;
  const totalOrders = orders?.length || 0;
  const totalProducts = result?.meta?.total || 0;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard iconColor="bg-green-500" title="Total de Vendas" value={1.265} icon={<FaShoppingBasket size={40} />} />
        <MetricCard iconColor="bg-blue-500" title="Total de Pedidos" value={totalOrders} icon={<FaBoxesPacking size={40} />} />
        <MetricCard iconColor="bg-amber-500" title="Total de Produtos" value={totalProducts} icon={<FaBoxes size={40} />} />
        <MetricCard iconColor="bg-red-500" title="Total de Usuários" value={totalUsers} icon={<FaUsers size={40} />} />
      </section>

      <section className="bg-white shadow-xs rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
        <ul>
          <li className="py-2 border-b border-lines last:border-b-0 flex items-center justify-between">
            <span>Novo usuário registrado: João Silva</span>
            <span className="text-sm">Há 5 minutos</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
