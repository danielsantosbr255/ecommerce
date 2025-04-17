"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type ProductFormProps = {
    initialData?: {
        id?: string;
        name: string;
        email: string;
        role: string;
        password: string;
    };
    onSuccess?: () => void;
};

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [email, setEmail] = useState(initialData?.email || 0);
    const [password, setPassword] = useState(initialData?.password || 0);
    const [role, setRole] = useState(initialData?.role || "");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const { accessToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("email", email.toString());
        formData.append("password", password.toString());
        if (image) formData.append("image", image);

        const url = initialData?.id ? `/users/${initialData.id}` : "/products";
        const method = initialData?.id ? "PUT" : "POST";

        const res = await fetch(`process.env.NEXT_PUBLIC_API_URL${url}`, {
            method,
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.ok) {
            if (onSuccess) onSuccess();
            else router.push("/admin/users");
        } else {
            alert("Erro ao salvar usuário");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(parseFloat(e.target.value))}
                placeholder="E-mail"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.toString())}
                placeholder="Senha"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Cargo"
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full border-b border-gray-300 bg-gray-100 p-2 rounded-lg cursor-pointer"
                accept="image/*"
            />
            <button
                type="submit"
                className="bg-highlight-n text-white px-4 py-2 rounded-lg hover:bg-highlight-n"
            >
                {initialData ? "Atualizar Usuário" : "Criar Usuário"}
            </button>
        </form>
    );
}
