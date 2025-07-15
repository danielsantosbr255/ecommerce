import Link from "next/link";
import { orderService } from "@/services/orders";
import SessionLabel from "@/components/ui/SessionLabel";
import { FaClipboardList } from "react-icons/fa";
import CurrencyUtil from "@/utils/currency.util";

export default async function OrdersPage() {
  const orders = await orderService.getAll();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <SessionLabel label="Pedidos" icon={<FaClipboardList size={25} />} />

      <table className="bg-bg-secondary min-w-full divide-y divide-lines shadow-xs rounded-xl overflow-hidden">
        <thead className="bg-gray-200 font-bold text-sm">
          <tr>
            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              Email
            </th>

            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left tracking-wider">
              Criado em
            </th>
            <th scope="col" className="px-6 py-3 text-center tracking-wider">
              Ação
            </th>
          </tr>
        </thead>

        <tbody className="bg-bg-secondary divide-y divide-lines">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-sm">{order.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{order.user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{order.user.email}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div>{CurrencyUtil.formatCurrency(order.totalPrice)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>{new Date(order.createdAt).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center  font-medium">
                <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                  Ver Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
