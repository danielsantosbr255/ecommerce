// app/admin/users/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function EditUserPage() {
    const { accessToken, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`http://localhost:3001/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Erro ao buscar usuário");
                const data = await res.json();
                setFormData({ ...data, password: "" });
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }
        }
        if (!loading) fetchUser();
    }, [userId, accessToken, loading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Erro ao atualizar usuário");
            router.push("/admin/users");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
        try {
            const res = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Erro ao excluir usuário");
            router.push("/admin/users");
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Editar Usuário</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha (deixe em branco para não alterar)"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="USER">Usuário</option>
                    <option value="ADMIN">Administrador</option>
                </select>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Atualizar
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
