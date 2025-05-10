import React from "react";
import Link from "next/link";
import { User } from "@/types";
import Sidebar from "./Sidebar";

const Profile = ({ user }: { user: User }) => {
  return (
    <div className="bg-bg-primary shadow-sm rounded-xl overflow-hidden w-full h-full grid grid-cols-1 md:grid-cols-4">
      <Sidebar user={user} />
      {/* Conteúdo Principal */}
      <main className="col-span-1 md:col-span-3 p-6">
        <h1 className="text-xl font-semibold mb-4 text-tx-primary">Visão Geral da Conta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cartão de Informações Pessoais */}
          <div className="bg-white rounded-md shadow-xs p-4">
            <h2 className="text-lg font-semibold text-tx-secondary mb-2">Informações Pessoais</h2>
            <p className="text-tx-secondary">
              <strong>Nome:</strong> {user?.name}
            </p>
            <p className="text-tx-secondary">
              <strong>Email:</strong> {user?.email}
            </p>
            <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
              Editar Perfil
            </Link>
          </div>

          {/* Cartão de Últimos Pedidos */}
          <div className="bg-white rounded-md shadow-xs p-4">
            <h2 className="text-lg font-semibold text-tx-secondary mb-2">Últimos Pedidos</h2>
            {/* Simulação de Pedidos */}
            <ul>
              <li className="text-tx-secondary py-1">
                Pedido #12345 - Camiseta Azul - 15/04/2025 - <span className="text-green-500">Entregue</span>
              </li>
              <li className="text-tx-secondary py-1">
                Pedido #67890 - Calça Jeans - 10/04/2025 -{" "}
                <span className="text-yellow-500">Em Trânsito</span>
              </li>
              {/* Mais itens de pedidos aqui */}
            </ul>
            <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
              Ver Todos os Pedidos
            </Link>
          </div>

          {/* Cartão de Endereço Principal */}
          <div className="bg-white rounded-md shadow-xs p-4">
            <h2 className="text-lg font-semibold text-tx-secondary mb-2">Endereço Principal</h2>
            <p className="text-tx-secondary">Rua das Flores, 123</p>
            <p className="text-tx-secondary">Centro, Simões Filho - BA</p>
            <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
              Gerenciar Endereços
            </Link>
          </div>

          {/* Cartão de Favoritos Recentes */}
          <div className="bg-white rounded-md shadow-xs p-4">
            <h2 className="text-lg font-semibold text-tx-secondary mb-2">Favoritos Recentes</h2>
            {/* Simulação de Favoritos */}
            <p className="text-tx-secondary">Nenhum item adicionado aos favoritos recentemente.</p>
            <Link href="#" className="inline-block mt-2 text-tx-link hover:underline">
              Ver Meus Favoritos
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
