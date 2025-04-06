"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type OrderItem = {
    product: {
        title: string;
        price: number;
    };
    quantity: number;
};

type Order = {
    id: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
    totalPrice: number;
    status: string;
    createdAt: string;
};

export default function OrderDetailsPage() {
    const { accessToken, loading } = useAuth();
    const { id } = useParams();
    const router = useRouter();

    const [order, setOrder] = useState<Order | null>(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        async function fetchOrder() {
            try {
                const res = await fetch(`http://localhost:3001/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!res.ok) throw new Error("Erro ao buscar pedido");
                const data = await res.json();
                setOrder(data);
                setStatus(data.status);
            } catch (error) {
                console.error("Erro ao carregar pedido:", error);
            }
        }

        if (!loading) fetchOrder();
    }, [id, accessToken, loading]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:3001/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Erro ao atualizar status do pedido");
            router.refresh(); // atualiza a página
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    if (loading) return <div>Carregando pedido...</div>;
    if (!order) return <div>Pedido não encontrado.</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido #{order.id}</h2>

            <div className="bg-white p-4 rounded shadow space-y-4">
                <div>
                    <p>
                        <strong>Cliente:</strong> {order.user.name} ({order.user.email})
                    </p>
                    <p>
                        <strong>Total:</strong> R$ {order.totalPrice}
                    </p>
                    <p>
                        <strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Status:</label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="border rounded px-3 py-2"
                    >
                        <option value="pendente">Pendente</option>
                        <option value="processando">Processando</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregue">Entregue</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                    <button
                        onClick={handleUpdate}
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Atualizar Status
                    </button>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Itens:</h3>
                    <ul className="space-y-2">
                        {order.items.map((item, index) => (
                            <li key={index} className="border-b pb-2">
                                <p>{item.product.title}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Preço unitário: R$ {item.product.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
