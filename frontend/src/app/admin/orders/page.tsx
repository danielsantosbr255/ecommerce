"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type Order = {
    id: string;
    user: {
        name: string;
        email: string;
    };
    totalPrice: number;
    status: string;
    items: string[];
    createdAt: string;
};

export default function OrdersPage() {
    const { accessToken } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!res.ok) throw new Error("Erro ao buscar pedidos");
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("Erro ao carregar pedidos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [accessToken]);

    if (loading) return <>Carregando pedidos...</>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
            <div className="grid gap-4">
                {orders.length === 0 && <p>Nenhum pedido encontrado.</p>}

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <p className="text-lg font-semibold">#{order.id}</p>
                            <p>
                                Cliente: {order.user.name} ({order.user.email})
                            </p>
                            <p>Total: R$ {order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p className="text-sm text-secondary">
                                Criado em: {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            Ver Detalhes
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
