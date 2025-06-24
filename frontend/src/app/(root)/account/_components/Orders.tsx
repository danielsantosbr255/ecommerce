"use client";

import { use } from "react";
import { Order } from "@/types";

const Orders = ({ ordersPromise }: { ordersPromise: Promise<Order[]> }) => {
  const orders = use(ordersPromise);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-primary text-center font-semibold">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-bg-secondary p-4 rounded-lg shadow-sm flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-tx-primary">Pedido #{order.id}</h2>
          <p className="text-tx-primary">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-tx-primary">Total: R$ {order.totalPrice}</p>
          <p className="text-tx-primary">Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
