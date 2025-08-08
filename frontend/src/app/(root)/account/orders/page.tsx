import { Suspense } from "react";
import Orders from "../_components/Orders";
import { orderService } from "@/services/orders";
import { FaShoppingBasket } from "react-icons/fa";
import SessionLabel from "@/components/ui/SessionLabel";

const FetchOrders = async () => {
  const orders = await orderService.getAll();
  return <Orders orders={orders} />;
};

async function MyOrders() {
  return (
    <main className="flex flex-col w-full flex-1 p-6 gap-4 md:px-4 md:max-w-10/12 mx-auto">
      <SessionLabel label="Meus Pedidos" icon={<FaShoppingBasket size={25} />} />

      <Suspense fallback={<div className="text-center">Carregando...</div>}>
        <FetchOrders />
      </Suspense>
    </main>
  );
}

export default MyOrders;
