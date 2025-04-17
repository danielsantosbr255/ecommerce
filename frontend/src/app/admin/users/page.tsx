"use client";
import React, { useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

const AdminUsersPage = () => {
    const [users, setUsers] = useState<User[]>([
        { id: "1", name: "João Silva", email: "joao.silva@email.com", role: "ADMIN" },
        { id: "2", name: "Maria Oliveira", email: "maria.oliveira@email.com", role: "USER" },
    ]);
    const [newUser, setNewUser] = useState<{ name: string; email: string; role: "ADMIN" | "USER" }>(
        { name: "", email: "", role: "USER" }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value as "ADMIN" | "USER" | string }));
    };

    const handleAddUser = () => {
        const newId = Math.random().toString(36).substring(7);
        setUsers((prev) => [...prev, { id: newId, ...newUser }]);
        setNewUser({ name: "", email: "", role: "USER" });
        alert("Usuário adicionado!"); // Replace with a better notification
    };

    return (
        <>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Usuários</h2>
            </header>

            <div className="bg-white shadow-md rounded-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Lista de Usuários</h3>
                {users.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-gray-300">ID</th>
                                <th className="p-2 border border-gray-300">Nome</th>
                                <th className="p-2 border border-gray-300">Email</th>
                                <th className="p-2 border border-gray-300">Role</th>
                                <th className="p-2 border border-gray-300">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-300">{user.id}</td>
                                    <td className="p-2 border border-gray-300">{user.name}</td>
                                    <td className="p-2 border border-gray-300">{user.email}</td>
                                    <td className="p-2 border border-gray-300">{user.role}</td>
                                    <td className="p-2 border border-gray-300">
                                        <button className="text-blue-500 hover:underline mr-2">
                                            Editar
                                        </button>
                                        <button className="text-red-500 hover:underline">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">Nenhum usuário cadastrado ainda.</p>
                )}
            </div>

            <div className="bg-white shadow-md rounded-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Adicionar Novo Usuário</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newUser.name}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Role:
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="USER">Usuário</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                    <div className="col-span-full">
                        <button
                            type="button"
                            onClick={handleAddUser}
                            className="bg-highlight-n hover:bg-highlight-h text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Adicionar Usuário
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminUsersPage;
