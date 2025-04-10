"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProductType } from "@/types/ProductType";
import ProductImage from "@/components/products/ProductImage";
import CurrencyUtil from "@/utils/currency.util";

// Tipagem
type CartItem = {
    id: string;
    product: ProductType;
    quantity: number;
};

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [coupon, setCoupon] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);

    const { accessToken } = useAuth();

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
                    cache: "no-store",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) throw new Error("Erro ao carregar carrinho");

                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error("Erro ao carregar carrinho:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCart();
    }, [accessToken]);

    const handleRemoveItem = async (itemId: string) => {
        try {
            await fetch(`process.env.NEXT_PUBLIC_API_URL/cart/${itemId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setCart((prev) => prev.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error("Erro ao remover item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setCart([]);
        } catch (error) {
            console.error("Erro ao limpar carrinho:", error);
        }
    };

    const applyCoupon = () => {
        if (coupon === "FIRE10") {
            setDiscountPercent(10);
        } else {
            setDiscountPercent(0);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const discount = (subtotal * discountPercent) / 100;
    const total = subtotal - discount;

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
                            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded shadow"
                        >
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <ProductImage product={item.product} fill />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="font-semibold text-lg">{item.product.title}</h2>
                                <p className="text-gray-600">
                                    {CurrencyUtil.formatCurrency(item.product.price)} × {item.quantity}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-amber-500 text-lg">
                                    {CurrencyUtil.formatCurrency(item.product.price * item.quantity)}
                                </span>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="ml-2 px-2 py-1 text-sm text-red-600 hover:underline"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            placeholder="Cupom de desconto"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
                        />
                        <button
                            onClick={applyCoupon}
                            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                        >
                            Aplicar Cupom
                        </button>
                    </div>

                    <div className="text-right space-y-2">
                        <p>
                            Subtotal:{" "}
                            <span className="text-gray-700">{CurrencyUtil.formatCurrency(subtotal)}</span>
                        </p>
                        {discount > 0 && (
                            <p>
                                Desconto ({discountPercent}%):{" "}
                                <span className="text-green-600">- {CurrencyUtil.formatCurrency(discount)}</span>
                            </p>
                        )}
                        <p className="text-xl font-semibold">
                            Total: <span className="text-amber-500">{CurrencyUtil.formatCurrency(total)}</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <button
                            onClick={handleClearCart}
                            className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
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
