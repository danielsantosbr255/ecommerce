"use client";

import Link from "next/link";
import { FaBox } from "react-icons/fa";
import { orderService } from "@/services/orders";
import CurrencyUtil from "@/utils/currency.util";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/ui/LoadingState";

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => orderService.getByUserId("me"),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingState label="Carregando pedidos" />;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <p className="text-center font-semibold">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full h-full gap-2">
      {orders.map((order) => (
        <article key={order.id} className="bg-bg-secondary flex justify-between items-center p-4 shadow-xs rounded-lg">
          <div className="flex flex-col  justify-start gap-1">
            <FaBox size={25} />
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Número do pedido</span>
            <span>{order.id}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Total</span>
            {CurrencyUtil.formatCurrency(order.totalPrice)}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Status</span>
            <span className="bg-primary/20 text-sm p-1 px-2 font-semibold rounded-full text-primary">{order.status}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Data do pedido</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-bold">Ação</span>
            <Link href="#" className="text-primary hover:underline">
              Ver Detalhes
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Orders;
