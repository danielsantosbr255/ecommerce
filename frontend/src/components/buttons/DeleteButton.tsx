"use client";

import { useRouter } from "next/navigation";

interface Props {
    userId?: string;
    productId?: string;
    token: string | null;
}

export default function DeleteButton({ userId, productId, token }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirm = window.confirm("Tem certeza que deseja excluir?");
        if (!confirm) return;

        const id = userId ?? productId;
        const resource = userId ? "users" : "products";

        const res = await fetch(`process.env.NEXT_PUBLIC_API_URL/${resource}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) router.refresh();
        else alert("Erro ao excluir.");
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:underline">
            Excluir
        </button>
    );
}
