// app/admin/users/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserType {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function UsersPage() {
    const { accessToken, loading } = useAuth();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("http://localhost:3001/users", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!res.ok) throw new Error("Erro ao carregar usuários");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Erro:", error);
            }
        }
        if (!loading) fetchUsers();
    }, [accessToken, loading]);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Usuários</h2>
                <Link
                    href="/admin/users/create"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Novo Usuário
                </Link>
            </div>

            {loading ? (
                <p>Carregando usuários...</p>
            ) : (
                <div className="grid gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{user.name}</h3>
                                <p>{user.email}</p>
                                <p className="text-sm text-gray-600">Cargo: {user.role}</p>
                            </div>
                            <Link
                                href={`/admin/users/edit/${user.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Editar
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
