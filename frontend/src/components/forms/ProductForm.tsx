"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type ProductFormProps = {
    initialData?: {
        id?: string;
        title: string;
        description: string;
        price: number;
        stock: number;
    };
    onSuccess?: () => void;
};

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [price, setPrice] = useState(initialData?.price || 0);
    const [stock, setStock] = useState(initialData?.stock || 0);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const { accessToken } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());
        if (image) formData.append("image", image);

        const url = initialData?.id ? `/products/${initialData.id}` : "/products";
        const method = initialData?.id ? "PUT" : "POST";

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            method,
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.ok) {
            if (onSuccess) onSuccess();
            else router.push("/admin/products");
        } else {
            alert("Erro ao salvar produto");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <input
                type="text"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Título"
                className="w-full p-2 border rounded"
                required
            />
            <textarea
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                placeholder="Descrição"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                placeholder="Preço"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="number"
                value={stock}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(Number(e.target.value))}
                placeholder="Estoque"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="file"
                name="image"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files?.[0] || null)
                }
                className="w-full border-b border-gray-300 bg-gray-100 p-2 rounded-lg cursor-pointer"
                accept="image/*"
            />
            <button
                type="submit"
                className="bg-highlight-n text-white px-4 py-2 rounded-lg hover:bg-highlight-n"
            >
                {initialData ? "Atualizar Produto" : "Criar Produto"}
            </button>
        </form>
    );
}
