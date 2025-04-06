"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import useSWR from "swr";

type Product = {
    id: string;
    title: string;
    price: number;
    stock: number;
    imageUrl?: string;
};

const fetcher = (url: string, token: string) =>
    fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
    }).then((res) => res.json());

export default function ProductsPage() {
    const { accessToken } = useAuth();
    console.log(accessToken);

    const {
        data: products,
        mutate,
        isLoading,
    } = useSWR(
        accessToken ? ["http://localhost:3001/products", accessToken] : null,
        ([url, token]) => fetcher(url, token),
        {
            refreshInterval: 10000, // Revalida a cada 10s
            revalidateOnFocus: true,
        }
    );

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Tem certeza que deseja excluir?");
        if (!confirmed) return;

        const res = await fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.ok) mutate(); // atualiza lista após exclusão
        else alert("Erro ao deletar o produto");
    };

    if (isLoading) return <p>Carregando produtos...</p>;

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Produtos</h2>
                <Link
                    href="/admin/products/create"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                    + Novo Produto
                </Link>
            </div>

            <div className="grid gap-4">
                {products?.map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-bold">{product.title}</h3>
                            <p>R$ {product.price}</p>
                            <p>Estoque: {product.stock}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/products/edit/${product.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:underline cursor-pointer"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
