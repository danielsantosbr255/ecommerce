import { Suspense } from "react";
import Orders from "../_components/Orders";
import { orderService } from "@/services/orders";
import { FaShoppingBasket } from "react-icons/fa";
import SessionLabel from "@/components/ui/SessionLabel";

async function MyOrders() {
  const orders = await orderService.getAll();

  if (!orders || orders.length === 0) {
    return <div className="flex flex-col flex-1 w-full items-center justify-center font-semibold text-xl">Nenhum pedido encontrado.</div>;
  }

  return (
    <main className="flex flex-col w-full flex-1 p-6 gap-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Meus Pedidos" icon={<FaShoppingBasket size={25} />} />

      <Suspense fallback={<div className="text-tx-primary">Carregando...</div>}>
        <Orders orders={orders} />
      </Suspense>
    </main>
  );
}

export default MyOrders;
