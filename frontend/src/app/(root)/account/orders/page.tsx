import LoadingState from "@/components/ui/LoadingState";
import Orders from "../_components/Orders";
import { orderService } from "@/services/orders";
import { Suspense } from "react";
import { FaShoppingBasket } from "react-icons/fa";

function MyOrders() {
  const ordersPromise = orderService.getOrders();

  return (
    <main className="flex flex-col w-full flex-1 p-4 md:px-4 md:max-w-10/12 mx-auto">
      <section className="flex w-full border-b border-lines p-4 items-center gap-3 my-2">
        <FaShoppingBasket className="text-primary inline-block" size={24} />
        <h1 className="text-lg font-bold text-tx-primary">Meus Pedidos</h1>
      </section>

      <Suspense fallback={<LoadingState />}>
        <Orders ordersPromise={ordersPromise} />
      </Suspense>
    </main>
  );
}

export default MyOrders;
