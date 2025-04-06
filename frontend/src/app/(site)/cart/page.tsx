"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Tipagens
type CartItem = {
    id: string;
    product: Product;
    quantity: number;
};

interface Product {
    id: string;
    title: string;
    price: number;
    image?: string;
    stock: number;
}

const getValidImageUrl = (imagePath: string | null = null) => {
    if (!imagePath) return "http://localhost:3001/uploads/placeholder.png"; // Caso a URL seja undefined ou vazia

    const baseUrl = "http://localhost:3001";

    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
};

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useAuth();

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch("http://localhost:3001/cart", {
                    cache: "no-store",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Erro ao carregar carrinho");
                }
                setCart(data);
            } catch (error) {
                console.error("Erro ao carregar carrinho:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCart();
    }, []);

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (isLoading) return <div className="p-10">Carregando...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
            <h1 className="text-3xl font-bold">Seu Carrinho</h1>

            {cart.length === 0 ? (
                <div className="text-gray-600 text-center">
                    Seu carrinho está vazio.
                    <br />
                    <Link href="/" className="text-amber-500 hover:underline">
                        Voltar à loja
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 bg-white p-4 rounded shadow"
                        >
                            <img
                                src={getValidImageUrl(item.product.image)}
                                alt={item.product.title}
                                className="w-24 h-24 object-contain rounded"
                            />
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg">{item.product.title}</h2>
                                <p className="text-gray-600">
                                    R$ {item.product.price} × {item.quantity}
                                </p>
                            </div>
                            <div className="font-bold text-amber-500">
                                R$ {item.product.price * item.quantity}
                            </div>
                        </div>
                    ))}

                    <div className="text-right text-xl font-semibold">
                        Total: <span className="text-amber-500">R$ {total}</span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">
                            Limpar Carrinho
                        </button>
                        <button className="px-6 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
