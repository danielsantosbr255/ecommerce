"use client";

import { Order } from "@/types";
import { orderService } from "@/services/orders";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    };
    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-6 bg-bg-secondary rounded-lg shadow-xs">
        <p className="text-tx-secondary text-center font-semibold">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-bg-secondary p-4 rounded-lg shadow-sm flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-tx-secondary">Pedido #{order.id}</h2>
          <p className="text-tx-secondary">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-tx-secondary">Total: R$ {order.totalPrice}</p>
          <p className="text-tx-secondary">Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
