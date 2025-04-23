"use client";

import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  name: string;
  email: string;
}

const MinhaContaCompletaPage: NextPage = () => {
  const { user, fetchUser, accessToken } = useAuth();

  React.useEffect(() => {
    fetchUser(accessToken);
  }, []);

  return (
    <div className=" py-10">
      <div className="bg-white container mx-auto max-w-9/12 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <Sidebar />
          {/* Conteúdo Principal */}
          <main className="col-span-1 md:col-span-3 p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-800">Visão Geral da Conta</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cartão de Informações Pessoais */}
              <div className="bg-white rounded-md shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Informações Pessoais</h2>
                <p className="text-gray-600">
                  <strong>Nome:</strong> {user?.name}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {user?.email}
                </p>
                <Link href="/editar-perfil" className="inline-block mt-2 text-blue-500 hover:underline">
                  Editar Perfil
                </Link>
              </div>

              {/* Cartão de Últimos Pedidos */}
              <div className="bg-white rounded-md shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Últimos Pedidos</h2>
                {/* Simulação de Pedidos */}
                <ul>
                  <li className="text-gray-600 py-1">
                    Pedido #12345 - Camiseta Azul - 15/04/2025 -{" "}
                    <span className="text-green-500">Entregue</span>
                  </li>
                  <li className="text-gray-600 py-1">
                    Pedido #67890 - Calça Jeans - 10/04/2025 -{" "}
                    <span className="text-yellow-500">Em Trânsito</span>
                  </li>
                  {/* Mais itens de pedidos aqui */}
                </ul>
                <Link href="/meus-pedidos" className="inline-block mt-2 text-blue-500 hover:underline">
                  Ver Todos os Pedidos
                </Link>
              </div>

              {/* Cartão de Endereço Principal */}
              <div className="bg-white rounded-md shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Endereço Principal</h2>
                <p className="text-gray-600">Rua das Flores, 123</p>
                <p className="text-gray-600">Centro, Simões Filho - BA</p>
                <Link href="/meus-enderecos" className="inline-block mt-2 text-blue-500 hover:underline">
                  Gerenciar Endereços
                </Link>
              </div>

              {/* Cartão de Favoritos Recentes */}
              <div className="bg-white rounded-md shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Favoritos Recentes</h2>
                {/* Simulação de Favoritos */}
                <p className="text-gray-600">Nenhum item adicionado aos favoritos recentemente.</p>
                <Link href="/favoritos" className="inline-block mt-2 text-blue-500 hover:underline">
                  Ver Meus Favoritos
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MinhaContaCompletaPage;
