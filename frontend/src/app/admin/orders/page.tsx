import Link from "next/link";
import { orderService } from "@/services/orders";

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
    <main className="flex flex-col w-full gap-4 p-6 bg-bg-secondary rounded-2xl shadow-xs">
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>

      <section className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between items-center p-4 border-b border-lines last:border-b-0">
            <div>
              <p className="text-lg font-semibold">#{order.id}</p>
              <p>
                Cliente: {order.user.name} ({order.user.email})
              </p>
              <p>Total: R$ {order.totalPrice}</p>
              <p>Status: {order.status}</p>
              <p className="text-sm text-tx-primary">Criado em: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
