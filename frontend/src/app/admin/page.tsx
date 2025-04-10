"use client";
import { useEffect, useState } from "react";
import { Users, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import userUtil from "@/utils/user.util";
import ProductsUtil from "@/utils/products.util";

const AdminDashboardContent = () => {
    const { accessToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await ProductsUtil.fetchProducts();
            setProducts(products);
        };

        const fetchUsers = async () => {
            const users = await userUtil.fetchUsers(accessToken as string);
            setUsers(users);
        };

        fetchUsers();
        fetchProducts();
    }, [accessToken]);

    const totalProducts = products.length;
    const totalUsers = users.length;

    return (
        <>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Visão Geral</h2>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <div className="flex items-center space-x-4">
                        <Users className="text-blue-500" size={24} />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Total de Usuários
                            </h3>
                            <p className="text-xl text-gray-900">{totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-md p-6">
                    <div className="flex items-center space-x-4">
                        <Package className="text-green-500" size={24} />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Total de Produtos
                            </h3>
                            <p className="text-xl text-gray-900">{totalProducts}</p>
                        </div>
                    </div>
                </div>                
                {/* Adicione mais blocos de visão geral */}
            </section>

            <section className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Atividade Recente</h2>
                <ul>
                    <li className="py-2 border-b border-gray-200 last:border-b-0 flex items-center justify-between">
                        <span>Novo usuário registrado: João Silva</span>
                        <span className="text-sm text-gray-500">Há 5 minutos</span>
                    </li>
                    {/* Adicione mais itens de atividade recente */}
                </ul>
            </section>
        </>
    );
};

export default AdminDashboardContent;
