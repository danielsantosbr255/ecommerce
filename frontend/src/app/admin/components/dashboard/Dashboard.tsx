import MetricCard from "./MetricCard";
import { userService } from "@/services/users";
import { productService } from "@/services/products";
import { FaBox, FaClipboardList, FaShoppingBasket, FaUsers } from "react-icons/fa";
import { orderService } from "@/services/orders";

export default async function Dashboard() {
  const users = await userService.getAll();
  const orders = await orderService.getAll();
  const result = await productService.getAll();
  const totalProducts = result?.pagination?.totalItems || 0;

  const totalUsers = users?.length || 0;
  const totalOrders = orders?.length || 0;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard iconColor="bg-green-500" title="Total de Vendas" value={34.254} icon={<FaShoppingBasket size={40} />} />
        <MetricCard iconColor="bg-blue-500" title="Total de Pedidos" value={totalOrders} icon={<FaClipboardList size={40} />} />
        <MetricCard iconColor="bg-yellow-500" title="Total de Produtos" value={totalProducts} icon={<FaBox size={40} />} />
        <MetricCard iconColor="bg-red-500" title="Total de Usuários" value={totalUsers} icon={<FaUsers size={40} />} />
      </section>

      <section className="bg-white shadow-xs rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-tx-primary mb-4">Atividade Recente</h2>
        <ul>
          <li className="py-2 border-b border-lines last:border-b-0 flex items-center justify-between">
            <span>Novo usuário registrado: João Silva</span>
            <span className="text-sm text-tx-primary">Há 5 minutos</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
